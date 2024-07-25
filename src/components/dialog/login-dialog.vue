<script setup lang="ts">
import Divider from '../common/divider.vue'
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { CloseFilled } from '@vicons/material'
import { useMessage } from 'naive-ui'
import { useCaptcha, useQrLogin } from '@/service/login'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits<{
  (e: 'closeDialog'): void
}>()
const props = defineProps<{
  dialog: boolean
}>()
const message = useMessage()
const { captchaSent, captchaVerify } = useCaptcha()
const { qrKey, qrCheck, qrCreate } = useQrLogin()
const authStore = useAuthStore()
const loginInfo = reactive({
  phone: '' as string,
  email: '' as string,
  password: '' as string,
  captcha: '' as string,
  captchaDisabled: 0 as number
})
const tab = ref<number>(0)
const show = computed(() => props.dialog)
const allowPhone = (value: string) => (!value || /^\d+$/.test(value)) && value.length <= 11
const allowCaptcha = (value: string) => (!value || /^\d+$/.test(value)) && value.length <= 6

const handleCaptcha = async () => {
  const regx = /^1[3-9]\d{9}$/
  if (!regx.test(loginInfo.phone)) {
    message.warning('请输入正确的手机号')
    return
  }
  if (loginInfo.captchaDisabled != 0) return

  try {
    loginInfo.captchaDisabled = 60
    setInterval(() => {
      loginInfo.captchaDisabled -= 1
    }, 1000)
    const result = await captchaSent(loginInfo.phone)
    message.success('验证码发送成功')
  } catch (error) {
    console.warn(error)
  }
}

const captchaLoginVerify = async (): Promise<boolean> => {
  try {
    console.log('vertify')
    const result = await captchaVerify(loginInfo.phone, loginInfo.captcha)
    if (!result.data) {
      message.warning('验证码错误')
      return false
    }
  } catch (error) {
    console.warn(error)
    return false
  }
  return true
}

const handleLogin = async () => {
  if (tab.value === 0 && (await captchaLoginVerify()) == false) return
  if (tab.value === 0) await authStore.loginByPhone(loginInfo.phone, undefined, loginInfo.captcha)
  if (tab.value === 1) await authStore.loginByPhone(loginInfo.phone, loginInfo.password, undefined)
  if (tab.value === 2) await authStore.loginByEmail(loginInfo.email, loginInfo.password)
  if (authStore.getAuthState == 1) {
    message.success('登录成功')
    emit('closeDialog')
  }
}

const qrLoading = ref<boolean>(false)
const qrkey = ref<string>('')
const qrimg = ref<string>('https://music.163.com/')
const loginCreateQr = () => {
  qrLoading.value = true
  qrKey()
    .then(async (result) => {
      qrkey.value = result.data.data.unikey
      const url = (await qrCreate(qrkey.value)).data.data.qrurl
      qrimg.value = url
    })
    .catch((err) => console.warn(err))
    .finally(() => (qrLoading.value = false))
}
const checkInterval = ref()
const loginCheckQr = () => {
  checkInterval.value = setInterval(async () => {
    const result = (await qrCheck(qrkey.value)).data
    if (result.code == 800) loginCreateQr()
  }, 60000)
}
const clearCheck = () => {
  clearInterval(checkInterval.value)
}
</script>

<template>
  <n-modal
    v-model:show="show"
    @mask-click="$emit('closeDialog')"
    @after-enter="loginCreateQr(), loginCheckQr()"
    @after-leave="clearCheck"
  >
    <div class="login-card">
      <div class="w-2/5 flex flex-col justify-evenly items-center">
        <div class="text-xl">扫描二维码登录</div>
        <n-spin :show="qrLoading">
          <n-qr-code :size="180" :value="qrimg" color="rgb(248 113 113)" />
        </n-spin>
        <div class="text-base">请使用网易云音乐APP扫码登录</div>
      </div>
      <Divider :vertical="true" />
      <div class="w-3/5 content">
        <div class="btn-group text-xl">
          <div :class="tab == 0 ? 'current' : 'past'" @click="tab = 0">短信登录</div>
          |
          <div :class="tab == 1 ? 'current' : 'past'" @click="tab = 1">密码登录</div>
          |
          <div :class="tab == 2 ? 'current' : 'past'" @click="tab = 2">邮箱登录</div>
        </div>
        <div class="input">
          <n-input
            v-if="tab == 0 || tab == 1"
            v-model:value="loginInfo.phone"
            placeholder="请输入手机号"
            :input-props="{ autocomplete: 'off' }"
            :allow-input="allowPhone"
            clearable
          >
            <template #prefix> 手机:&nbsp; </template>
          </n-input>
          <n-input
            v-if="tab == 2"
            v-model:value="loginInfo.email"
            placeholder="请输入邮箱"
            :input-props="{ autocomplete: 'off' }"
            clearable
          >
            <template #prefix> 邮箱:&nbsp; </template>
          </n-input>
          <div class="flex" v-if="tab == 0">
            <n-input
              placeholder="请输入验证码"
              v-model:value="loginInfo.captcha"
              :input-props="{ autocomplete: 'off' }"
              :allow-input="allowCaptcha"
              clearable
            >
              <template #prefix> 验证:&nbsp; </template>
            </n-input>
            <n-button
              v-if="loginInfo.captchaDisabled == 0"
              ghost
              type="error"
              @click="handleCaptcha"
              >获取验证码</n-button
            >
            <n-button v-else ghost disabled>请{{ loginInfo.captchaDisabled }}秒后再发送</n-button>
          </div>
          <n-input
            v-if="tab == 1 || tab == 2"
            v-model:value="loginInfo.password"
            placeholder="请输入密码"
            :input-props="{ autocomplete: 'off' }"
            clearable
            type="password"
            show-password-on="mousedown"
          >
            <template #prefix> 密码:&nbsp; </template>
          </n-input>
          <n-spin :show="authStore.loginLoading">
            <n-button block secondary type="error" @click="handleLogin"> 登录 </n-button>
          </n-spin>
        </div>
        <div class="text-base">
          <span>登录即代表您同意</span>
          <a href="https://st.music.163.com/official-terms/service">用户协议</a>
          <span>与</span>
          <a href="https://st.music.163.com/official-terms/privacy">隐私政策</a>
        </div>
      </div>
      <n-button class="self-start" text @click="$emit('closeDialog')">
        <n-icon size="large"><CloseFilled /></n-icon>
      </n-button>
    </div>
  </n-modal>
</template>

<style lang="scss" scoped>
.login-card {
  height: 400px;
  width: 800px;
  padding: 10px;
  background-color: rgb(248 250 252);
  border-radius: 10px;
  display: flex;
  font-family: '163Music';
  font-weight: bold;
}
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  a {
    color: rgb(248 113 113);
  }
  .btn-group {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
    .current {
      color: rgb(248 113 113);
      border-bottom: 1px solid rgb(248 113 113);
      cursor: pointer;
    }
    .past {
      border-bottom: 1px solid rgb(248 250 252);
      cursor: pointer;
    }
  }
  .input {
    height: 204px;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }
}
</style>

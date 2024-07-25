import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { Md5 } from 'ts-md5'
import { cellphoneLogin, emailLogin, userLogout } from '@/service/login'
import useLoading from '@/hooks/use-loading'

export const useAuthStore = defineStore(
  'auth',
  () => {
    // state
    const authInfo = reactive({
      authState: 0,
      cookie: '',
      profile: {} as any
    })
    const { loading: loginLoading, startLoading, endLoading } = useLoading()

    //reset
    function $reset() {
      authInfo.authState = 0
      authInfo.cookie = ''
      authInfo.profile = {}
    }

    // getters
    const getAuthState = computed(() => authInfo.authState)
    const getCookie = computed(() => authInfo.cookie)
    const getAvatar = computed(() => authInfo.profile.avatarUrl)

    // actions
    async function loginByPhone(phone: string, password?: string, captcha?: string) {
      startLoading()

      try {
        if (password) {
          const md5: any = new Md5()
          md5.appendAsciiStr(password)
          var md5_password = md5.end()
        }
        const params = {
          phone: phone,
          md5_password: md5_password,
          captcha: captcha
        }
        const result: any = (await cellphoneLogin(params)).data
        console.log(result)
        if (result.code == 200) {
          authInfo.authState = result.loginType
          authInfo.cookie = encodeURIComponent(result.cookie)
          authInfo.profile = result.profile
          console.log(authInfo)
        }
      } catch (error) {
        console.warn(error)
      } finally {
      }

      endLoading()
    }

    async function loginByEmail(email: string, password: string) {
      startLoading()

      try {
        const result: any = await emailLogin(email, password)
        if (result.code === 200) {
          authInfo.authState = result.loginType
          authInfo.cookie = encodeURIComponent(result.cookie)
          authInfo.profile = result.profile
          console.log(authInfo)
        }
      } catch (error) {
        console.warn(error)
      } finally {
      }

      endLoading()
    }

    async function logout() {
      startLoading()

      try {
        const result: any = (await userLogout()).data
        if (result.code == 200) {
          $reset()
        }
      } catch (error) {
        console.warn(error)
      } finally {
      }

      endLoading()
    }

    return {
      authInfo,
      loginLoading,
      getAuthState,
      getCookie,
      getAvatar,
      loginByPhone,
      loginByEmail,
      logout,
      $reset
    }
  },
  {
    persist: true
  }
)

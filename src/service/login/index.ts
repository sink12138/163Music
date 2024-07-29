import { axios } from '@/service'

interface PhoneLoginReq {
  phone: string
  md5_password?: string
  captcha?: string
}

export function cellphoneLogin(params: PhoneLoginReq) {
  // 手机登录
  return axios({
    url: '/login/cellphone',
    method: 'get',
    params: params
  })
}

export function useCaptcha() {
  // 手机验证码
  function captchaSent(phone: string) {
    // 发送验证码
    return axios({
      url: '/captcha/sent',
      method: 'get',
      params: { phone: phone }
    })
  }

  function captchaVerify(phone: string, captcha: string) {
    // 验证验证码
    return axios({
      url: '/captcha/verify',
      method: 'get',
      params: { phone: phone, captcha: captcha }
    })
  }

  return { captchaSent, captchaVerify }
}

export function emailLogin(email: string, password: string) {
  // 邮箱登录
  return axios({
    url: '/login',
    method: 'get',
    params: { email: email, md5_password: password }
  })
}

export function useQrLogin() {
  // 二维码登录
  function qrKey() {
    // 获取QR key
    return axios({
      url: '/login/qr/key',
      method: 'get'
    })
  }

  function qrCreate(key: string) {
    // 根据key生成QR码
    return axios({
      url: '/login/qr/create',
      method: 'get',
      params: { key: key }
    })
  }

  function qrCheck(key: string) {
    // QR码状态
    return axios({
      url: '/login/qr/check',
      method: 'get',
      params: { key: key, timestamp: new Date().getTime() }
    })
  }
  return { qrKey, qrCreate, qrCheck }
}

export function userLogout() {
  // 用户登出
  return axios({
    url: '/logout',
    method: 'get'
  })
}

export function userStatus() {
  return axios({
    url: '/login/status',
    method: 'get'
  })
}

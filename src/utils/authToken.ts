const key = "vakantieverhuur-looplijsten-token"
// A regular expression that detects a valid JWT token
const regExp = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/

export default {
  get: () : OAuthToken => {
    try {
      return localStorage.getItem(key) || undefined
    } catch (err) {
      console.error(err)
      return undefined
    }
  },
  set: (token: AuthToken) : boolean => {
    if (regExp.test(token) === false) return false
    try {
      localStorage.setItem(key, token)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  },
  clear: () : boolean => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }
}

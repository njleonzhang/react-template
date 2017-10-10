class CachedCookie {
  constructor(name) {
    this.name = name
    this.cookieValue = ''
  }

  get() {
    if (this.cookieValue) {
      return this.cookieValue
    }
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(' ')
      for (let i = 0; i < cookies.length; i++) {
        const cookie = (cookies[i]).trim()
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, this.name.length + 1) === (`${this.name}=`)) {
          this.cookieValue = decodeURIComponent(cookie.substring(this.name.length + 1))
          break
        }
      }
    }
    return this.cookieValue
  }

  clear() {
    this.cookieValue = ''
  }

  renew() {
    this.cookieValue = ''
    return this.get()
  }
}

export const CachedCsrf = new CachedCookie('csrftoken')

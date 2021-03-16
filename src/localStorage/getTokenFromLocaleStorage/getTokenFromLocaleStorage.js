function getTokenFromLocaleStorage() {
  const token = window.localStorage.getItem('token')
  return token || ''
}

export default getTokenFromLocaleStorage

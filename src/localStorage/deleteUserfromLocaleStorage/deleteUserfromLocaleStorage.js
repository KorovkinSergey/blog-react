function deleteUserfromLocaleStorage() {
  window.localStorage.removeItem('user');
  window.localStorage.removeItem('userUsername');
  window.localStorage.removeItem('userEmail');
  window.localStorage.removeItem('userPassword');
  window.localStorage.removeItem('userToken');
}

export default deleteUserfromLocaleStorage;

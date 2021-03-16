function getUsernameFromLocaleSorage() {
  const username = window.localStorage.getItem('username');
  return username || '';
}

export default getUsernameFromLocaleSorage;

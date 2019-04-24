import decode from 'jwt-decode';

function tokenService() {
  const cachePrefix = 'id_token';

  return {
    isLoggedIn() {
      const token = this.getToken();
      return !!token && !this.isTokenExpired(token);
    },
    isTokenExpired(token) {
      try {
        const decoded = decode(token);
        return decoded.exp < Date.now() / 1000;
      } catch (err) {
        return false;
      }
    },
    setToken(idToken) {
      localStorage.setItem(cachePrefix, idToken);
    },
    getToken() {
      return localStorage.getItem(cachePrefix);
    },
    logout() {
      localStorage.removeItem(cachePrefix);
    }
  };
}

export default tokenService();

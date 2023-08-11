export const ETH_KEY = 'eth';
export const ETH_TOKEN = `${ETH_KEY}_token`;

export function logout() {
  localStorage.removeItem(ETH_TOKEN);
  window.location.href = '/login';
}

export function setTokenToCache(token: string) {
  localStorage.setItem(ETH_TOKEN, token);
}

export function getTokenFromCache() {
  return localStorage.getItem(ETH_TOKEN);
}

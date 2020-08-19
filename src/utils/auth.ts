export const login = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem('kapoera-access', accessToken);
  localStorage.setItem('kapoera-refresh', refreshToken);
};

export const logout = (): void => {
  localStorage.removeItem('kapoera-access');
  localStorage.removeItem('kapoera-refresh');
};

export const getAccessToken = (): string =>
  localStorage.getItem('kapoera-access');

export const getRefreshToken = (): string =>
  localStorage.getItem('kapoera-refresh');

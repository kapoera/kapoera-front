export const login = (token: string): void => {
  localStorage.setItem('kapoera-token', token);
};

export const logout = (): void => {
  localStorage.removeItem('kapoera-token');
};

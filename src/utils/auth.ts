import config from '@/config';

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

export const requestAccessToken = async (): Promise<string> => {
  const fetched = await fetch(`${config.baseURL}/auth/token`, {
    method: 'POST',
    headers: {
      Refreshtoken: getRefreshToken()
    }
  });

  const result = await (<
    Promise<{ success: boolean; accessToken?: string; message?: string }>
  >fetched.json());

  if (result.success) return result.accessToken;
  else return '';
};

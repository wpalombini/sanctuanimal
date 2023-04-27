export const appendAuthCookieToHeader = (token: string | undefined) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

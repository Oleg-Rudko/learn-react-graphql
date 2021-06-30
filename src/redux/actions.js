export const setUserCredential = (user) => ({
  type: "SET_USER_CREDENTIAL",
  user,
});

export const setLoading = (value) => ({
  type: "SET_LOADING",
  loading: value,
});

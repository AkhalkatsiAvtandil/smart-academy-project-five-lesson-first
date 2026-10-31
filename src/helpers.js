export const checkUser = () => {
  const result = localStorage.getItem("user");
  const token = JSON.parse(result);
  if (token) {
    return true;
  } else {
    return false;
  }
};

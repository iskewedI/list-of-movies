import httpService from "./httpService";

const apiEndpoint = "/users";

export function register(user) {
  return httpService.post(apiEndpoint, {
    email: user.username,
    name: user.name,
    password: user.password,
  });
}
export default {
  register,
};

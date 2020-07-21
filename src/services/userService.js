import httpService from "./httpService";
import { apiUsers } from "./config.json";

export function register(user) {
  return httpService.post(apiUsers, {
    email: user.username,
    name: user.name,
    password: user.password,
  });
}
export default {
  register,
};

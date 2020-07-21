import httpService from "./httpService";
import { apiGenres } from "./config";

export function getGenres() {
  return httpService.get(apiGenres);
}

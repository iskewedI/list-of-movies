import httpService from "./httpService";

const apiEndpoint = "/genres";

export function getGenres() {
  return httpService.get(apiEndpoint);
}

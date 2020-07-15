export const genres = [
  { _id: "1111", name: "Action" },
  { _id: "3333", name: "Comedy" },
  { _id: "2222", name: "Thriller" },
];

export function getGenres() {
  return genres.filter((g) => g);
}

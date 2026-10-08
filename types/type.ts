export type Genres = {
  id: number;
  name: string;
};

export type Book = {
  id: number;
  title: string;
  description: string;
  genreId: number;
};

export type BookUpdate = {
  title: string;
  description: string;
  genreId: number;
}

export type BookCreate = {
  title: string;
  description: string;
  genreId: number;
};

export type GenrePageProps = {
  params: Promise<{
    genre: string;
  }>;
};
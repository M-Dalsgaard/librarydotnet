import { Trash2, SquarePen } from "lucide-react";
import { Book, Genres } from "@/types/type";
import { genreColors, createName, transparentColors } from "@/lib/GenreData";

type Props = {
  book: Book;
  genres: Genres[];
  onEdit: () => void;
  onDelete: () => void;
};

const BookCard = ({ book, genres, onEdit, onDelete }: Props) => {
  const genre = genres.find((genre) => genre.id === book.genreId);

  const genreName = genre ? createName(genre.name) : "";
  const genreColor = genreColors[genreName] ?? "bg-gray-300";
  const bgColor = transparentColors[genreName] ?? "bg-gray-200";

  return (
    <article className={`border-4 border-black/2 p-6 ${bgColor}`}>
      <section className="flex items-start justify-between gap-4">
        <h2 className="text-3xl font-bold">{book.title}</h2>

        <span className={` px-3 py-1 text-sm font-semibold ${genreColor}`}>
          {genre?.name ?? "Uknown genre"}
        </span>
      </section>
      <p className="my-2 text-gray-800">Book-ID: {book.id}</p>
      <p className="text-gray-800">{book.description}</p>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={onEdit}
          className="bg-green-500 px-4 py-2 text-white hover:brightness-120 hover:text-black cursor-pointer"
          aria-label="Rediger bog"
        >
          <SquarePen />
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="bg-red-500 px-4 py-2 text-white hover:brightness-200 hover:text-black cursor-pointer"
          aria-label="Slet bog"
        >
          <Trash2 />
        </button>
      </div>
    </article>
  );
};

export default BookCard;

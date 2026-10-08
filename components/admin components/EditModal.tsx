"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { SubmitEvent } from "react";
import { Book, BookUpdate, Genres } from "@/types/type";
import TextFields from "../TextFields";
import TextArea from "../TextArea";

type Props = {
  book: Book;
  close: () => void;
  onUpdate: (id: number, data: BookUpdate) => void;
  genres: Genres[];
};

const EditModal = ({ book, close, onUpdate, genres }: Props) => {
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [genreId, setGenreId] = useState(String(book.genreId));

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onUpdate(book.id, {
      title,
      description,
      genreId: Number(genreId),
    });
  };

  return (
    <section className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md bg-white p-8">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 cursor-pointer"
        >
          <X className="size-6 text-gray-600 hover:text-black" />
        </button>

        <h2 className="mb-6 text-3xl font-bold text-gray-900">
          Edit {book.title}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextFields
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextArea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="genre">Genre</label>

          <select
            id="genre"
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
            className="border p-2"
            required
          >
            <option value="">Choose genre</option>

            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={close}
              className="cursor-pointer bg-gray-400 px-4 py-2 font-bold text-white hover:bg-gray-500 hover:text-black"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer bg-green-500 px-4 py-2 font-bold text-white hover:brightness-120 hover:text-black"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditModal;
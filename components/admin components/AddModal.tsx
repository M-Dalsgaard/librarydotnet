"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { SubmitEvent } from "react";
import { BookCreate, Genres } from "@/types/type";
import TextFields from "../TextFields";
import TextArea from "../TextArea";

type Props = {
  close: () => void;
  onCreate: (data: BookCreate) => void | Promise<void>;
  genres: Genres[];
};

const AddModal = ({ close, onCreate, genres }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genreId, setGenreId] = useState("");
  const [isSaving, setIsSaving] = useState(false);

const handleSubmit = async (
  event: SubmitEvent<HTMLFormElement>,
) => {
  event.preventDefault();

    setIsSaving(true);

    try {
      await onCreate({
        title,
        description,
        genreId: Number(genreId),
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md bg-white p-8">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 cursor-pointer text-gray-600 hover:text-black"
          disabled={isSaving}
        >
          <X className="size-6" />
        </button>

        <h2 className="mb-6 pr-8 text-3xl font-bold">
          Add book
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <TextFields
            label="Title"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
          />

          <TextArea
            label="Description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
          />

          <label htmlFor="genre">Genre</label>

          <select
            id="genre"
            value={genreId}
            onChange={(event) =>
              setGenreId(event.target.value)
            }
            className="border border-gray-400 p-2"
            required
          >
            <option value="">Choose genre</option>

            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={isSaving}
            className="w-25 place-self-center cursor-pointer bg-green-500 px-4 py-2 font-bold text-white hover:brightness-120 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddModal;
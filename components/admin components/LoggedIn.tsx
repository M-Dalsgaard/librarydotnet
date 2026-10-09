"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import Button from "../Button";
import { Book, BookCreate, BookUpdate, Genres } from "@/types/type";
import BookCard from "./BookCard";
import { SquarePlus } from "lucide-react";

type ModalMode = "add" | "edit" | "delete" | null;

type LoggedInProps = {
  initialBooks: Book[];
  initialGenres: Genres[];
};

const LoggedIn = ({ initialBooks, initialGenres }: LoggedInProps) => {
  const router = useRouter();

  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [genres] = useState<Genres[]>(initialGenres);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedGenreId, setSelectedGenreId] = useState("");

  const handleOpenModal = (mode: ModalMode, book?: Book) => {
    setModalMode(mode);
    setSelectedBook(book ?? null);
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setSelectedBook(null);
  };

  const createBook = async (data: BookCreate) => {
    try {
      const response = await fetch("http://localhost:5248/createBook", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Could not create book");
      }

      const newBook: Book = await response.json();

      setBooks((currentBooks) => [...currentBooks, newBook]);

      handleCloseModal();
    } catch (error) {
      console.error("Create error:", error);
    }
  };

  const updateBook = async (id: number, data: BookUpdate) => {
    try {
      const response = await fetch(`http://localhost:5248/updateBook/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Could not update book");
      }

      setBooks((currentBooks) =>
        currentBooks.map((book) =>
          book.id === id
            ? {
                ...book,
                ...data,
              }
            : book,
        ),
      );

      handleCloseModal();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const deleteBook = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5248/deleteBook/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Could not delete book");
      }

      setBooks((currentBooks) => currentBooks.filter((book) => book.id !== id));

      handleCloseModal();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // const logout = async () => {
  //   try {
  //     await fetch("http://localhost:5248/logout", {
  //       method: "POST",
  //       credentials: "include",
  //     });
  //   } finally {
  //     router.push("/admin/login");
  //     router.refresh();
  //   }
  // };

  const filteredBooks =
    selectedGenreId === ""
      ? books
      : books.filter((book) => String(book.genreId) === selectedGenreId);

  return (
    <>
      <header className="flex flex-col gap-4 bg-headerteal p-4 sm:flex-row sm:items-center sm:justify-end">
        <span className="text-2xl font-bold sm:mr-6 sm:text-3xl">Welcome!</span>

        <Button
          type="button"
          className="px-3 py-2 border border-white hover:brightness-150 hover:cursor-pointer hover:text-black hover:border-black hover:bg-headerteal/50"
          // onClick={logout}
        >
          Log out
        </Button>
      </header>

<main className="grid grid-cols-1 gap-6 px-4 py-6 sm:px-6 sm:py-10">
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <h2 className="text-3xl font-bold sm:text-4xl">
      Admin dashboard
    </h2>

    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
      <select
        value={selectedGenreId}
        onChange={(event) =>
          setSelectedGenreId(event.target.value)
        }
        className="h-11 w-full border p-2 sm:w-48"
      >
        <option value="">All genres</option>

        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <Button
        type="button"
        onClick={() => setModalMode("add")}
        className="flex text-white h-11 w-full items-center justify-center bg-green-500 px-4 hover:brightness-120 hover:text-black hover:cursor-pointer sm:w-auto"
      >
        <SquarePlus className="size-5" />
        <span className="ml-2 sm:hidden">Add book</span>
      </Button>
    </div>
  </div>

  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {filteredBooks.map((book) => (
      <BookCard
        key={book.id}
        book={book}
        genres={genres}
        onEdit={() => handleOpenModal("edit", book)}
        onDelete={() => handleOpenModal("delete", book)}
      />
    ))}
  </div>
</main>

      {modalMode === "add" && (
        <AddModal
          close={handleCloseModal}
          onCreate={createBook}
          genres={genres}
        />
      )}

      {modalMode === "edit" && selectedBook && (
        <EditModal
          book={selectedBook}
          genres={genres}
          close={handleCloseModal}
          onUpdate={updateBook}
        />
      )}

      {modalMode === "delete" && selectedBook && (
        <DeleteModal
          book={selectedBook}
          close={handleCloseModal}
          onDelete={deleteBook}
        />
      )}
    </>
  );
};

export default LoggedIn;

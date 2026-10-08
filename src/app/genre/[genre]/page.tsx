import { notFound } from "next/navigation";
import Link from "next/link";
import { createName, genreColors } from "@/lib/GenreData";
import { Genres, Book, GenrePageProps } from "@/types/type";
import { ChevronLeft } from "lucide-react";

async function getGenres(): Promise<Genres[]> {
  const res = await fetch("http://localhost:5248/getGenres", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch genres");
  }

  return res.json();
}

async function getBooksByGenre(genreId: number): Promise<Book[]> {
  const res = await fetch(`http://localhost:5248/getBooksByGenre/${genreId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await res.json();

  return data;
}

export default async function GenrePage({ params }: GenrePageProps) {
  const { genre } = await params;

  const genres = await getGenres();

  const currentGenre = genres.find((item) => createName(item.name) === genre);

  if (!currentGenre) {
    notFound();
  }

  const books = await getBooksByGenre(currentGenre.id);
  const colorClass =
    genreColors[createName(currentGenre.name)] ?? "bg-gray-400";

  return (
    <>
      <header className="flex h-40 items-end justify-end bg-headerteal px-5 pb-2">
        <h1 className="text-[32px] font-bold uppercase text-white">
          bibliothèque publique
        </h1>
      </header>

<main className="mb-5 w-full uppercase">
  <section className="grid w-full grid-cols-1 gap-8 pt-8 md:grid-cols-[280px_minmax(0,1fr)] md:gap-12 md:px-0">
<Link
  href="/"
  aria-label="Go back to genres"
  className="inline-block self-start justify-self-start md:sticky md:top-8 backlink"
>
  <div
    className={`${colorClass} relative h-20 w-100`}
  >
<ChevronLeft
  className="absolute left-4 top-1/2 size-8 -translate-y-1/2 sm:size-10"
/>

<p className="absolute bottom-3 right-4 max-w-[80%] text-right text-base font-bold leading-tight">
  {currentGenre.name}
</p>
  </div>
</Link>

    <section className="mx-auto w-[min(90%,48rem)] min-w-0 md:w-full max-w-3xl md:justify-self-center md:pr-4">
      <div className="flex flex-col gap-8 md:mt-12">
        {books.map((book) => (
          <article key={book.id} className="min-w-0">
            <h2 className="book-title">
              {book.title}
            </h2>

            <p className="description">
              {book.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  </section>
</main>
    </>
  );
}

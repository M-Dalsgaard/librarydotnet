import Link from "next/link";
import { Genres } from "@/types/type";
import { createName, genreColors, genreOrder } from "@/lib/GenreData";
import { UserShield } from "lucide-react";

async function getGenres(): Promise<Genres[]> {
  const res = await fetch("http://localhost:5248/getGenres", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch genres");
  }

  return res.json();
}

export default async function Home() {
  const genres = await getGenres();

  return (
    <>
      <header className="relative flex h-100 items-end justify-end bg-headerteal px-4 pb-2 sm:px-5">
        <Link href="/admin/login">
          <div
            className="
      absolute right-4 top-4 z-10 bg-white
      px-3 py-2 text-xs font-semibold uppercase
      text-headerteal
      transition hover:bg-black/20 hover:text-white hover:border hover:border-white
      sm:right-5 sm:top-5 sm:px-4 sm:text-sm flex place-items-center gap-2"
          >
            <UserShield />
            Admin
          </div>
        </Link>
        <h1 className="text-right text-3xl font-bold uppercase text-white sm:text-5xl">
          bibliothèque publique
        </h1>
      </header>

      <main className="flex w-full uppercase">
        <section className="mx-auto my-10 grid grid-cols-1 gap-10 md:grid-cols-3">
          {genres.map((genre) => {
            const slug = createName(genre.name);

            return (
              <Link
                key={genre.id}
                href={`/genre/${slug}`}
                className={`genre ${
                  genreColors[slug] ?? "bg-gray-400"
                } ${genreOrder[slug] ?? "order-last"}`}
              >
                <h2 className="genre-title">{genre.name}</h2>
              </Link>
            );
          })}
        </section>
      </main>
    </>
  );
}

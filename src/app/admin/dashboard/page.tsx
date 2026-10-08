import LoggedIn from "@/components/admin components/LoggedIn";
import { Book, Genres } from "@/types/type";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const cookieStore = await cookies();

  const [booksResponse, genresResponse] = await Promise.all([
    fetch("http://localhost:5248/getBooks", {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }),

    fetch("http://localhost:5248/getGenres", {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }),
  ]);

  if (!booksResponse.ok || !genresResponse.ok) {
    throw new Error("Could not load dashboard data");
  }

  const books: Book[] = await booksResponse.json();
  const genres: Genres[] = await genresResponse.json();

  return (
    <LoggedIn
      initialBooks={books}
      initialGenres={genres}
    />
  );
}
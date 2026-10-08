import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

async function login(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    const res = await fetch("http://localhost:5248/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    if (!res.ok) {
      redirect("/login?error=invalid");
    }

    redirect("/admin/dashboard");
  } catch {
    redirect("/login?error=server");
  }
}

export default async function Page({ searchParams }: PageProps) {
  const { error } = await searchParams;

  return (
    <section className="w-screen h-screen text-black">
      <div className="w-1/2 mx-auto">
        <form
          action={login}
          className="flex flex-col w-1/2 mx-auto mt-4 bg-headerteal p-4"
        >
          <h1 className="text-4xl font-bold text-center py-4">
            Login
          </h1>

          {error === "invalid" && (
            <p className="mb-4 text-red-700">
              Invalid email or password.
            </p>
          )}

          {error === "server" && (
            <p className="mb-4 text-red-700">
              Something went wrong. Please try again.
            </p>
          )}

          <label htmlFor="email" className="text-xl font-semibold">
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            required
            className="bg-white text-black border border-black/40 p-1"
          />

          <label
            htmlFor="password"
            className="text-xl font-semibold mt-4"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            name="password"
            required
            className="bg-white border text-black border-black/40 p-1"
          />

          <button
            type="submit"
            className="bg-headerteal mx-auto mt-4 p-1.5 w-1/3 text-white text-xl font-bold border border-white"
          >
            Log in
          </button>
        </form>
      </div>
    </section>
  );
}
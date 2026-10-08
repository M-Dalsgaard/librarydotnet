import Button from "../Button";

const NotLogged = () => {
  return (
    <header className="flex flex-col gap-4 bg-headerteal p-4 sm:flex-row sm:items-center sm:justify-end">
      <div className="w-3/5" />

      <div className="w-2/5 flex justify-end items-end pr-6">
        <span className="text-white text-2xl pr-8 font-bold">
          You are not logged in
        </span>

        <Button
          href="/admin/login"
          className="border border-white hover:brightness-150 hover:cursor-pointer hover:text-black hover:border-black hover:bg-headerteal/50"
        >
          Log in
        </Button>
      </div>
    </header>
  );
};

export default NotLogged;
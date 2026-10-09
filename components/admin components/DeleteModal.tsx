import { Book } from "@/types/type";
import { X } from "lucide-react";

type Props = {
  book: Book;
  close: () => void;
  onDelete: (id: number) => void;
};

const DeleteModal = ({ book, close, onDelete }: Props) => {
  return (
    <section className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
      <div className="relative bg-white p-8">

        <button
          type="button"
          onClick={close}
          className="absolute top-3 right-3 cursor-pointer"
        >
          <X className="size-6" />
        </button>

        <h2 className="text-2xl font-bold">Delete book?</h2>

        <p className="mt-4">
          Are you sure you want to delete {book.title}?
        </p>

        <div className="flex place-content-center gap-4 mt-6">
          <button
            type="button"
            onClick={close}
            className="bg-gray-500 px-4 py-2 text-white hover:cursor-pointer hover:bg-gray-600 hover:text-black"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onDelete(book.id)}
            className="bg-red-500 text-white px-4 py-2 hover:cursor-pointer hover:bg-red-600 hover:text-black"
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};
export default DeleteModal;

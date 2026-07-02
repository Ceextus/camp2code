import BooksSoon from "@/components/sections/books/BooksSoon";

export const metadata = {
  title: "Books",
  description:
    "Camp2Code is curating a specialized library of development resources, coding workbooks, and tech guides for the Abuja tech ecosystem. Coming soon.",
};

export default function BooksPage() {
  return (
    <main className="grow flex flex-col">
      <BooksSoon />
    </main>
  );
}

import BooksSoon from "@/components/sections/books/BooksSoon";

export const metadata = {
  title: "Books",
  description:
    "Camp2Code is curating a specialized library of development resources, coding workbooks, and tech guides for the Abuja tech ecosystem. Coming soon.",
  alternates: { canonical: "/books" },
  openGraph: {
    title: "Camp2Code Books",
    description:
      "A specialized library of development resources, coding workbooks, and tech guides for the Abuja tech ecosystem. Coming soon.",
    url: "/books",
  },
};

export default function BooksPage() {
  return (
    <main className="grow flex flex-col">
      <BooksSoon />
    </main>
  );
}

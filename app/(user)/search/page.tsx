import SearchContent from "./search.content"; // Import the client component

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const initialTerm = searchParams.term as string | undefined;

  return (
    // Pass the initial search term to the client component
    <SearchContent initialTerm={initialTerm} />
  );
}

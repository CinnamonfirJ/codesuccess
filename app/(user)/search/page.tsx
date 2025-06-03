async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const term = await (await searchParams).term;

  return <div className='pt-12 md:pt-0'>SearchPage: {term}</div>;
}

export default SearchPage;

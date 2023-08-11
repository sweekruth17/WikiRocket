import { getWikiResults } from "@/lib/getWikiResults";
import Item from "./components/Item";

type Props = {
  params: {
    searchTerm: string;
  };
};
export async function generateMetadata({ params: { searchTerm } }: Props) {
  const wikidata: Promise<SearchResult> = getWikiResults(searchTerm);
  const data = await wikidata;
  const displayTerm = searchTerm.replaceAll("%24", " ");

  if (!data?.query?.pages) {
    return {
      title: `${displayTerm} Not Found`,
    };
  }
  return {
    title: displayTerm,
    description: `Search results for ${displayTerm}`,
  };
}
export default async function SearchResults({ params: { searchTerm } }: Props) {
  console.log("hello", searchTerm);

  const wikidata: Promise<SearchResult> = getWikiResults(searchTerm);
  const data = await wikidata;
  const results: Result[] | undefined = data?.query?.pages;
  console.log("hello1", results);
  const content = (
    <main>
      {results
        ? Object.values(results).map((result) => {
            return <Item key={result.pageid} result={result} />;
          })
        : `${searchTerm} Not Found`}
    </main>
  );

  return content;
}

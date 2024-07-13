import { useSearchParamsWithSetter } from "./use-search-params";

// ----------------------------------------------------------------------

const PAGE_QUERY_NAME = "page";

// Saves page state in url & returns the page count
export function usePagination(): {
  pageNumber: number;
  navigateToPage: (
    pageNumber: number,
    additionalParams?: URLSearchParams
  ) => void;
} {
  const { searchParams, setSearchParams } = useSearchParamsWithSetter();

  const navigateToPage = (pageNumber: number) => {
    setSearchParams(PAGE_QUERY_NAME, pageNumber.toString());
  };

  const pageNumber = searchParams.get(PAGE_QUERY_NAME)
    ? parseInt(searchParams.get(PAGE_QUERY_NAME)!, 10)
    : 1;

  return {
    pageNumber,
    navigateToPage,
  };
}

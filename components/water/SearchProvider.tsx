import { buildSearchIndex } from "@/lib/search/index";
import { SearchModal } from "./SearchModal";

/**
 * Server component that builds the search index at render time and
 * passes it to the client-side modal as a single JSON payload. The
 * index is small enough (~30KB JSON) that this beats a runtime API.
 */
export function SearchProvider() {
  const index = buildSearchIndex();
  return <SearchModal index={index} />;
}

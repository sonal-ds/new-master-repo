import React, { useContext } from "react";
import { SearchContext } from "../google-map/SearchProvider";
function ResultCount() {
  const { pagination, isLoading } = useContext(SearchContext);
  return (
    !isLoading && (
      <div className="result-count">
        Showing {pagination.startFrom} to {pagination.showingCount} of{" "}
        {pagination.totalRecord} Results
      </div>
    )
  );
}
export default ResultCount;

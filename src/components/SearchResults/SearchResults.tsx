import React from "react";
import SearchResultsItem from "src/components/SearchResultsItem"

export default function SearchResults({searchResults}) {
  return (
    <>
      {SearchResults.map(el => (
        <SearchResultsItem />
      ))}
    </>
  )
}
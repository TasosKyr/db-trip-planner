import React from "react";
import SearchResultsItem from "src/components/SearchResultsItem";
import { Journey } from "src/types";

export default function SearchResults({ journeys = [] }) {
  return (
    <div className="flex flex-col w-full text-white h-full">
      {journeys?.map((journey: Journey, index: number) => {
        return <SearchResultsItem journey={journey} key={`${journey?.legs[0]?.line?.name}-${index}`} />;
      })}
    </div>

  );
}

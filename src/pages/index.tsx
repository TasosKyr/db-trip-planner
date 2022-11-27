import Head from "next/head";
import React, { useState, FormEvent, useEffect } from "react";
import Input from "src/components/Input";
import { useSearch } from "src/hooks/useSearch";
import { ListItem } from "src/types";
import SearchResults from "src/components/SearchResults/SearchResults";
import PuffLoader from "react-spinners/PuffLoader";

export default function Home() {
  const [origin, setOrigin] = useState<ListItem | null>(null);
  const [destination, setDestination] = useState<ListItem | null>(null);
  const [date, setDate] = useState<string>(new Date().toISOString());

  const { journeys, search, fetchStatus } = useSearch({
    originId: origin?.location?.id,
    destinationId: destination?.location?.id,
    date,
  });

  const isDisabled: boolean = origin?.name && destination?.name ? false : true;

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    search();
  };

  return (
    <div>
      <Head>
        <title>Trip Planner</title>
        <meta name="description" content="Search your train tickets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center max-w-screen overflow-hidden sm:overflow-visible text-xs sm:text-md">
        <h1 className="text-2xl font-bold sm:text-md">
          Hey, where you off to Next?
        </h1>
        <Input
          setOrigin={setOrigin}
          setDestination={setDestination}
          setDate={setDate}
          fetchStatus={fetchStatus}
          date={date}
          handleOnSubmit={handleOnSubmit}
          isDisabled={isDisabled}
        />
        {fetchStatus === "fetching" ? <PuffLoader />: ""}
        <SearchResults journeys={journeys} />
      </div>
    </div>
  );
}

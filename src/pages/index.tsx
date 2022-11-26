import Head from "next/head";
import React, { useState, FormEvent, useEffect } from "react";
import Input from "src/components/Input";
import { useSearch } from "src/hooks/useSearch";
import { ListItem } from "src/types"
import SearchResults from "src/components/SearchResults/SearchResults";

export default function Home() {
  const [origin, setOrigin] = useState<ListItem | null>(null);
  const [destination, setDestination] = useState<ListItem | null>(null);
  const [date, setDate] = useState<string>(new Date().toISOString());

  const { journeys, search } = useSearch({
      originId: origin?.location?.id,
      destinationId: destination?.location?.id,
      date,
  });

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    search()
  };

  useEffect(() => {
    console.log(journeys);
  }, [journeys])

  return (
    <div>
      <Head>
        <title>Trip Planner</title>
        <meta name="description" content="Search your train tickets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold sm:text-md">Hey, where you off to Next?</h1>
        <Input
          setOrigin={setOrigin}
          setDestination={setDestination}
          setDate={setDate}
          isLoading={false}
          date={date}
          handleOnSubmit={handleOnSubmit}
        />
        <SearchResults journeys={journeys} />
      </div>
    </div>
  );
}

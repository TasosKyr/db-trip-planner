import React, { useState, Suspense } from "react";
import { Journey, Trip } from "src/types";
import { getTimeFromDate, getDateDifference, getPrice } from "src/lib/helpers";
import Image from "next/image";
import caretUp from "../../../public/assets/CaretUp.svg";
import caretDown from "../../../public/assets/CaretDown.svg";
const TripDetails = React.lazy(() => import("src/components/TripDetails"));
interface Props {
  journey: Journey;
  index: number;
}

function getTimes({
  departure,
  arrival,
}: {
  departure: string;
  arrival: string;
}) {
  const departureTime = getTimeFromDate(departure);
  const arrivalTime = getTimeFromDate(arrival);

  return (
    <p className="text-lg md:text-xl mr-3 font-bold">{`${departureTime}-${arrivalTime} `}</p>
  );
}

function getDuration({
  departure,
  arrival,
}: {
  departure: string;
  arrival: string;
}) {
  if (!departure || !arrival) return <p>Times not available</p>;

  const [days, hours, minutes] = getDateDifference({ departure, arrival });

  return (
    <p>
      {days > 0 ? <span>{` | ${days}d`}</span> : ` | ${hours}h ${minutes}min`}
    </p>
  );
}

export default function SearchResultsItem({ journey, index }: Props) {
  const departure = journey?.legs[0]?.plannedDeparture;
  const arrival = journey?.legs[journey?.legs?.length - 1]?.plannedArrival;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="my-2 h-fit sm:p-5 p-2 bg-black bg-opacity-50 backdrop-blur-md rounded-xl drop-shadow-lg flex flex-col w-full flex-wrap"
        data-test-id={`search-result-${index}`}
        data-testid="search-result"
      >
        <div className="flex justify-between flex-wrap items-end w-full break-words">
          <div className="flex items-center flex-wrap">
            {getTimes({ departure, arrival })}
            {getDuration({ departure, arrival })}
            <p>{`, ${journey?.legs?.length} Changes`}</p>
          </div>
          <p className="font-bold sm:text-xl text-lg mx-2">
            {getPrice(journey?.price?.amount)}
          </p>
        </div>
        <div className="flex justify-start sm:justify-evenly flex-wrap sm:flex-nowrap mb-4 w-full">
          {journey?.legs?.map((trip: Trip, index: number) => {
            return (
              <div
                className="bg-gray-900 rounded-md px-4 w-fill sm:w-full mr-1 flex mb-1"
                key={`${trip?.line?.name}-${index}`}
              >
                {trip?.line?.name || "walking"}
              </div>
            );
          })}
        </div>

        <a
          className="underline-offset-4 flex justify-center cursor-pointer"
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          {isOpen ? "Hide details" : "Show details"}
          <Image
            src={isOpen ? caretUp : caretDown}
            width={20}
            height={20}
            alt={isOpen ? "arrow down" : "arrow up"}
            className="ml-2"
          />
        </a>
        <Suspense fallback={<div>Loading...</div>}>
          <TripDetails journey={journey} isOpen={isOpen} />
        </Suspense>
      </div>
    </>
  );
}

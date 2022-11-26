import React from "react";
import SearchResultsItem from "src/components/SearchResultsItem";
import { getTimeFromDate, getDateDifference, getPrice } from "src/lib/helpers";
import { Journey } from "src/types"

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
    <p className="text-xl mr-3 font-bold">{`${departureTime}-${arrivalTime} `}</p>
  );
}

function getDuration({
  departure,
  arrival,
}: {
  departure: string;
  arrival: string;
}) {
  if (!departure || !arrival) return <p>Times not available for this trip</p>;

  const [days, hours, minutes] = getDateDifference({ departure, arrival });

  return (
    <p className="text-xs">
      {days > 0 ? <span>{` | ${days}d`}</span> : ` | ${hours}h ${minutes}min`}
    </p>
  );
}

export default function SearchResults({ journeys = [] }) {
  // console.log({ searchResults.journeys });
  return (
    <div className="flex flex-col w-full text-white h-full">
      {journeys?.map((journey: Journey) => {
        const departure = journey?.legs[0]?.plannedDeparture;
        const arrival =
          journey?.legs[journey?.legs?.length - 1]?.plannedArrival;

        return (
          <>
            <div className="my-2 h-fit p-5 bg-black bg-opacity-50 backdrop-blur-md rounded-xl drop-shadow-lg flex flex-col w-full">
              <div className="flex justify-between flex-wrap items-end w-full">
                <div className="flex items-center">
                  {getTimes({ departure, arrival })}
                  {getDuration({ departure, arrival })}
                  <p className="text-xs">{`, ${journey?.legs?.length} Changes`}</p>
                </div>
                <p className="text-xl font-extrabold">
                  {getPrice(journey?.price?.amount)}
                </p>
              </div>
              <div className="flex w-full justify-evenly">
                {journey?.legs?.map((el) => {
                  return (
                    <>
                      {/* <div className="my-2">
                      <p>
                      {el.origin.name} to {el.destination.name}
                    </p>
                    </div> */}
                      <div className="bg-gray-900 rounded-md px-4 w-full mr-1 flex flex-wrap justify-center">
                        {el?.line?.name || "walk"}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </>
        );
      })}
      {/* {journeys?.map((journey) => {
          return journey?.legs?.map((el) => {
            return <div>{el.line.productName}</div>;
          });
        })} */}
    </div>
  );
}

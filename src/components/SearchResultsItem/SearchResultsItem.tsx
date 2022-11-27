import React, { useState } from "react";
import { Journey, Trip } from "src/types";
import { getTimeFromDate, getDateDifference, getPrice } from "src/lib/helpers";
import Image from "next/image";
import caretUp from "../../../public/assets/CaretUp.svg";
import caretDown from "../../../public/assets/CaretDown.svg";
import city from "../../../public/assets/City.svg";
import direction from "../../../public/assets/ArrowRight.svg";

interface Props {
  journey: Journey;
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

export default function SearchResultsItem({ journey }: Props) {
  const departure = journey?.legs[0]?.plannedDeparture;
  const arrival = journey?.legs[journey?.legs?.length - 1]?.plannedArrival;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="my-2 h-fit p-5 bg-black bg-opacity-50 backdrop-blur-md rounded-xl drop-shadow-lg flex flex-col w-full text-xs flex-wrap">
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
          {journey?.legs?.map((trip: Trip, index: number) => {
            return (
              <>
                <div
                  className="bg-gray-900 rounded-md px-4 w-full mr-1 flex flex-wrap justify-center mb-4"
                  key={`${trip?.line?.name}-${index}`}
                >
                  {trip?.line?.name || "walking"}
                </div>
              </>
            );
          })}
        </div>

        <a
          className="underline-offset-4 flex justify-center"
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
        <div className={`${isOpen ? "mt-5" : "hidden"}`}>
          {journey?.legs?.map((trip: Trip, index: number) => {
            return (
              <>
                <div
                  className="bg-gray-500 rounded-md px-4 mr-1 flex flex-col flex-wrap items-center mb-4 content-center"
                  key={`${trip?.line?.name}_${index}`}
                >
                  <div className="flex items-center my-1 content-start w-full">
                    <p className="font-bold">
                      {getTimeFromDate(trip?.plannedDeparture)}
                    </p>
                    <Image
                      src={city}
                      width={20}
                      height={20}
                      alt={"city icon"}
                      className="mx-4"
                    />
                    <div>
                      <div className="flex">
                        <p className="font-bold">{trip?.origin?.name}</p>
                        {trip?.plannedDeparturePlatform ? (
                          <div className="font-bold ml-5 bg-slate-800 px-2 rounded-md h-fit w-fit">
                            {"Pl." + trip?.plannedDeparturePlatform}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="flex">
                        {trip?.direction ? (
                          <Image
                            src={direction}
                            width={15}
                            height={15}
                            alt={"right arrow"}
                            className="mx-2"
                          />
                        ) : (
                          ""
                        )}
                        <p className="text-xs">{trip?.direction}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-dotted border-l-2 h-14 ml-28 flex items-center content-start w-full">
                    <div className="ml-5">{trip?.line?.name || "walking"}</div>
                  </div>

                  <div className="flex items-center my-1 content-start w-full">
                    <p className="font-bold">
                      {getTimeFromDate(trip?.plannedArrival)}
                    </p>
                    <Image
                      src={city}
                      width={20}
                      height={20}
                      alt={"city icon"}
                      className="mx-4"
                    />
                    <div>
                      <div className="flex">
                        <p className="font-bold">{trip?.destination?.name}</p>
                        {trip?.plannedArrivalPlatform ? (
                          <div className="font-bold ml-5 bg-slate-800 px-2 rounded-md h-fit w-fit">
                            {"Pl." + trip?.plannedArrivalPlatform}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

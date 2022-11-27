import React from "react";
import city from "../../../public/assets/City.svg";
import direction from "../../../public/assets/ArrowRight.svg";
import Image from "next/image";
import { Journey, Trip } from "src/types";
import { getTimeFromDate } from "src/lib/helpers";

interface Props {
  journey: Journey;
  isOpen: boolean;
}

export default function TripDetails({ journey, isOpen }: Props): JSX.Element {

  return (
    <div className={`${isOpen ? "mt-5" : "hidden"}`}>
      {journey?.legs?.map((trip: Trip, index: number) => {
        return (
            <div
              className="bg-gray-500 rounded-md px-4 mr-1 flex flex-col flex-wrap items-center mb-4 content-center"
              key={`${trip?.direction}_${index}`}
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
        );
      })}
    </div>
  );
}

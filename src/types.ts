import { Dispatch, SetStateAction } from "react";

export type Location = {
  id: string;
  latitude: string;
  longitude: string;
  type: string;
};

export type ListItem = {
  name: string;
  location: Location;
};

export type Field = {
  label: string;
  name: string;
  type: string;
  onChangeFn: Dispatch<SetStateAction<null | ListItem>>;
  placeholder: string;
};

export interface SearchParams {
  originId?: string;
  destinationId?: string;
  date: string;
}

export interface Price {
  amount?: number;
  currency?: string;
  hint?: string;
}

interface DestinationAndOrigin {
  id?: string;
  location?: Location;
  name?: string;
}

interface Line {
  name: string;
}

export interface Trip {
  destination: DestinationAndOrigin;
  direction?: string;
  origin: DestinationAndOrigin;
  line: Line;
  plannedArrival: string;
  plannedArrivalPlatform: string;
  plannedDeparture: string;
  plannedDeparturePlatform: string;
}

export interface Journey {
  legs: Trip[];
  price: Price;
}

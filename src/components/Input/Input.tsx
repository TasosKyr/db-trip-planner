import React, {
  Dispatch,
  SetStateAction,
  FormEvent,
} from "react";
import Autocomplete from "src/components/Autocomplete";
import { Field, ListItem } from "src/types";
import { getCurrentDate } from "src/lib/helpers";

interface InputProps {
  setOrigin: Dispatch<SetStateAction<ListItem | null>>;
  setDestination: Dispatch<SetStateAction<ListItem | null>>;
  setDate: Dispatch<SetStateAction<string>>;
  fetchStatus: string;
  handleOnSubmit: (e: FormEvent) => void;
  isDisabled: boolean;
}

export default function Input({
  fetchStatus,
  setOrigin,
  setDestination,
  setDate,
  handleOnSubmit,
  isDisabled
}: InputProps) {

  const fields: Field[] = [
    {
      type: "text",
      name: "origin",
      onSelectFn: setOrigin,
      label: "Where From",
      placeholder: "e.g.Berlin Hbf",
    },
    {
      type: "text",
      name: "destination",
      onSelectFn: setDestination,
      label: "Where To",
      placeholder: "e.g. Munich Hbf",
    },
  ];

  const renderForm = () => {
    return (
      <>
        {fields?.map((field: Field) => {
          return <Autocomplete field={field} key={field.name} />;
        })}
        <div className="flex flex-col text-white md:w-60 w-full md:mr-5">
          <label className="sm:text-sm" htmlFor="date">
            When
          </label>
          <input
            type="datetime-local"
            defaultValue={getCurrentDate()}
            data-test-id="date-input"
            // aria-role="date-input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDate(e.target.value)
            }
            className="h-10 w-full block md:w-60 appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={isDisabled}
          data-test-id="search-btn"
          className={`h-10 mt-4 md:w-60 w-full justify-center rounded-md border border-transparent  py-2 px-4 font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            isDisabled ? "bg-gray-700" : "bg-indigo-700 hover:bg-indigo-800 "
          }`}
        >
          {isDisabled
            ? "SELECT STATIONS"
            : fetchStatus === "fetching"
            ? "ALMOST THERE"
            : "TAKE ME THERE"}
        </button>
      </>
    );
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="h-fit w-full p-5 bg-black bg-opacity-50 backdrop-blur-md rounded-xl drop-shadow-lg flex justify-center flex-wrap items-end z-10 mb-2 overflow-hidden md:overflow-visible"
    >
      {renderForm()}
    </form>
  );
}

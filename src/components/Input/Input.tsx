import { UseFormRegister, FieldValues } from "react-hook-form";
import PuffLoader from "react-spinners/PuffLoader";
import React, { useState, FormEvent } from "react";
import Autocomplete from "src/components/Autocomplete";
import {searchRoute} from "src/lib/api"
import { Field, ListItem } from "src/types"

interface InputProps {
  setOriginId: (value: string) => void;
  setDestinationId: (value: string) => void;
  setDate: (value: string) => void;
  isLoading: boolean;
}
interface FormProps {
  register: UseFormRegister<FieldValues>;
  isLoading: boolean;
  errors: { [error: string]: any };
}

export default function Input({
  isLoading,
}: InputProps) {

  const [origin, setOrigin] = useState<ListItem | null>(null);
  const [destination, setDestination] = useState<ListItem | null>(null);
  const [date, setDate] = useState("");

  const fields: Field[] = [
    {
      type: "text",
      name: "origin",
      // required: "This field is required",
      // minLength: { value: 3, message: "Please type more than 3 characters" },
      onChangeFn: setOrigin,
      label: "Where To",
      placeholder: "e.g. Munich Hbf",
    },
    {
      type: "text",
      name: "destination",
      // required: "This field is required",
      // minLength: { value: 3, message: "Please type more than 3 characters" },
      onChangeFn: setDestination,
      label: "Where From",
      placeholder: "e.g.Berlin Hbf",
    },
  ];

  const renderForm = () => {
    return (
      <>
        {fields?.map((field: Field) => {
          return <Autocomplete field={field} key={field.name} />;
        })}
        <div className="flex flex-col text-white md:w-60 w-full md:mr-5">
        <label htmlFor="date">When</label>
        <input
          type="datetime-local"
          onChange={(e) => setDate(e.target.value)}
          className="rounded-lg h-10  text-black px-2"
        />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-slate-300 px-3 text-xs font-semibold h-10 mt-4 md:w-fit w-full"
        >
          {isLoading ? <PuffLoader /> : "TAKE ME THERE"}
        </button>
      </>
    );
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault()
    searchRoute({origin: origin?.location.id, destination: destination?.location.id, date})
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="md:w-fit h-fit p-5 bg-black bg-opacity-50 backdrop-blur-md rounded-xl drop-shadow-lg flex justify-center flex-wrap items-end w-full"
    >
      {renderForm()}
    </form>
  );
}

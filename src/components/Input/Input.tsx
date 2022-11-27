import { UseFormRegister, FieldValues } from "react-hook-form";
import PuffLoader from "react-spinners/PuffLoader";
import React, { Dispatch, SetStateAction, FormEvent } from "react";
import Autocomplete from "src/components/Autocomplete";
import { Field, ListItem } from "src/types";
import { getCurrentDate } from "src/lib/helpers";
interface InputProps {
  setOrigin: Dispatch<SetStateAction<ListItem | null>>;
  setDestination: Dispatch<SetStateAction<ListItem | null>>;
  setDate: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  handleOnSubmit: (e: FormEvent) => void;
  date: string;
}
interface FormProps {
  register: UseFormRegister<FieldValues>;
  isLoading: boolean;
  errors: { [error: string]: any };
}

export default function Input({
  isLoading,
  setOrigin,
  setDestination,
  setDate,
  handleOnSubmit,
}: InputProps) {
  // const [date, setDate] = useState(new Date());

  const fields: Field[] = [
    {
      type: "text",
      name: "origin",
      // required: "This field is required",
      // minLength: { value: 3, message: "Please type more than 3 characters" },
      onChangeFn: setOrigin,
      label: "Where From",
      placeholder: "e.g.Berlin Hbf",
    },
    {
      type: "text",
      name: "destination",
      // required: "This field is required",
      // minLength: { value: 3, message: "Please type more than 3 characters" },
      onChangeFn: setDestination,
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDate(e.target.value)
            }
            className="h-10 w-full block appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="h-10 mt-4 md:w-60 w-full md:mr-5 justify-center rounded-md border border-transparent bg-indigo-700 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isLoading ? <PuffLoader /> : "TAKE ME THERE"}
        </button>
      </>
    );
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="sm:w-fit h-fit w-full p-5 bg-black bg-opacity-50 backdrop-blur-md rounded-xl drop-shadow-lg flex justify-center flex-wrap items-end z-10 mb-2"
    >
      {renderForm()}
    </form>
  );
}

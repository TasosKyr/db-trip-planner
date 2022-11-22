import { useForm, UseFormRegister, FieldValues } from "react-hook-form";
import PuffLoader from "react-spinners/PuffLoader";
import React, { useState, useEffect } from "react";
import Autocomplete from "src/components/Autocomplete";

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
  setOriginId,
  setDestinationId,
  setDate,
  isLoading,
}: InputProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const fields = [
    {
      type: "text",
      name: "origin",
      required: "This field is required",
      minLength: { value: 3, message: "Please type more than 3 characters" },
      onChangeFn: setOrigin,
      label: "Where To",
      placeholder: "Munich Hbf",
    },
    {
      type: "text",
      name: "destination",
      required: "This field is required",
      minLength: { value: 3, message: "Please type more than 3 characters" },
      onChangeFn: setDestination,
      label: "Where From",
      placeholder: "Berlin Hbf",
    },
  ];

  useEffect(() => {
    console.log({origin, destination});
  }, [origin, destination])

  const renderForm = ({ register, errors, isLoading }: FormProps) => {
    return (
      <>
        {fields?.map((field) => {
          return <Autocomplete field={field} key={field.name} />;
        })}
        <div className="flex flex-col text-white md:w-60 w-full md:mr-5">
        <label htmlFor="date">When</label>
        <input
          type="datetime-local"
          onChange={(e) => setDate(e.target.value)}
          className="rounded-lg h-10  text-black"
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

  const onSubmit = handleSubmit((data) => {
    setOrigin(data.origin);
    setDestination(data.destination);
    setDate(data.date);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="md:w-fit h-fit p-5 bg-black bg-opacity-50 backdrop-blur-md rounded-xl drop-shadow-lg flex justify-center flex-wrap items-end w-full"
    >
      {renderForm({ register, errors, isLoading })}
    </form>
  );
}

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

  const renderForm = ({ register, errors, isLoading }: FormProps) => {
    return (
      <>
        {fields?.map((field) => {
          return <Autocomplete field={field} key={field.name}/>;
        })}
        <input
          type="datetime-local"
          {...register("date", {
            required: "This field is required",
            minLength: 3,
            onChange: (e) => setDate(e.target.value),
          })}
        />
        <button
          type="submit"
          className="rounded-xl bg-slate-300 px-3 text-xs font-semibold h-10 mt-4 w-fit"
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
    //@ts-ignore
    <form
      onSubmit={onSubmit}
      className="w-fit h-fit p-5 bg-black bg-opacity-50 backdrop-blur-md rounded-xl drop-shadow-lg flex md:justify-center flex-wrap items-end justify-start"
    >
      {renderForm({ register, errors, isLoading })}
    </form>
  );
}

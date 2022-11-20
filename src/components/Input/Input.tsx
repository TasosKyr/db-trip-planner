import React, { FormEvent } from "react";
import { useForm, UseFormRegister, FieldValues } from "react-hook-form";
import PuffLoader from "react-spinners/PuffLoader";
import { useSearch } from "src/hooks/search";

const fields = [
  {
    type: "text",
    name: "origin",
    required: "true",
    label: "Where To",
    placeholder: "Munich Hbf",
  },
  {
    type: "text",
    name: "destination",
    required: "true",
    label: "Where From",
    placeholder: "Berlin Hbf",
  },
  { type: "datetime-local", name: "date", required: "true", label: "When" },
];

interface FormProps {
  register: UseFormRegister<FieldValues>;
  isLoading: boolean;
  errors: { [error: string]: any };
}

export default function Input() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  //@ts-ignore
  const { data, isLoading, isError, error, refetch } = useSearch();

  const renderForm = ({ register, errors, isLoading }: FormProps) => {
    return (
      <>
        {fields?.map((field) => {
          return (
            <div key={field.name} className="flex flex-col mr-5 text-white">
              <label htmlFor={field.name}>{field.label}</label>
              <input
                type={field.type}
                {...register(field.name, { required: field.required })}
                className="rounded-lg h-10 text-black"
              />
              <div className="text-red">{errors[field.name]?.message}</div>
            </div>
          );
        })}

        <button
          type="submit"
          className="rounded-xl bg-slate-300 px-3 text-xs font-semibold h-10 mt-4 w-fit"
        >
          {isLoading ? <PuffLoader /> : "TAKE ME THERE"}
        </button>
      </>
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    //@ts-ignore
    <form
      onSubmit={handleSubmit}
      className="w-fit h-fit p-10 bg-black bg-opacity-50 backdrop-blur-md rounded-xl drop-shadow-lg flex md:justify-center flex-wrap items-end justify-start"
    >
      {renderForm({ register, errors, isLoading })}
    </form>
  );
}

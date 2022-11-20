import { useForm, UseFormRegister, FieldValues } from "react-hook-form";
import PuffLoader from "react-spinners/PuffLoader";

interface InputProps {
  setOrigin: (value: string) => void;
  setDestination: (value: string) => void;
  setDate: (value: string) => void;
  isFetching: boolean;
}
interface FormProps {
  register: UseFormRegister<FieldValues>;
  isFetching: boolean;
  errors: { [error: string]: any };
}

export default function Input({
  setOrigin,
  setDestination,
  setDate,
  isFetching,
}: InputProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

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
    {
      type: "datetime-local",
      name: "date",
      required: "This field is required",
      onChangeFn: setDate,
      label: "When",
    },
  ];

  const renderForm = ({ register, errors, isFetching }: FormProps) => {
    return (
      <>
        {fields?.map((field) => {
          return (
            <div key={field.name} className="flex flex-col mr-5 text-white">
              <label htmlFor={field.name}>{field.label}</label>
              <input
                type={field.type}
                {...register(field.name, {
                  required: field.required,
                  minLength: field.minLength,
                  onChange: (e) => field.onChangeFn(e.target.value)
                })}
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
          {isFetching ? <PuffLoader /> : "TAKE ME THERE"}
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
      className="w-fit h-fit p-10 bg-black bg-opacity-50 backdrop-blur-md rounded-xl drop-shadow-lg flex md:justify-center flex-wrap items-end justify-start"
    >
      {renderForm({ register, errors, isFetching })}
    </form>
  );
}

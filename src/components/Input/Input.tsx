import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
    //@ts-ignore

  const onSubmit = ({data}) => console.log(data);
  
  return (
    //@ts-ignore
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full p-10 bg-grey bg-opacity-40 backdrop-blur-md rounded drop-shadow-lg flex justify-center">
      <input type="text" placeholder="Where From" {...register} />
      <input type="text" placeholder="Where To" {...register} />
      <input type="datetime-local" placeholder="When" {...register} />

      <button type="submit">TAKE ME THERE</button> 
    </form>
  );
}
import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
    //@ts-ignore

  const onSubmit = ({data}) => console.log(data);
  
  return (
    //@ts-ignore
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Where From" {...register} />
      <input type="text" placeholder="Where To" {...register} />
      <input type="datetime-local" placeholder="When" {...register} />

      <button type="submit">TAKE ME THERE</button> 
    </form>
  );
}
import { useForm, Controller } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <input {...register("firstName", { required: true })} />
        {errors.firstName && <span>This field is required</span>}
        <br />

        <input {...register("lastName", { required: true })} />
        {errors.lastName && <span>This field is required</span>}
        <br />

        {/* input file */}
        <input type="file" {...register("file", { required: true })} />
        {errors.file && <span>This field is required</span>}
        <br />

        <input type="submit" />
      </form>
    </div>
  );
}

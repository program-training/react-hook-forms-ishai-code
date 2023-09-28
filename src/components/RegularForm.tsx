import { useForm, SubmitHandler } from "react-hook-form";
import "../css/regularForm.css";

interface FormData {
  username: string;
  email: string;
  password: string;
  gender: string;
}

function RegularForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const passwordPattern =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!])(?!.*\s).{8,20}$/;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form
      className="form-layout flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>React Hook Form</h1>
      <input
        {...register("username", {
          required: "username is required",
          minLength: {
            value: 2,
            message: "user name must contain more than 2 char",
          },
        })}
        type="text"
        id="username"
        placeholder="Enter UserName"
        className="px-4 py-2 rounded"
      />
      {errors.username && (
        <p className="bg-red-500">{errors.username.message}</p>
      )}

      <div>
        <select
          {...register("gender", { required: "Please select your gender" })}
        >
          <option value="">Select gender</option>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>

      <input
        {...register("email")}
        required
        type="email"
        id="email"
        placeholder="Enter Email"
        className="px-4 py-2 rounded"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <input
        {...register("password", {
          pattern: { value: passwordPattern, message: "invalid password" },
        })}
        required
        type="text"
        id="password"
        placeholder="Enter Password"
        className="px-4 py-2 rounded"
      />
      {errors.password && (
        <p className="bg-red-500">{errors.password.message}</p>
      )}
      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default RegularForm;

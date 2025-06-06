
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Component from "../assets/undraw_signin.svg";
import { signInSchema } from "../validation/formValidation";

export const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div
        className="h-full w-full sm:h-[80%] sm:w-[80%] grid sm:grid-cols-2 "
        style={{ boxShadow: "20px 20px 20px #DEDEDE" }}
      >
        <div className="">
          <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center h-full gap-4">
            <div className="text-3xl font-bold text-blue-600 mb-10">
              Sign In
            </div>
            <div className="w-[80%]">
              <input
                className="h-10 md:h-10 pl-4 w-full border-2 border-blue-600 rounded-md focus:border-blue-600"
                type="text"
                placeholder="Username"
                name="userName"
                id="userName"
                {...register("userName")}
                />
                <p className="text-xs lg:text-xm text-red-600 font-semibold pt-1">
                {errors.userName?.message}
              </p>
            </div>
            <div className="w-[80%]">
              <input
                className="h-10 md:h-10 pl-4 w-full border-2 border-blue-600 rounded-md focus:border-blue-600"
                type="password"
                placeholder="Password"
                name="Password"
                id="Password"
                {...register("Password")}
              />
              <p className="text-xs lg:text-xm text-red-600 font-semibold pt-1">{errors.Password?.message}</p>
            </div>

            <div
              className="flex"
              style={{
                marginRight: "300px",
              }}
            >
              <input type="checkbox"></input>
              <p className="text-1xl m-2">Remember Me</p>
            </div>
            <button
              type="submit"
              className="h-10 md:h-10 w-[80%] bg-blue-600 rounded-md text-white font-bold text-lg ease-in-out duration-300 hover:bg-blue-800"
            >
              Sign In
            </button>
            <div>
              <p className="mt-4">
                New Here?{" "}
                <a href="/Signup" className="text-blue-600">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
        {/* image */}
        <div className="flex flex-col justify-center items-center">
          <img src={Component} alt="Component" />
          <p className="mt-5 text-md">Or sign in with...</p>
        </div>
      </div>
    </div>
  );
};
export default Signin;
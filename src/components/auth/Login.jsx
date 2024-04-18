import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import React, { useCallback, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";

import { LoginSchema } from "../../validation/authValidation";
import { userLogin } from "../../api/AuthApi";
import Loader from "../utils/Loader";
import { useDispatch } from "react-redux";
import { AuthUser } from "../../app/slice/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(LoginSchema),
  });

  const {
    error,
    data: LoginData,
    isError,
    isSuccess,
    mutate,
    isPending,
  } = useMutation({
    mutationFn: userLogin,
    retry: 1,
  });

  const submit = useCallback(
    (data) => {
      mutate(data);
      reset();
    },
    [mutate, reset]
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(AuthUser(LoginData));
      navigate("/profile");
      toast.success("Login successfully");
    }
  }, [isSuccess, LoginData, dispatch, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);
  return (
    <React.Fragment>
      {isPending ? (
        <Loader />
      ) : (
        <div className="h-screen w-screen flex items-center justify-center">
          <div className="bg-transparent border border-[rgba(255,255,255,.2)] backdrop-blur-lg  w-[300px] h-[500px] md:w-[400px] rounded-lg m-20">
            <h2 className="text-center pt-6 text-white text-2xl font-bold">
              Login
            </h2>
            <h4 className="text-center pt-2 text-white text-md ">
              Welcome back!
            </h4>
            <form
              onSubmit={handleSubmit(submit)}
              className="mx-5 my-10 md:mx-14 flex justify-center flex-col"
            >
              <div>
                <div className="mb-4 gap-2">
                  <label htmlFor="email" className="block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="outline-none border-white border bg-transparent w-64 md:w-72 rounded-md h-8 px-3"
                    placeholder="Enter your email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-rose-700 pt-2">
                      {errors.email?.message}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block mb-2">
                    password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="outline-none border-white border bg-transparent w-64 md:w-72 rounded-md h-8 px-3"
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-rose-700 pt-2">
                      {errors.password?.message}
                    </p>
                  )}
                </div>
              </div>
              <Link to="/reset-form" className="pb-2">
                Forgot password?
              </Link>
              <button
                type="submit"
                className="bg-white w-64 md:w-72 h-10 text-black rounded-md font-medium"
              >
                Login
              </button>

              <p className="py-4">
                Dont have an account? <Link to="/signUp">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Login;

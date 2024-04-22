import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";

import { RegisterSchema } from "../../validation/authValidation";
import { signUp } from "../../api/AuthApi";
import Loader from "../utils/Loader";

function Signup() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { avatar: null, fullName: "", email: "", password: "" },
    resolver: yupResolver(RegisterSchema),
  });

  const {
    mutate,
    isError,
    error,
    data: signData,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: signUp,
    retry: 1,
  });

  const submit = useCallback(
    (data) => {
      const newData = { ...data, avatar: data.avatar[0] };
      mutate(newData);
      reset();
    },
    [mutate, reset]
  );
  useEffect(() => {
    if (isSuccess) {
      navigate(`/verify/${signData.user.email}`);
      toast.success(signData && signData.message);
    }
  }, [isSuccess, navigate, signData]);

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
        <div className="h-[100vh] w-screen flex items-center justify-center">
          <div className="dark:bg-transparent bg-[#F4CE14] border border-[rgba(255,255,255,.2)] backdrop-blur-lg  w-[300px] h-[600px] md:w-[400px] rounded-lg m-20 flex justify-center items-center flex-col">
            <h2 className="text-center pt-6 text-white text-2xl font-bold">
              Create new account
            </h2>
            <form
              className="mx-5 my-10 md:mx-14 flex justify-center flex-col"
              onSubmit={handleSubmit(submit)}
            >
              <div className="space-y-4 mb-4">
                <label htmlFor="" className="text-white">
                  Profile picture
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  {...register("avatar")}
                  accept="image/jpeg,image/jpg,image/png"
                  className="outline-none border-white border bg-transparent w-64 sm:w-72 my-1 rounded-md h-8 px-3 Placeholder:text-white text-white"
                />
                <div>
                  <label htmlFor="fullName" className="block text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    {...register("fullName")}
                    className="outline-none border-white border bg-transparent w-64 sm:w-72 my-1 rounded-md h-8 px-3 placeholder:text-white text-white"
                    placeholder="Enter your fullName"
                  />
                  {errors.fullName && (
                    <p className="text-rose-700">{errors.fullName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    name="email"
                    className="outline-none border-white border bg-transparent w-64 sm:w-72 my-1 rounded-md h-8 px-3 placeholder:text-white text-white"
                    placeholder="Enter your email"
                  />{" "}
                  {errors.email && (
                    <p className="text-rose-700">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="password" className="block text-white">
                    password
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    name="password"
                    className="outline-none border-white border bg-transparent w-64 sm:w-72 my-1 rounded-md h-8 px-3 placeholder:text-white text-white"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="text-rose-700">{errors.password.message}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="bg-white w-64 md:w-72 h-8 px-3 text-black rounded-md font-medium"
              >
                Sign up
              </button>

              <p className="py-4 text-white">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-700">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Signup;

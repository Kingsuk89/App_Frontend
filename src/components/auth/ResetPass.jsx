import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback } from "react";
import toast from "react-hot-toast";

import { resetSchema } from "../../validation/authValidation";
import Loader from "../utils/Loader";
import { UserResetPass } from "../../api/AuthApi";

const ResetPass = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: { password: "", authCode: "" },
    resolver: yupResolver(resetSchema),
  });

  const { mutate, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: UserResetPass,
    onSuccess: () => {
      navigate("/login");
    },
  });

  const submit = useCallback(
    (data) => {
      mutate(data), reset();
    },
    [mutate, reset]
  );

  if (isSuccess) {
    toast.success("Password reset successfully");
  }

  if (isError) {
    toast.error(error.message);
  }

  return (
    <React.Fragment>
      {isPending ? (
        <Loader />
      ) : (
        <div className="h-screen w-screen flex items-center justify-center">
          <div className="bg-transparent border border-[rgba(255,255,255,.2)] backdrop-blur-lg  w-[300px] h-[400px] md:w-[400px] rounded-lg m-20 flex justify-center items-center flex-col">
            <h2 className="text-center pt-6 text-white text-2xl font-bold">
              Reset your password
            </h2>
            <form
              onSubmit={handleSubmit(submit)}
              className="mx-5 my-10 md:mx-14 flex justify-center flex-col"
            >
              <div>
                <label htmlFor="password" className="block">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="outline-none border-white border bg-transparent w-64 md:w-72 mb-6 mt-2 rounded-md h-8 px-3"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-rose-700">{errors.password.message}</p>
                )}
                <label htmlFor="otp" className="block">
                  Verification code
                </label>
                <input
                  type="tel"
                  id="otp"
                  name="otp"
                  className="outline-none border-white border bg-transparent w-64 md:w-72 mb-6 mt-2 rounded-md h-8 px-3"
                  placeholder="Enter your otp"
                  {...register("authCode")}
                />
                {errors.authCode && (
                  <p className="text-rose-700">{errors.authCode.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-white w-64 md:w-72 h-10 text-black rounded-md font-medium"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ResetPass;

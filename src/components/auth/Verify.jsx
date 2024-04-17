import { useMutation } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { verifyUser } from "../../api/AuthApi";
import Loader from "../utils/Loader";

const Verify = () => {
  const navigate = useNavigate();

  const { handleSubmit, register, reset } = useForm({
    defaultValues: { code: "" },
  });

  const { mutate, error, isError, isSuccess, isPending } = useMutation({
    mutationFn: verifyUser,
    onSuccess: () => {
      navigate("/login");
    },
  });

  const submit = useCallback(
    (data) => {
      mutate(data);
      reset();
    },
    [mutate, reset]
  );

  if (isSuccess) {
    toast.success("user verified");
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
          <div className="bg-transparent border border-[rgba(255,255,255,.2)] backdrop-blur-lg  w-[300px] h-[300px] md:w-[400px] rounded-lg m-20 flex justify-center items-center flex-col">
            <h2 className="text-center pt-6 text-white text-2xl font-bold">
              Verification
            </h2>
            <form
              onSubmit={handleSubmit(submit)}
              className="mx-5 my-10 md:mx-14 flex justify-center flex-col"
            >
              <div>
                <label htmlFor="code" className="block">
                  Verification code
                </label>
                <input
                  type="tel"
                  id="code"
                  name="code"
                  className="outline-none border-white border bg-transparent w-64 md:w-72 mb-6 mt-2 rounded-md h-8 px-3"
                  placeholder="Enter your code"
                  {...register("code")}
                />
              </div>
              <button
                type="submit"
                className="bg-white w-64 md:w-72 h-10 text-black rounded-md font-medium"
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Verify;

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect } from "react";
import toast from "react-hot-toast";

import { ResetUserForm } from "../../api/AuthApi";
import Loader from "../utils/Loader";

const RestForm = () => {
  const navigate = useNavigate();

  const { handleSubmit, register, reset } = useForm({
    defaultValues: { email: "" },
  });

  const { isError, isPending, error, isSuccess, mutate } = useMutation({
    mutationFn: ResetUserForm,
    onSuccess: () => {
      navigate("/reset");
    },
  });

  const submit = useCallback(
    (data) => {
      mutate(data);
      reset();
    },
    [mutate, reset]
  );

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("check your mail");
    }
  }, [isSuccess]);

  return (
    <React.Fragment>
      {isPending ? (
        <Loader />
      ) : (
        <div className="h-screen w-screen flex items-center justify-center">
          <div className="bg-transparent border border-[rgba(255,255,255,.2)] backdrop-blur-lg  w-[300px] h-[300px] md:w-[400px] rounded-lg m-20 flex justify-center items-center flex-col">
            <h2 className="text-center pt-6 text-white text-2xl font-bold">
              Reset your password
            </h2>
            <form
              onSubmit={handleSubmit(submit)}
              className="mx-5 my-10 md:mx-14 flex justify-center flex-col"
            >
              <div>
                <label htmlFor="email" className="block">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="outline-none border-white border bg-transparent w-64 md:w-72 mb-6 mt-2 rounded-md h-8 px-3"
                  placeholder="Enter your email"
                  {...register("email")}
                />
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

export default RestForm;

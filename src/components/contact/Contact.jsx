import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { contactSchema } from "../../validation/contact";
import Loader from "../utils/Loader";

const Contact = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { firstName: "", lastName: "", email: "", message: "" },
    resolver: yupResolver(contactSchema),
  });

  const { mutate, error, isError, isPending } = useMutation({
    mutationFn: () => {},
    onSuccess: () => {
      toast.success("you problem is submitted");
    },
  });

  const submit = useCallback(
    (data) => {
      mutate(data);
      console.log(data);
      reset();
    },
    [mutate, reset]
  );

  if (isError) {
    toast.error(error.message);
  }
  return (
    <React.Fragment>
      {isPending ? (
        <Loader />
      ) : (
        <div className="w-screen h-screen flex justify-center items-center">
          <form
            onSubmit={handleSubmit(submit)}
            className="border border-[rgba(255,255,255,.2)] bg-transparent backdrop-blur-3xl w-[500px]  h-[550px] md:h-[500px] mx-6 rounded-md"
          >
            <div className="flex justify-center py-4">
              <h1 className="text-2xl text-white font-bold">Contact us</h1>
            </div>
            <div className="my-4 gap-4 flex justify-center items-center mx-4 flex-col md:flex-row">
              <div className="mx-4 md:py-0">
                <label htmlFor="" className="block md:inline">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  className="mt-2 px-3 bg-transparent placeholder:text-white text-white border border-white rounded-md py-2"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-rose-700">{errors.firstName.message}</p>
                )}
              </div>
              <div className="mx-4 md:py-0">
                <label htmlFor="" className="block md:inline">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  className="mt-2 px-3 bg-transparent placeholder:text-white text-white border border-white rounded-md py-2"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-rose-700">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div className="my-4 flex justify-center max-md:items-center mx-4 flex-col gap-4">
              <div className="flex justify-center flex-col">
                <label htmlFor="" className="block">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your mail"
                  className="block mt-2 px-4 bg-transparent placeholder:text-white text-white border border-white rounded-md py-2"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-rose-700">{errors.email.message}</p>
                )}
              </div>
              <div className="flex justify-center flex-col">
                <label htmlFor="">Message</label>
                <textarea
                  placeholder="Lave you massage"
                  rows={4}
                  cols={25}
                  name="message"
                  id="message"
                  className="mt-2 px-4 bg-transparent placeholder:text-white text-white border border-white rounded-md py-2 resize-none"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-rose-700">{errors.message.message}</p>
                )}
              </div>
            </div>
            <div className="my-4 flex justify-center items-center flex-col">
              <button
                className="w-60 md:w-max-[480px] mx-4 bg-white rounded-full py-2 text-black"
                type="submit"
              >
                submit
              </button>
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default Contact;

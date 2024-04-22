import * as yup from "yup";

export const contactSchema = yup.object({
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Please enter minium 3 character")
    .max(10, "You touch character limit"),
  email: yup
    .string()
    .email("This not look like mail")
    .required("Please enter your valid email"),
  message: yup
    .string()
    .required("Please enter your valid email")
    .min(10, "please min 10 character"),
});

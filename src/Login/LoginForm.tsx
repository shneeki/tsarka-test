import * as React from "react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  ErrorMessage,
  useFormik,
} from "formik";

import * as EmailValidator from "email-validator"; // used when validating with a self-implemented approach
import * as Yup from "yup"; // used when validating with a pre-built solution

interface LoginFormValues {
  email: string;
  password: string;
}

// let errors: FormikErrors<FormValues> = {};
const LoginForm = () => {
  return <h1>Hi! This is login form</h1>;
};

export default LoginForm;

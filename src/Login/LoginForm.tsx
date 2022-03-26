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
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(`You are registered! Email: ${values.email}. Password: ${values.password}.
        `);
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required("Password is required"),
    }),
  });

  return (
    <div className="bg-blue-300 min-w-screen min-h-screen overflow-x-hidden">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-lg mx-auto bg-white rounded shadow-lg mt-7 p-3"
      >
        <h1 className="text-3xl mb-3 text-center">Register</h1>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className={`block w-full rounded border py-1 px-2 ${
              formik.touched.email && formik.errors.email
                ? "border-red-400"
                : "border-gray-300"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-red-400">{formik.errors.email}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className={`block w-full rounded border py-1 px-2 ${
              formik.touched.password && formik.errors.password
                ? "border-red-400"
                : "border-gray-300"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <span className="text-red-400">{formik.errors.password}</span>
          )}
        </div>

        <div className="text-center">
          <button className="bg-blue-500 rounded p-3 text-white" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

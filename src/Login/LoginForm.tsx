import * as React from "react";
import { useFormik } from "formik";

import * as Yup from "yup";

export interface ILoginValues {
  email: string;
  password: string;
}
interface ILoginForm {
  onSubmitHandler: (values: ILoginValues) => void | Promise<any>;
}
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const LoginForm = ({ onSubmitHandler }: ILoginForm) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: onSubmitHandler,
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required("Password is required"),
    }),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" max-w-xs md:max-w-md lg:max-w-3xl mx-auto bg-white rounded shadow-lg text-tsarka-indigo-dark "
    >
      <h1 className="text-3xl mb-3 text-center">Login</h1>

      <div className="mb-4 p-6">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className={`block w-full rounded border py-1 px-2 border-solid ${
            formik.touched.email && formik.errors.email
              ? "border-red-400"
              : "border-black"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-tsarka-pink-dark">
            {capitalizeFirstLetter(formik.errors.email)}
          </span>
        )}
      </div>
      <div className="mb-4 p-6">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className={`block w-full rounded border border-solid py-1 px-2 ${
            formik.touched.password && formik.errors.password
              ? "border-red-400"
              : "border-gray-300"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <span className="text-tsarka-pink-dark">
            {capitalizeFirstLetter(formik.errors.password)}
          </span>
        )}
      </div>

      <div className="text-center p-3">
        <button
          className="bg-tsarka-cyan-light rounded p-3 text-tsarka-indigo-dark"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

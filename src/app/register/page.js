"use client";
import { Formik, Field, Form } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

const page = () => {
  const router = useRouter()

  const SignupSchema = Yup.object().shape({
    fullName: Yup.string().required("Fullname is required"),
    phoneNumber: Yup.string().required("Phonenumber is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const handleRegister = async (values) => {
    const res = await fetch("https://ecommerce-backend-zf6v.onrender.com/api/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    const data = await res.json();
    if (res.status == 200) {
      router.push("/login");
    }
    toast(data.msg);
  };
  return (
    <div className="flex w-full justify-center h-[90vh] items-center">
      <Formik
        initialValues={{
          fullName: "",
          phoneNumber: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          handleRegister(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="bg-slate-50 shadow-2xl p-10 rounded-lg">
            <div className="mb-4">
              <Field
                name="fullName"
                type="text"
                placeholder="Enter your fullname"
                className="w-96 p-3 border border-gray-300 rounded"
              />
              {errors.fullName && touched.fullName ? (
                <div className="text-red-500 mt-2">{errors.fullName}</div>
              ) : null}
              
            </div>

            <div className="mb-4">
              <Field
                name="phoneNumber"
                type="text"
                placeholder="Enter your phonenumber"
                className="w-96 p-3 border border-gray-300 rounded"
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div className="text-red-500 mt-2">{errors.phoneNumber}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <Field
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-96 p-3 border border-gray-300 rounded"
              />
              {errors.email ? (
                <div className="text-red-500 mt-2">{errors.email}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <Field
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-96 p-3 border border-gray-300 rounded"
              />
              {errors.password && touched.password ? (
                <div className="text-red-500 mt-2">{errors.password}</div>
              ) : null}
            </div>

            <button
              type="submit"
              className="w-40 ml-30 mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default page;

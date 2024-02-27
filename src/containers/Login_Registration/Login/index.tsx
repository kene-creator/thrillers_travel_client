import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, CircularProgress } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { loginSuccess } from "../../../app/auth_state";

import { useDispatch } from "react-redux";

interface FormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setIsLoading] = React.useState<boolean>(false);

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(loginSuccess(data));
        setIsLoading(false);
        navigate("/dashboard");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="bg-white z-30 py-8 px-6 mt-4 flex justify-center items-center main_font flex-col w-[90%] md:w-[55%] lg:w-[40%]">
        <div className="flex items-center justify-center mb-8">
          <Link to="/" className="text-[3rem] font-bold text-[#3563E9]">
            Thrillers Travel
          </Link>
        </div>
        <div className="w-96 flex flex-col justify-between items-center">
          <h1 className="text-3xl font-bold mb-6">Sign in</h1>
          <div className="flex flex-col w-[80%] md:w-full">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="mb-4">
                  <Field
                    as={TextField}
                    label="Email Address *"
                    name="email"
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-[0.7rem]"
                  />
                </div>
                <div className="mb-4">
                  <Field
                    as={TextField}
                    label="Password *"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-[0.7rem]"
                  />
                </div>
                <div className="flex justify-between items-center mt-8">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#3563E9",
                      color: "white",
                      paddingX: "20px",
                      "&:hover": {
                        backgroundColor: "#2c54b2",
                      },
                    }}
                    endIcon={<ArrowForward />}
                  >
                    {loading ? (
                      <CircularProgress color="inherit" size={15} />
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <Link
                    to="/forgot-password"
                    className="font-medium text-[0.8rem]"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </Form>
            </Formik>
            <div className="flex items-center justify-center bg-[#000] mt-12 text-center">
              <Link to="/registration" className="py-3 px-16 text-white">
                CREATE NEW ACCOUNT
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <p>Terms</p>
      </div>
    </div>
  );
};

export default LoginPage;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, CircularProgress } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRegistrationAccessToken } from "../../../app/auth_state";

interface FormValues {
  email: string;
  password: string;
}

const RegistrationPage: React.FC = () => {
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
      const response = await fetch("http://localhost:3001/users", {
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
        dispatch(setRegistrationAccessToken(data));
        navigate("/login");
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="bg-white z-30 py-8 px-6 mt-4 flex justify-center items-center main_font flex-col w-[90%] md:w-[55%] lg:w-[40%] min-h-[85%] md:min-h-[90%]">
        <div className="flex items-center justify-center mb-4">
          <Link to="/" className="text-[3rem] font-bold text-[#3563E9]">
            Thrillers Travel
          </Link>
        </div>
        <div className="w-96 flex flex-col justify-between items-center">
          <h1 className="text-3xl font-bold mb-6">Register</h1>
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
                <div className="flex justify-between items-center mt-8 gap-6">
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
                      "Register"
                    )}
                  </Button>
                  <Link to="/login" className="font-medium text-[0.8rem]">
                    Already have an account? Sign in
                  </Link>
                </div>
              </Form>
            </Formik>
            <div className="flex items-center justify-center bg-[#000] mt-12 md:mt-4 text-center">
              <Link to="/login" className="py-3 px-16 text-white">
                BACK TO LOGIN
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;

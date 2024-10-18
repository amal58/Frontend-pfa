import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField } from "../components/textField";

export const Loginpage = () => {
  const onSubmit = async (values) => {
    const response = await axios
      .post("http://localhost:5000/user/login", values)
      .catch((err) => {
        console.log(err.response);
      });
    if (response) {
      console.log(response);
      alert("Welcome back in. Authenticating...");
      console.log(response.data.resultat.role);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("idUser", response.data.resultat.id);

      localStorage.setItem("nom", response.data.resultat.nom);
      localStorage.setItem("prenom", response.data.resultat.prenom);
      if (response.data.resultat.role === "admin") {
        window.location = "/dashAdmin";
      }
      if (response.data.resultat.role === "etudiant") {
        window.location = "/dashEtudiant";
      }
      if (response.data.resultat.role === "enseignant") {
        window.location = "/dashEnseignant";
      }
    }
  };
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string().required("required"),
        })}
        onSubmit={onSubmit}
        className="trah"
      >
        {({ values, errors, handleSubmit }) => {
          console.log(errors);
          return (
            <Form onSubmit={handleSubmit}>
              <TextField label="E-mail" name="email" type="email" />
              <TextField label="Mot De Passe" name="password" type="password" />
              <div className="d-flex justify-content-around"></div>
              <button
                className="btn btn-primary btn-lg login-btn mx-auto d-block"
                type="submit"
              >
                Login
              </button>
              <br></br>
              <div className="text-center">
                <a
                  href="/forgotPass"
                  className="d-flex align-items-center justify-content-center"
                >
                  Forgot Password? 🔒
                  <i className="bx bx-chevron-right scaleX-n1-rtl bx-sm"></i>
                </a>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

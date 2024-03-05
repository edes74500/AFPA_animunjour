import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const validationSchema = Yup.object().shape({
  nom: Yup.string().required("Le nom est obligatoire"),
  email: Yup.string()
    .email("Email invalide")
    .required("L’email est obligatoire")
    .test("has-domain", "L’email doit contenir un domaine valide avec un TLD", (value) =>
      /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value)
    ),
});

const FormikYup = () => (
  <StyledDiv>
    <Formik
      initialValues={{ nom: "", email: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Field type="text" name="nom" />
          <ErrorMessage name="nom" component="div" />

          <Field
            type="email"
            name="email"
            style={errors.email && touched.email ? { border: "1px red solid" } : { border: "1px black solid" }}
          />
          <ErrorMessage className="error" name="email" component="div" />

          <button type="submit" disabled={isSubmitting}>
            Soumettre
          </button>
        </Form>
      )}
    </Formik>
  </StyledDiv>
);

export default FormikYup;

const StyledDiv = styled.div`
  form {
    margin-top: 20px;

    display: flex;
    flex-direction: column;
    max-width: 200px;
    /* align-items: center; */
    .error {
      color: red;
    }
  }
`;

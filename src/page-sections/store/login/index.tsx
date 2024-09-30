"use client";

import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
// GLOBAL CUSTOM COMPONENTS
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import MoreShopTextField from "@/components/controls/MoreshopTextField";
import EyeToggleButton from "@/components/icon/eye-toggle-button";
import { useAuth } from "@/hooks/useTenantAuth";

const LoginPageView = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const togglePasswordVisible = () => setVisiblePassword((prev) => !prev);
  const { login } = useAuth();

  // LOGIN FORM FIELDS INITIAL VALUES
  const initialValues = { email: "", password: "" };

  // LOGIN FORM FIELD VALIDATION SCHEMA
  const validationSchema = yup.object().shape({
    password: yup.string().required("Password is required"),
    email: yup.string().email("invalid email").required("Email is required"),
  });
  const router = useRouter();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        login(values.email, values.password, "tenant");
        router.push("/store/dashboard");
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <MoreShopTextField
        mb={1.5}
        fullWidth
        name="email"
        size="small"
        type="email"
        variant="outlined"
        onBlur={handleBlur}
        value={values.email}
        onChange={handleChange}
        label="Email or Phone Number"
        placeholder="exmple@mail.com"
        error={!!touched.email && !!errors.email}
        helperText={(touched.email && errors.email) as string}
      />

      <MoreShopTextField
        mb={2}
        fullWidth
        size="small"
        name="password"
        label="Password"
        autoComplete="on"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.password}
        placeholder="*********"
        type={visiblePassword ? "text" : "password"}
        error={!!touched.password && !!errors.password}
        helperText={(touched.password && errors.password) as string}
        InputProps={{
          endAdornment: (
            <EyeToggleButton
              show={visiblePassword}
              click={togglePasswordVisible}
            />
          ),
        }}
      />

      <Button
        fullWidth
        type="submit"
        color="primary"
        variant="contained"
        size="large"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginPageView;

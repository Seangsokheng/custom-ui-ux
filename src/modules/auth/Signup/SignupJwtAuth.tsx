import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import * as yup from "yup";

import AppInfoView from "@crema/components/AppInfoView";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IntlMessages from "@crema/helpers/IntlMessages";
import AppTextField from "@crema/components/AppFormComponents/AppTextField";
import { Fonts } from "@crema/constants/AppEnums";
import { Link, useNavigate } from "react-router-dom";
import { useAuthMethod } from '@crema/hooks/AuthHooks';
import { useIntl } from "react-intl";
import AuthWrapper from "../AuthWrapper";
import CircularProgress from "@mui/material/CircularProgress";
import OtpVerification from "./OtpVerification";
import GoogleButton from "./SignupWithGoogle";
import Divider from "@mui/material/Divider";

const SignupJwtAuth = () => {
  const { signUpUser } = useAuthMethod();
  const { messages } = useIntl();
  const navigate = useNavigate();
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  // Enhanced validation schema with specific requirements
  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required(String(messages["validation.firstNameRequired"] || "Please enter first name!")),
    lastName: yup
      .string()
      .required(String(messages["validation.lastNameRequired"] || "Please enter last name!")),
    username: yup
      .string()
      .min(5, "Username must be at least 5 characters")
      .required(String(messages["validation.usernameRequired"] || "Username is required")),
    email: yup
      .string()
      .email(String(messages["validation.emailFormat"] || "Invalid email format"))
      .matches(
        /@paragoniu\.edu\.kh$/,
        "Must use your school email (@paragoniu.edu.kh)"
      )
      .required(String(messages["validation.emailRequired"] || "Email is required")),
    phone: yup
      .string()
      .matches(
        /^(0|(\+855))[1-9][0-9]{7,8}$/,
        "Please enter a valid Cambodian phone number"
      )
      .required(String(messages["validation.phoneRequired"] || "Phone number is required")),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required(String(messages["validation.passwordRequired"] || "Please enter password!")),
  });

  interface SignupFormValues {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
  }

  const handleSubmit = async (data: SignupFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    setSubmitting(true);
    try {          
      console.log("Data submitted: ", data);
      
      // Make sure property names match what JWTAuthProvider expects
      await signUpUser({
        firstname: data.firstName,
        lastname: data.lastName,    
        username: data.username,  
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      
      console.log("Signup completed, awaiting OTP verification");
      setRegisteredEmail(data.email);
      setShowOtpVerification(true);
      
    } catch(error) {  
      console.error("Signup error in component:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerificationSuccess = () => {
    console.log("OTP verification successful");
    navigate('/signin');
  };

  // If OTP verification is active, show that component
  if (showOtpVerification) {
    return (
      <AuthWrapper>
        <OtpVerification 
          email={registeredEmail} 
          onVerificationSuccess={handleVerificationSuccess} 
        />
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mb: 1.5,
            color: (theme) => theme.palette.text.primary,
            fontWeight: Fonts.SEMI_BOLD,
            textAlign: "center",
          }}
        >
          <IntlMessages id="common.signup" defaultMessage="Sign Up" />
        </Typography>

        {/* Google Sign Up Button */}
        <Box sx={{ mb: 3, mt: 1 }}>
          <GoogleButton 
            fullWidth 
            variant="outlined"
            sx={{
              borderRadius: "30px",
              padding: "10px",
              fontSize: 14,
              fontWeight: Fonts.MEDIUM,
            }}
          />
        </Box>

        <Divider sx={{ mb: 3 }}>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
              px: 2,
            }}
          >
            <IntlMessages id="common.or" defaultMessage="OR" />
          </Typography>
        </Divider>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", mb: 3 }}>
          <Formik
            validateOnChange={true}
            validateOnBlur={true}
            initialValues={{
              firstName: "",
              lastName: "",
              username: "",
              email: "",
              phone: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, errors, touched }) => (
              <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
                <Grid container spacing={2}>
                  {/* First Name and Last Name Fields (side by side) */}
                  <Grid item xs={12} sm={6}>
                    <AppTextField
                      label={<IntlMessages id="common.firstName" defaultMessage="First Name" />}
                      name="firstName"
                      variant="outlined"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          fontSize: 14,
                          padding: "12px 16px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <AppTextField
                      label={<IntlMessages id="common.lastName" defaultMessage="Last Name" />}
                      name="lastName"
                      variant="outlined"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          fontSize: 14,
                          padding: "12px 16px",
                        },
                      }}
                    />
                  </Grid>

                  {/* Username Field */}
                  <Grid item xs={12}>
                    <AppTextField
                      label={<IntlMessages id="username" defaultMessage="Username" />}
                      name="username"
                      variant="outlined"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          fontSize: 14,
                          padding: "12px 16px",
                        },
                      }}
                      helperText={touched.username && errors.username ? errors.username : "Choose a unique username (min 5 characters)"}
                    />
                  </Grid>

                  {/* Email Field */}
                  <Grid item xs={12}>
                    <AppTextField
                      label={<IntlMessages id="common.email" defaultMessage="School Email" />}
                      name="email"
                      variant="outlined"
                      placeholder="your.name@paragoniu.edu.kh"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          fontSize: 14,
                          padding: "12px 16px",
                        },
                      }}
                      helperText={touched.email && errors.email ? errors.email : "Use your @paragoniu.edu.kh email address"}
                    />
                  </Grid>

                  {/* Phone Field */}
                  <Grid item xs={12}>
                    <AppTextField
                      label={<IntlMessages id="common.phone" defaultMessage="Phone" />}
                      name="phone"
                      variant="outlined"
                      placeholder="0XX XXX XXX"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          fontSize: 14,
                          padding: "12px 16px",
                        },
                      }}
                      helperText={touched.phone && errors.phone ? errors.phone : "Enter a valid Cambodian phone number"}
                    />
                  </Grid>
                  
                  {/* Password Field */}
                  <Grid item xs={12}>
                    <AppTextField
                      label={<IntlMessages id="common.password" defaultMessage="Password" />}
                      name="password"
                      type="password"
                      variant="outlined"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          fontSize: 14,
                          padding: "12px 16px",
                        },
                      }}
                      helperText={
                        touched.password && errors.password 
                          ? errors.password 
                          : "Password must be at least 8 characters and include uppercase, lowercase, and numbers"
                      }
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    sx={{
                      minWidth: 180,
                      fontWeight: Fonts.MEDIUM,
                      fontSize: 16,
                      textTransform: "capitalize",
                      padding: "10px 20px",
                      borderRadius: "30px",
                      boxShadow: (theme) => theme.shadows[3],
                      "&:hover": {
                        boxShadow: (theme) => theme.shadows[5],
                      },
                    }}
                    type="submit"
                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                  >
                    <IntlMessages id="common.signup" defaultMessage="Sign Up" />
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>

        <Box
          sx={{
            color: "grey.700",
            mt: 3,
            textAlign: "center"
          }}
        >
          <span style={{ marginRight: 4 }}>
            <IntlMessages id="common.alreadyHaveAccount" defaultMessage="Already have account?" />
          </span>
          <Box
            component="span"
            sx={{
              fontWeight: Fonts.MEDIUM,
              "& a": {
                color: (theme) => theme.palette.primary.main,
                textDecoration: "none",
                transition: "color 0.3s ease",
                "&:hover": {
                  textDecoration: "underline",
                },
              },
            }}
          >
            <Link to="/signin">
              <IntlMessages id="common.signIn" defaultMessage="Sign In" />
            </Link>
          </Box>
        </Box>

        <AppInfoView />
      </Box>
    </AuthWrapper>
  );
};

export default SignupJwtAuth;
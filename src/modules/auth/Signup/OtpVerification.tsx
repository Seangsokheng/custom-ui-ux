import React, { useState } from 'react';
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import * as yup from "yup";
import AppInfoView from "@crema/components/AppInfoView";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IntlMessages from "@crema/helpers/IntlMessages";
import AppTextField from "@crema/components/AppFormComponents/AppTextField";
import { Fonts } from "@crema/constants/AppEnums";
import CircularProgress from "@mui/material/CircularProgress";
import { useJWTAuthActions } from '@crema/services/auth/jwt-auth/JWTAuthProvider';

interface OtpVerificationProps {
  email: string;
  onVerificationSuccess: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ email, onVerificationSuccess }) => {
  const { verifyOtp, resendOtp } = useJWTAuthActions();
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Validation schema for OTP
  const validationSchema = yup.object({
    otp: yup
      .string()
      .required("Please enter the verification code")
      .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
  });

  // Handle resending OTP
  const handleResendOtp = async () => {
    if (countdown > 0) return;
    
    setIsResending(true);
    try {
      await resendOtp(email);
      // Start countdown for 60 seconds
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error resending OTP:", error);
    } finally {
      setIsResending(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (data: { otp: string }, { setSubmitting, setFieldError }: any) => {
    setSubmitting(true);
    try {
      const response = await verifyOtp(email, data.otp);
      
      if (response.verified) {
        onVerificationSuccess();
      } else {
        setFieldError('otp', 'Invalid verification code');
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setFieldError('otp', (error as any).response?.data?.msg || 'Verification failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
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
        <IntlMessages id="common.verifyEmail" defaultMessage="Verify Your Email" />
      </Typography>

      <Typography
        sx={{
          mb: 3,
          color: (theme) => theme.palette.text.secondary,
          textAlign: "center",
        }}
      >
        We've sent a 6-digit verification code to<br/>
        <strong>{email}</strong>
      </Typography>

      <Formik
        validateOnChange={true}
        validateOnBlur={true}
        initialValues={{ otp: '' }}
        validationSchema={validationSchema}
        onSubmit={handleVerifyOtp}
      >
        {({ isSubmitting }) => (
          <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
            <AppTextField
              label={<IntlMessages id="common.verificationCode" defaultMessage="Verification Code" />}
              name="otp"
              variant="outlined"
              sx={{
                width: "100%",
                "& .MuiInputBase-input": {
                  fontSize: 14,
                  padding: "12px 16px",
                  textAlign: "center",
                  letterSpacing: "0.5rem"
                },
              }}
            />

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
                <IntlMessages id="common.verify" defaultMessage="Verify & Continue" />
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography
          sx={{
            color: (theme) => theme.palette.text.secondary,
            mb: 1,
          }}
        >
          <IntlMessages id="common.didntReceiveCode" defaultMessage="Didn't receive the code?" />
        </Typography>
        <Button
          color="primary"
          disabled={isResending || countdown > 0}
          onClick={handleResendOtp}
          sx={{
            textTransform: "none",
            fontWeight: Fonts.MEDIUM,
            "&.Mui-disabled": {
              color: "text.disabled",
            },
          }}
        >
          {countdown > 0 ? `Resend code in ${countdown}s` : "Resend Code"}
        </Button>
      </Box>
      
      <AppInfoView />
    </Box>
  );
};

export default OtpVerification;
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import {
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { BlueButton, DecideButton } from "../../commonStyle";
import { checkCodeOfEmail } from "../../../redux/auth/authActions";
import { resetDefault } from "../../../redux/auth/authSlice";

export default function VerifyCode(mainProps: any) {
  const { formik } = mainProps;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Typography
        style={{
          fontSize: "17px",
          textAlign: "center",
          marginTop: "-10px"
        }}
      >
        {t('reset-password-title.code-info')}
      </Typography>
      <Typography style={{ alignSelf: 'center', fontWeight: 'bold', marginBottom: "20px" }}>{formik.values.email}</Typography>
      <TextField
        fullWidth
        id="code"
        name="code"
        label={t('reset-password-data.code')}
        value={formik.values.code}
        onChange={formik.handleChange}
        error={formik.touched.code && Boolean(formik.errors.code)}
        helperText={formik.touched.code && formik.errors.code}
      />
      <Box style={{ margin: "10px 0px", display: 'flex', justifyContent: 'space-between' }}>
        <DecideButton
          disabled={loading}
          onClick={() => mainProps.handleBack()}
          sx={{ marginRight: '10px' }}
        >
          {t('signup-title.back-btn')}
        </DecideButton>
        <BlueButton disabled={loading} onClick={() => {
          formik.validateForm().then((res: any) => {
            const { code } = res;
            if (code) {
              formik.setFieldTouched('code', true, true);
              formik.setFieldError('code', code);
            }

            if (!code) {
              const sendEmailCodeObj = {
                email: formik.values.email,
                code: formik.values.code,
                function_type: "RESET_PASSWORD"
              }
              setLoading(true);
              dispatch(checkCodeOfEmail(sendEmailCodeObj)).then((res: any) => {
                const { payload } = res;
                const { message, success } = payload;
                enqueueSnackbar(message);
                if (success) {
                  dispatch(resetDefault());
                  mainProps.handleNext();
                }
                setLoading(false);
              }).catch((err) => {
                setLoading(false);
                enqueueSnackbar("Error occured");
              })
            }
          })
        }}>
          {t('signup-title.next-btn')}
        </BlueButton>
      </Box>
    </ >
  );
}
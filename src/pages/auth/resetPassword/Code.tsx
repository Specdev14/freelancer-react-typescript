import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import {
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { Formik } from "formik";
import { useAppDispatch } from "../../../redux/hooks";
import { checkCodeOfEmail } from "../../../redux/auth/authActions";
import { resetDefault } from "../../../redux/auth/authSlice";
import Button from "../../../components/button/Button";
import Card from "../../../components/card/Card";
import Form from "../../../components/form/Form";
import WithTranslateFormErrors from "../../../services/validationScemaOnLangChange";
import { useNavigate } from "../../../routes/Router";
import CustomBackdrop from "../../../components/customBackdrop/CustomBackdrop";
import '../auth.css';


export default function VerifyCode(mainProps: any) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [backdrop, setBackdrop] = React.useState(false);
  const resetPasswordData = sessionStorage.getItem('reset-password-data') ? JSON.parse(`${sessionStorage.getItem('reset-password-data')}`) : {};
  const [formData] = React.useState({
    code: resetPasswordData.code || ''
  });

  React.useEffect(() => {
    document.title = t('title.reset-password');
    if (resetPasswordData) {
      const temp = { ...resetPasswordData };
      delete temp['password'];
      delete temp['confirm_password'];
      sessionStorage.setItem('reset-password-data', JSON.stringify(temp))
    }
  })

  return (
    <Box className='container'>
      <Card className={`auth-card`}>
        <Formik
          enableReinitialize
          initialValues={formData}
          validationSchema={yup.object({
            code: yup.number()
              .required(t('validation.code-required')),
          })}
          onSubmit={() => { }}
        >
          {formik => (
            <WithTranslateFormErrors {...formik}>
              <Form>
                <img
                  src="/images/rounx-symbol.png"
                  alt="Rounx"
                  width="60px"
                  height="60px"
                  className='primary-color'
                  style={{ alignSelf: "center" }}
                />
                <Typography className="account-title-info">
                  {t('signup-code-title')}
                  <br />
                  <span style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}>{resetPasswordData.email}</span>
                </Typography>
                <TextField
                  fullWidth
                  id="code"
                  name="code"
                  label={t('code')}
                  value={formik.values.code || ''}
                  onChange={formik.handleChange}
                  error={formik.touched.code && Boolean(formik.errors.code)}
                  helperText={formik.touched.code && formik.errors.code as ReactNode}
                />
                <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={() => {
                    formik.validateForm().then((res: any) => {
                      const { code } = res;
                      if (code) {
                        formik.setFieldTouched('code', true, true);
                        formik.setFieldError('code', code);
                      }

                      if (!code) {
                        const sendEmailCodeObj = {
                          email: resetPasswordData.email,
                          code: formik.values.code,
                          function_type: "RESET_PASSWORD"
                        }
                        setBackdrop(true);
                        dispatch(checkCodeOfEmail(sendEmailCodeObj)).then((res: any) => {
                          const { payload } = res;
                          const { message, success } = payload;
                          enqueueSnackbar(message);
                          if (success) {
                            dispatch(resetDefault());
                            sessionStorage.setItem('reset-password-data', JSON.stringify({ ...formik.values, ...JSON.parse(`${sessionStorage.getItem('reset-password-data')}`) }))
                            navigate(`/reset-password/set-password`)
                          }
                          setBackdrop(false);
                        }).catch((err) => {
                          setBackdrop(false);
                          enqueueSnackbar("Error occured");
                        })
                      }
                    })
                  }}>
                    {t('next')}
                  </Button>
                </Box>
              </Form>
            </WithTranslateFormErrors>
          )}
        </Formik>
        <CustomBackdrop loading={backdrop} />
      </Card>
    </Box>
  );
}

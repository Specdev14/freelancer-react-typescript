import { ReactNode, useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import * as yup from "yup";
import { FieldArray, Formik, getIn } from 'formik';
import { Divider, FormHelperText, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Form from '../../components/form/Form';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import { useNavigate } from '../../routes/Router';
import WithTranslateFormErrors from '../../services/validationScemaOnLangChange';
import './applyFreelancer.css';

const Experience = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    let pushMethod: any = () => { }

    const freelancerApplicationInfo = sessionStorage.getItem('freelancer-application-info') ? JSON.parse(`${sessionStorage.getItem('freelancer-application-info')}`) : {};
    const [freelancerData] = useState({
        experiences: freelancerApplicationInfo.experiences && freelancerApplicationInfo.experiences.length > 0 ?
            freelancerApplicationInfo.experiences
            :
            [{
                company_name: '',
                job_title: '',
                start_year: '',
                end_year: '',
                description: '',
            }]
    });

    useEffect(() => {
        document.title = t('title.freelancer');
    })

    return (
        <Box>
            <Box className="freelancer-main-title">{t('freelancer.title')}</Box>
            <Card className={`freelancer-card`}>
                <Box className={`freelancer-heading heading-flex`}>
                    <Box>
                        <Box className='heading-title'>{t('freelancer.experience.title')}</Box>
                        <Box className='heading-steps'>{t('freelancer.experience.subtitle')}</Box>
                    </Box>
                    <Box className="center-item">
                        <AddIcon className='add-icon' onClick={() => {
                            pushMethod({
                                company_name: '',
                                job_title: '',
                                start_year: '',
                                end_year: '',
                                description: '',
                            })
                        }} />
                    </Box>
                </Box>
                <Divider />
                <Formik
                    enableReinitialize
                    initialValues={freelancerData}
                    validationSchema={yup.object({
                        experiences: yup.array()
                            .of(yup.object().shape({
                                job_title: yup.string().required(t('validation.job-title-required')),
                                company_name: yup.string().required(t('validation.company-name-required')),
                                start_year: yup
                                    .number()
                                    .integer()
                                    .min(1990, t('validation.start-year-max', { max: 1990 }))
                                    .required(t('validation.start-year-required')),
                                end_year: yup
                                    .number()
                                    .integer()
                                    .nullable()
                                    .moreThan(yup.ref("start_year"), t('validation.end-year-min'))
                                    .max(new Date().getFullYear(), t('validation.end-year-max')),
                                description: yup.string()
                                    .min(20, t('validation.characters-min', { min: 20 }))
                                    .max(1000, t('validation.characters-max', { max: 1000 }))
                                    .nullable()
                            }))
                            .min(1)
                            .max(20, t('validation.experience-max'))
                    })}
                    onSubmit={values => {
                        console.log("onSubmit", JSON.stringify(values, null, 2));
                    }}
                >
                    {formik =>
                        <WithTranslateFormErrors {...formik}>
                            <Box className={`freelancer-body`}>
                                <FieldArray name="experiences">
                                    {({ unshift, remove }) => (
                                        formik.values.experiences.map((exp: any, index: number) => {
                                            pushMethod = unshift;

                                            const jobTitle = `experiences[${index}].job_title`;
                                            const touchedJobTitle = getIn(formik.touched, jobTitle);
                                            const errorJobTitle = getIn(formik.errors, jobTitle);

                                            const companyName = `experiences[${index}].company_name`;
                                            const touchedCompanyName = getIn(formik.touched, companyName);
                                            const errorCompanyName = getIn(formik.errors, companyName);

                                            const startYear = `experiences[${index}].start_year`;
                                            const touchedStartYear = getIn(formik.touched, startYear);
                                            const errorStartYear = getIn(formik.errors, startYear);

                                            const endYear = `experiences[${index}].end_year`;
                                            const touchedEndYear = getIn(formik.touched, endYear);
                                            const errorEndYear = getIn(formik.errors, endYear);

                                            const description = `experiences[${index}].description`;
                                            const touchedDescription = getIn(formik.touched, description);
                                            const errorDescription = getIn(formik.errors, description);

                                            return (
                                                <Box key={index} className="freelancer-experience-flex">
                                                    <Box className="freelancer-card-spacing">
                                                        <CloseIcon
                                                            className='close-icon'
                                                            onClick={() => {
                                                                if (formik.values.experiences.length > 1) {
                                                                    remove(index)
                                                                }
                                                            }}
                                                        />
                                                    </Box>
                                                    <Box className="freelancer-card-spacing" style={{ paddingLeft: 0, width: '100%' }}>
                                                        <Form>
                                                            <TextField
                                                                fullWidth
                                                                id={jobTitle}
                                                                name={jobTitle}
                                                                type="text"
                                                                label={t('freelancer.experience.position')}
                                                                value={exp.job_title ? exp.job_title : ''}
                                                                onChange={formik.handleChange}
                                                                error={touchedJobTitle && Boolean(errorJobTitle)}
                                                                helperText={touchedJobTitle && errorJobTitle && (errorJobTitle as ReactNode)}
                                                            />
                                                            <TextField
                                                                fullWidth
                                                                id={companyName}
                                                                name={companyName}
                                                                type="text"
                                                                label={t('freelancer.experience.company')}
                                                                value={exp.company_name ? exp.company_name : ''}
                                                                onChange={formik.handleChange}
                                                                error={touchedCompanyName && Boolean(errorCompanyName)}
                                                                helperText={touchedCompanyName && errorCompanyName && (errorCompanyName as ReactNode)}
                                                            />
                                                            <Box style={{ display: 'flex', gap: '24px' }}>
                                                                <TextField
                                                                    fullWidth
                                                                    id={startYear}
                                                                    name={startYear}
                                                                    type="text"
                                                                    label={t('freelancer.experience.start-year')}
                                                                    value={exp.start_year ? exp.start_year : ''}
                                                                    onChange={formik.handleChange}
                                                                    error={touchedStartYear && Boolean(errorStartYear)}
                                                                    helperText={touchedStartYear && errorStartYear && (errorStartYear as ReactNode)}
                                                                />
                                                                <TextField
                                                                    fullWidth
                                                                    id={endYear}
                                                                    name={endYear}
                                                                    type="text"
                                                                    label={t('freelancer.experience.end-year')}
                                                                    value={exp.end_year ? exp.end_year : ''}
                                                                    onChange={formik.handleChange}
                                                                    error={touchedEndYear && Boolean(errorEndYear)}
                                                                    helperText={touchedEndYear && errorEndYear && (errorEndYear as ReactNode)}
                                                                />
                                                            </Box>
                                                            <TextField
                                                                multiline={true}
                                                                rows={5}
                                                                fullWidth
                                                                id={description}
                                                                name={description}
                                                                type="text"
                                                                label={t('freelancer.experience.description')}
                                                                value={exp.description ? exp.description : ''}
                                                                onChange={formik.handleChange}
                                                                error={touchedDescription && Boolean(errorDescription)}
                                                                helperText={touchedDescription && errorDescription && (errorDescription as ReactNode)}
                                                            />
                                                        </Form>
                                                        {index < formik.values.experiences.length - 1 && <Divider className="freelancer-card-spacing" />}
                                                    </Box>
                                                </Box>
                                            )
                                        })
                                    )}
                                </FieldArray>
                                {formik.touched.experiences && formik.errors.experiences && typeof formik.errors.experiences === 'string' && <FormHelperText style={{ padding: '0 72px', color: '#d32f2f' }}>{formik.errors.experiences as ReactNode}</FormHelperText>}
                            </Box>
                            <Box className={`freelancer-footer`}>
                                <Button
                                    onClick={() => {
                                        formik.validateForm().then((res: any) => {
                                            const { experiences } = res;
                                            const isValid = experiences ? experiences.length < 1 : true;
                                            if (!isValid) {
                                                formik.submitForm();
                                            }

                                            const saveData = {
                                                experiences: formik.values.experiences.map((e: any, index: number) => ({ ...e, order: index }))
                                            }

                                            sessionStorage.setItem('freelancer-application-info', JSON.stringify({ ...freelancerApplicationInfo, ...saveData }))
                                            if (isValid) {
                                                navigate('/apply-freelancer/education')
                                            }
                                        })
                                    }}
                                    style={{ float: "right", marginLeft: 10 }}
                                >
                                    {t('next')}
                                </Button>
                                <Button
                                    variant="text"
                                    onClick={() => {
                                        window.history.back()
                                    }}
                                    style={{ float: "right" }}
                                >
                                    {t('back')}
                                </Button>
                            </Box>
                        </WithTranslateFormErrors>
                    }
                </Formik>
            </Card>
        </Box>
    )
}

export default Experience;
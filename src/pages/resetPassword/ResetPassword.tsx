import * as React from 'react';
import Box from '@mui/material/Box';
import { FormBox } from '../../commonStyle/CommonStyle';
import Email from './Email';
import Code from './Code';
import Password from './Password';

export default function ResetPassword() {
	const [activeStep, setActiveStep] = React.useState<number>(0);

	const handleNext = () => {
		const newActiveStep = activeStep + 1;
		setActiveStep(newActiveStep);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const steps = [
		<Email handleNext={handleNext} />,
		<Code handleBack={handleBack} handleNext={handleNext} />,
		<Password handleBack={handleBack} />,
	];

	return (
		<FormBox >
			<Box width='500px'>
				{steps[activeStep]}
			</Box>
		</FormBox >

	);
}
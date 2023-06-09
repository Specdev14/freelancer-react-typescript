import * as React from 'react';
import { useTranslation } from 'react-i18next';
import './notFound.css';
import { Typography } from "@mui/material";

export default function ComingSoon() {
    const { t } = useTranslation()
    React.useEffect(() => {
        document.title = t('title.coming-soon-page')
    })
    return (
        <div className='container'>
            <div className='error-container'>
                <img alt="error-symbol" className='error-symbol' src="/images/rounx-symbol-black.png" height="100" />
                <Typography style={{ fontSize: '40px', fontWeight: 'bold', letterSpacing: 1, marginBottom: '64px', marginTop: '16px' }}>Coming Soon</Typography>
            </div>
        </div>
    )
}
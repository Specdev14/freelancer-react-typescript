import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
    Box,
    Select,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    List,
    ListItemButton,
    ListItemText
} from "@mui/material";
import "./settings.css";
import { useNavigate } from "../../routes/Router";
import useBreakpoint from "../../components/breakpoints/BreakpointProvider";

export default function Settings(props: any) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { isMobile } = useBreakpoint();
    const [url, setUrl] = React.useState(
        location.pathname.endsWith(`/settings`) ?
            location.pathname.replace('/settings', `/zh-CN/settings/personal`)
            :
            `/zh-CN${location.pathname.replace('/zh-CN', '')}`
    );

    React.useEffect(() => {
        window.onpopstate = e => {
            e.preventDefault();
            if (Boolean([
                `/settings/security`,
                `/settings/currency`,
                `/settings/personal`
            ].find(e => location.pathname.endsWith(e)))) {
                setUrl('/zh-CN/settings/personal')
            }
        };
    })

    const handleChange = (path: string) => {
        if (url !== path) {
            setUrl(path);
            navigate(path.replace('/zh-CN', ''), { replace: true });
        }
    };

    return (
        <Box className="rounx-settings">
            <Box>
                <Typography fontSize='24px'>{t('user-settings')}</Typography>
                <br />
                <br />
            </Box>

            <Box sx={{
                display: 'flex',
                width: '100%',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '20px'
            }}>
                {isMobile ?
                    <FormControl fullWidth>
                        <InputLabel id="settings-select-label">{t('user-settings')}</InputLabel>
                        <Select
                            value={url}
                            label="Settings"
                            MenuProps={
                                { className: "rounx-setting-menu" }
                            }
                            labelId="settings-select-label"
                            onChange={(e) => handleChange(e.target.value as string)}
                        >
                            <MenuItem value={`/zh-CN/settings/personal`}>{t('user-settings-personal')}</MenuItem>
                            <MenuItem value={`/zh-CN/settings/security`}>{t('user-settings-security')}</MenuItem>
                            <MenuItem value={`/zh-CN/settings/currency`}>{t('user-settings-currency')}</MenuItem>
                        </Select>
                    </FormControl>
                    :
                    <Box sx={{ width: '284px' }}>
                        <List className="rounx-settings-list" sx={{ width: '100%', paddingRight: '20px' }}>
                            <ListItemButton
                                selected={url.endsWith('/settings/personal')}
                                onClick={() => handleChange('/zh-CN/settings/personal')} >
                                <img className="rounx-settings-icon" alt="personal" src="/images/account.png" />
                                <img className="rounx-settings-icon-hover" alt="personal" src="/images/account-hover.png" />
                                <ListItemText style={{ paddingLeft: '10px' }} primary={t('user-settings-personal')} />
                            </ListItemButton>
                            <ListItemButton
                                selected={url.endsWith('/settings/security')}
                                onClick={() => handleChange('/zh-CN/settings/security')}>
                                <img className="rounx-settings-icon" alt="personal" src="/images/security.png" />
                                <img className="rounx-settings-icon-hover" alt="personal" src="/images/security-hover.png" />
                                <ListItemText style={{ paddingLeft: '10px' }} primary={t('user-settings-security')} />
                            </ListItemButton>
                            <ListItemButton
                                selected={url.endsWith('/settings/currency')}
                                onClick={() => handleChange('/zh-CN/settings/currency')}>
                                <img className="rounx-settings-icon" alt="personal" src="/images/currency.png" />
                                <img className="rounx-settings-icon-hover" alt="personal" src="/images/currency-hover.png" />
                                <ListItemText style={{ paddingLeft: '10px' }} primary={t('user-settings-currency')} />
                            </ListItemButton>
                        </List>
                    </Box>
                }
                <Box sx={{
                    width: isMobile ? '100%' : 'calc(100% - 284px)',
                    border: '1px solid #0000003b',
                    borderRadius: '4px',
                    padding: '20px'
                }}>
                    {props.children}
                </Box>
            </Box>
        </Box >
    );
}

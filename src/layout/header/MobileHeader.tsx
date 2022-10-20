import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { List, Box, TextField, InputAdornment, Divider, Button } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import { PropsInterface } from './DesktopHeader';

export default function MobileHeader({ pages, userMenu, selectedPage, setSelectedPage }: PropsInterface) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

    return (
        <>
            <Box className='rounx-mobile-header'>
                <Box>
                    {menuOpen ?
                        <CloseIcon
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="rounx-mobile-burger"
                        />
                        :
                        <MenuIcon
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="rounx-mobile-burger"
                        />
                    }
                </Box>
                <Box>
                    <img
                        className='rounx-logo'
                        src="/images/rounx-symbol.png"
                        alt="Rounx user"
                        width="40px"
                        height="40px"
                        onClick={() => setSelectedPage("/")}
                    />
                </Box>
                {menuOpen ?
                    <div className='rounx-signin-handle' />
                    :
                    !userMenu ?
                        <Button
                            className="sign-in-button"
                            variant="outlined"
                            style={{ width: 'fit-content', borderRadius: 20 }}
                            onClick={(e) => navigate('/sign-in')}
                        >
                            Sign in
                        </Button>
                        :
                        userMenu
                }
            </Box>
            {menuOpen &&
                <Box className='rounx-floating-menu'>
                    <Box className='rounx-search-container'>
                        <TextField
                            fullWidth
                            className='rounx-search-bar'
                            placeholder={t('header-search-freelancers')}
                            InputProps={{ className: 'rounx-search-input', startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                        />
                    </Box>
                    <List className='rounx-mobile-menu-list'>
                        {pages.map((page) => (
                            <React.Fragment key={page.name}>
                                <ListItemButton
                                    className={selectedPage === page.url ?
                                        'rounx-mobile-menu-item menu-item-selected'
                                        :
                                        'rounx-mobile-menu-item'
                                    }
                                    onClick={() => {
                                        setMenuOpen(!menuOpen)
                                        setSelectedPage(page.url)
                                    }}
                                >
                                    {page.name}
                                </ListItemButton>
                                <Divider style={{ margin: '0 24px' }} />
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
            }
        </>
    )
}
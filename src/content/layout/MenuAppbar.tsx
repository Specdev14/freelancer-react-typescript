import * as React from "react";
import { useTranslation } from 'react-i18next';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

export default function MenuAppbar() {
  const { t } = useTranslation();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img
            src="PNG_logo horizontal-05.png"
            alt="Rounx admin"
            width="130px"
            height="70px"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginLeft: "30px", marginTop: "2px" }}
          >
            {t('header-help')}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ marginLeft: "30px", marginTop: "2px" }}
          >
            {t('header-blog')}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ marginLeft: "30px", marginTop: "2px" }}
          >
            {t('header-contact-us')}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ marginLeft: "30px", marginTop: "2px" }}
          >
            {t('header-about-us')}
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle style={{ width: "30px", height: "30px" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuList
                  sx={{ width: "250px", maxWidth: "100%", padding: "0px" }}
                >
                  <ListItemText
                    sx={{
                      flexGrow: 1,
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    Perry Lance
                    <br />
                    usertcqq@gmail.com{" "}
                  </ListItemText>
                  <Divider />
                  <MenuItem style={{ padding: "15px" }} onClick={handleClose}>
                    Change language
                  </MenuItem>
                  <MenuItem style={{ padding: "15px" }} onClick={handleClose}>
                    Sign out
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

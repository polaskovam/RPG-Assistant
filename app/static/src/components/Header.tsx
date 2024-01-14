import React from "react";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

function Header() {
    const location = useLocation();
    const { pathname } = location;

    return (
        <AppBar sx={{ backgroundColor: "white", position: 'relative', py: '4px' }}>
            <Box ml={5} mr={3}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h4" sx={{
                        fontFamily: 'Forum,serif',
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: 'black',
                    }}>
                        Your RPG Assistant
                    </Typography>
                    <Box>
                        <NavItem link="/" name="Home" activePage={pathname}/>
                        <NavItem link="/diceroll" name="Dice Roll" activePage={pathname} disabled/>
                        <NavItem link="/generators" name="Generators" activePage={pathname} disabled/>
                    </Box>
                </Toolbar>
            </Box>
        </AppBar>
    );
}

export default Header;
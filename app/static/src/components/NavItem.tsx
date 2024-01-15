import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

interface NavItemProps {
    activePage: string;
    link: string;
    name: string;
    disabled?: boolean;
}

function NavItem({ activePage, link, name, disabled }: NavItemProps) {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(link);
    };

    return (
        <Button onClick={handleButtonClick}
                sx={{
                    color: activePage === link ? "white" : "#151269",
                    backgroundColor: activePage === link ? "#5b5996" : "white",
                    mr: 2,
                    "&:hover": {
                        backgroundColor: "#5b5996",
                        color: "white"
                    }
                }}
                disabled={disabled}
        >
            <Typography variant="subtitle1" display="block">
                {name}
            </Typography>
        </Button>
    );
}

export default NavItem;
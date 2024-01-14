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
                    color: activePage === link ? "white" : "#2B6048",
                    backgroundColor: activePage === link ? "#83C089" : "white",
                    mr: 2,
                    "&:hover": {
                        backgroundColor: "#83C089",
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
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
    const navigate = useNavigate();

    return (
        <Box width={1} height={1}>
            <Typography variant="h4" fontWeight={700} sx={{
                pt: "80px",
                pb: "48px",
            }}>
                Error 404 - Not Found
            </Typography>
            <Typography variant="h6" sx={{ pb: "48px" }}>
                The page you are looking for doesn't exist.
            </Typography>
            <Button onClick={() => navigate("/")} sx={{
                color: "#5b5996",
                border: 1,
                borderColor: "#5b5996",
                backgroundColor: "white",
                "&:hover": {
                    backgroundColor: "#5b5996",
                    color: "white"
                },
                p: 1,
            }}>
                <Typography variant="subtitle1" display="block">
                    Return
                </Typography>
            </Button>
        </Box>
    );
}

export default ErrorPage;
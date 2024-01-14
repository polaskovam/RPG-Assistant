import React from "react";
import { Box, Typography } from "@mui/material";

function HomePage() {
    return (
        <Box width={1} height={1}>
            <Typography variant="h4" fontWeight={700} sx={{
                pt: "80px",
                pb: "48px",
            }}>
                Welcome to Your RPG Assistant!
            </Typography>
            <Typography variant="h6">
                This page should suit all of your needs during an RPG game:
            </Typography>
            <Typography variant="h6" sx={{ pt: "6px" }}>
                dice rolling, name generators, and more...
            </Typography>
            <Typography variant="h6" sx={{ pt: "36px" }}>
                This web is work in progress, more features will arrive!
            </Typography>
        </Box>
    );
}

export default HomePage;
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Montserrat',
            'sans-serif',
        ].join(','),
    },
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <ThemeProvider theme={theme}>
        <App/>
    </ThemeProvider>
);
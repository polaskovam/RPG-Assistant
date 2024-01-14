import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.scss';
import Header from "./components/Header.tsx";
import HomePage from "./components/HomePage.tsx";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>

                <Route path="*" element={<HomePage/>}/>
            </Routes>
        </Router>
    )
}

export default App;
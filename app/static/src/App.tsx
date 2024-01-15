import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.scss';
import Header from "./components/Header.tsx";
import HomePage from "./components/HomePage.tsx";
import DiceRollPage from "./components/DiceRollPage.tsx";
import ErrorPage from "./components/ErrorPage.tsx";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/diceroll" element={<DiceRollPage />}/>

                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </Router>
    )
}

export default App;
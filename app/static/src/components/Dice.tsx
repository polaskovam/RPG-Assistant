import React from "react";
import { Tooltip, Typography } from '@mui/material';

interface DiceProps {
    type: number;
    value: number;
    colour: string;
    diceNumber: number;
    removeDice: (e: any) => void;
}

function Dice({ type, value, colour, diceNumber, removeDice }: DiceProps) {
    const sixSidedDices = [
        "fas fa-dice-one",
        "fas fa-dice-two",
        "fas fa-dice-three",
        "fas fa-dice-four",
        "fas fa-dice-five",
        "fas fa-dice-six",
    ];

    const title = (
        <Typography variant="body2">
            Click to remove
        </Typography>
    )

    return (Number(type) !== 6) ? (
        <Tooltip title={title} placement="top">
            <div
                id={String(diceNumber)}
                className={"dice d" + type}
                onClick={removeDice}
                style={{
                    backgroundImage: `url("/images/dices/d${type}-${colour}.png")`,
                    cursor: "pointer",
                    boxSizing: "border-box",
                }}
            >
                {value}
            </div>
        </Tooltip>
    ) : (
        <Tooltip title={title} placement="top">
            <div
                id={String(diceNumber)}
                className={`dice d6 ${colour} ${sixSidedDices[value - 1]}`}
                style={{
                    cursor: "pointer"
                }}
                onClick={removeDice}>
            </div>
        </Tooltip>
    )
}

export default Dice;

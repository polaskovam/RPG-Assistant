import React, { useState, useEffect } from "react";
import HelpIcon from '@mui/icons-material/Help';
import Dice from "./Dice.tsx"
import {
    Typography,
    Tooltip,
    Box,
    Container,
    Grid,
    Button,
    FormControl,
    Select,
    MenuItem,
    TextField, InputLabel, Checkbox, FormControlLabel, Paper,
} from "@mui/material";

interface SelectedT {
    type: number;
    colour: string;
}

interface DiceT {
    id: number;
    type: number;
    colour: string;
    value: number;
}

function DiceRollPage() {
    const [totalValue, setTotalValue] = useState<number | null>(null);
    const [writeDown, setWriteDown] = useState<string>('');
    const [wasRolled, setWasRolled] = useState<boolean>(false);
    const [checkStunt, setCheckStunt] = useState<boolean>(false);
    const [stuntValue, setStuntValue] = useState<number | null>(null);
    const [addValue, setAddValue] = useState<number>(0);
    const [subtractValue, setSubtractValue] = useState<number>(0);
    const [previousRolls, setPreviousRolls] = useState<Record<string, any>[]>([]);
    const [selected, setSelected] = useState<SelectedT>({ type: 4, colour: "black" });
    const [stateDice, setStateDice] = useState<DiceT[]>([
        {
            id: 1,
            type: 6,
            colour: "green",
            value: Math.floor(Math.random() * 6 + 1)
        }, {
            id: 2,
            type: 6,
            colour: "green",
            value: Math.floor(Math.random() * 6 + 1)
        }, {
            id: 3,
            type: 6,
            colour: "red",
            value: Math.floor(Math.random() * 6 + 1)
        },
    ]);

    useEffect(() => {
        setWasRolled(true);
    }, []);

    useEffect(() => {
        if (wasRolled) {
            handleTotalAndStunt();
            addToPreviousRolls();
        }
    }, [wasRolled]);

    function handleTotalAndStunt() {
        let total = 0;
        for (let dice of stateDice) {
            total += dice.value;
        }

        if (addValue !== 0 && subtractValue !== 0) {
            setWriteDown(` (${total} + ${addValue} - ${subtractValue})`);
        } else if (addValue !== 0 && subtractValue === 0) {
            setWriteDown(` (${total} + ${addValue})`);
        } else if (addValue === 0 && subtractValue !== 0) {
            setWriteDown(` (${total} - ${subtractValue})`);
        } else {
            setWriteDown('');
        }

        total += addValue - subtractValue;
        setTotalValue(total);

        if (checkStunt && stateDice.length === 3 && stateDice[0].type === 6 && stateDice[1].type === 6 && stateDice[2].type === 6) {
            if (stateDice[0].value === stateDice[1].value || stateDice[1].value === stateDice[2].value || stateDice[2].value === stateDice[0].value) {
                setStuntValue(stateDice[2].value);
            } else {
                setStuntValue(0);
            }
        }
        setWasRolled(false);
    }

    function addToPreviousRolls() {
        if (totalValue) {
            const previous = previousRolls.slice(0, 9);
            setPreviousRolls([{
                totalValue: totalValue,
                checkStunt: checkStunt,
                stuntValue: stuntValue,
                writeDown: writeDown
            }, ...previous]);
        }
    }

    function handleStuntCheckbox(e: any) {
        e.target.checked ? setCheckStunt(true) : setCheckStunt(false);
    }

    function handleSelect(e: any) {
        const { name, value } = e.target
        setSelected(prevValue => {
            return ({ ...prevValue, [name]: value });
        });
    }

    function rollDice() {
        setStateDice(prevValue => {
            for (let i = 0; i < stateDice.length; i++) {
                prevValue[i].value = Math.floor(Math.random() * prevValue[i].type + 1)
            }
            return prevValue;
        });
        setWasRolled(true);
    }

    function addDice(e: any) {
        setStateDice(prevValue => {
            return [
                ...prevValue,
                {
                    id: stateDice.length + 1,
                    type: selected.type,
                    colour: selected.colour,
                    value: Math.floor(Math.random() * selected.type + 1)
                }]
        });
        e.preventDefault();
    }

    function removeDice(e: any) {
        const idToRemove = Number(e.target.id);
        setStateDice(() => {
            return stateDice.filter((dice) => dice.id !== idToRemove)
        });
    }

    function handleChange(e: any) {
        const { name, value } = e.target
        let valueNum = Number(value);
        if (!isNaN(valueNum)) {
            if (name === 'add') {
                setAddValue(valueNum);
            } else if (name === 'subtract') {
                setSubtractValue(valueNum);
            }
        }
    }

    return (
        <Container sx={{ minWidth: "75%" }}>
            <Typography variant="h4" fontWeight={700} sx={{
                mt: "40px",
                pt: "20px",
                pb: "20px",
            }}>
                Dice Roll
            </Typography>
            <Grid container>

                {/*Item 1*/}
                <Grid item xs={12} md={4} sx={{ p: 3 }}
                      order={{ xs: 3, sm: 3, md: 1 }}>
                    <Paper elevation={6}
                           sx={{ minHeight: "100%", width: "100%", p: 2, boxSizing: "border-box" }}>
                        <Box height={1} width={1}>
                            <Typography variant="body1" sx={{ textAlign: "left", pb: 1, pl: 1 }}>
                                Last rolls:
                            </Typography>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                height: "100%",
                                overflowY: "auto"
                            }}>
                                {previousRolls.map((roll: Record<string, any>, index) => {
                                    return (
                                        <Typography key={index}>
                                            <Box sx={{ textAlign: "left" }}>
                                                <b>{index + 1}:</b> {roll.totalValue} {roll.writeDown} {roll.checkStunt && roll.stuntValue > 0 && `(stunt ${roll.stuntValue})`}
                                            </Box>
                                        </Typography>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Paper>
                </Grid>


                {/*Item2*/}
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{ p: 3 }}
                    order={{ xs: 1, sm: 1, md: 2 }}
                >
                    <Paper elevation={6}
                           sx={{ width: "100%", minHeight: "100%", p: 2, boxSizing: "border-box" }}>
                        <Grid container direction="column"
                              justifyContent="space-between"
                              alignItems="center" sx={{ minHeight: "353px", p: 2 }}
                        >
                            <Grid item>
                                {stateDice.map((data, index) => {
                                    return (
                                        <Dice
                                            key={index}
                                            id={data.id}
                                            type={data.type}
                                            colour={data.colour}
                                            value={data.value}
                                            removeDice={removeDice}
                                        />
                                    );
                                })}
                            </Grid>
                            <Grid item sx={{ pt: 3 }}>
                                <Typography fontSize={20}>
                                    Total: {totalValue}{writeDown}
                                </Typography>
                                <Typography
                                    fontSize={20}
                                    sx={{ visibility: (!checkStunt || stuntValue === 0 || stuntValue == null) ? 'hidden' : 'visible' }}
                                >
                                    Stunt: {stuntValue}
                                </Typography>
                                <Button onClick={rollDice} sx={{
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
                                        Roll Dice
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>


                {/*Item 3*/}
                <Grid item xs={12} md={4} sx={{ p: 3 }} order={{ xs: 2, sm: 2, md: 3 }}>
                    <Paper elevation={6}
                           sx={{ minHeight: "100%", width: "100%", p: 2, boxSizing: "border-box" }}>
                        <Box sx={{ py: 2 }}>
                            <form>
                                <Box>
                                    <Typography>
                                        Add a dice:
                                        <Tooltip
                                            title={(
                                                <Typography variant="body2">
                                                    Click on a dice if you want to remove it.
                                                </Typography>
                                            )}
                                            placement="left"
                                        >
                                            <HelpIcon sx={{ ml: 2 }}/>
                                        </Tooltip>
                                    </Typography>
                                </Box>
                                <Box width={1}>
                                    <FormControl sx={{ mt: 2 }}>
                                        <InputLabel id="type-label">Type:</InputLabel>
                                        <Select
                                            id="type"
                                            onChange={handleSelect}
                                            name="type"
                                            value={selected.type}
                                            sx={{ width: '100px' }}
                                            labelId="type-label"
                                            label="Type:"
                                        >
                                            <MenuItem value="4">D4</MenuItem>
                                            <MenuItem value="6">D6</MenuItem>
                                            <MenuItem value="8">D8</MenuItem>
                                            <MenuItem value="10">D10</MenuItem>
                                            <MenuItem value="12">D12</MenuItem>
                                            <MenuItem value="20">D20</MenuItem>
                                            <MenuItem value="48">D48</MenuItem>
                                            <MenuItem value="100">D100</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ mt: 2 }}>
                                        <InputLabel id="colour-label">Colour:</InputLabel>
                                        <Select
                                            onChange={handleSelect}
                                            name="colour"
                                            value={selected.colour}
                                            sx={{ width: '120px' }}
                                            labelId="colour-label"
                                            label="Colour:"
                                        >
                                            <MenuItem value="black">black</MenuItem>
                                            <MenuItem value="blue">blue</MenuItem>
                                            <MenuItem value="green">green</MenuItem>
                                            <MenuItem value="orange">orange</MenuItem>
                                            <MenuItem value="purple">purple</MenuItem>
                                            <MenuItem value="red">red</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button onClick={addDice} type="submit" sx={{
                                        color: "#5b5996",
                                        border: 1,
                                        borderColor: "#5b5996",
                                        backgroundColor: "white",
                                        "&:hover": {
                                            backgroundColor: "#5b5996",
                                            color: "white"
                                        },
                                        p: 1,
                                        ml: 1,
                                        mt: 2,
                                    }}>
                                        <Typography variant="subtitle1" display="block">
                                            Add Dice
                                        </Typography>
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                        <Box sx={{ pb: 2 }}>
                            <TextField name="add" value={addValue} onChange={handleChange}
                                       label="Add value to result:"/>
                            {/*<Tooltip*/}
                            {/*    title={(*/}
                            {/*        <Typography variant="body2">*/}
                            {/*            Add value to the total result.*/}
                            {/*        </Typography>*/}
                            {/*    )}*/}
                            {/*    placement="left"*/}
                            {/*>*/}
                            {/*    <HelpIcon />*/}
                            {/*</Tooltip>*/}
                        </Box>
                        <Box sx={{ pb: 2 }}>
                            <TextField
                                name="subtract"
                                value={subtractValue}
                                onChange={handleChange}
                                label="Subtract value from result:"
                            />
                            {/*<Tooltip*/}
                            {/*    title={(*/}
                            {/*        <Typography variant="body2">*/}
                            {/*            Subtract value from the total result.*/}
                            {/*        </Typography>*/}
                            {/*    )}*/}
                            {/*    placement="left"*/}
                            {/*>*/}
                            {/*    <HelpIcon />*/}
                            {/*</Tooltip>*/}
                        </Box>
                        <Box>
                            <FormControlLabel
                                label="Check for stunt"
                                control={(
                                    <Checkbox
                                        name="stunt"
                                        value={checkStunt}
                                        onClick={handleStuntCheckbox}
                                    />
                                )}
                            />
                            <Tooltip
                                title={(
                                    <Typography variant="body2">
                                        When rolling 3 D6: If 2 dice have the same value, the dice on the 3rd
                                        place is the stunt dice.
                                    </Typography>
                                )}
                                placement="left"
                            >
                                <HelpIcon/>
                            </Tooltip>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

        </Container>
    );
}

export default DiceRollPage;

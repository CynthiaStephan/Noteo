import { useState } from 'react';
import { NavBase } from '../../Nav/NavBase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';

import './AjoutQuestion.css';

export const AjoutQuestion = () => {

    /** gestions ajout questions */
    const [question, setQuestion] = useState([])
    const [title, setTitle] = useState([{ titre: '' }])

    const addQuestion = () => {
        setQuestion([...question, { id: Date.now(), text: '' }])
    }

    const removeQuestion = (id) => {
        setQuestion(question.filter((question) => question.id !== id))
    }

    const handleQuestionChange = (id, value) => {
        setQuestion(
            question.map((question) =>
                question.id === id ? { ...question, text: value } : question
            )
        )
    }

    const handleTitleChange = (value) => {
        setTitle([{ titre: value }])
    }

    const getQuestions = () => {
        const questionEmpty = question.some((question) => question.text.trim() == '');
        const titleEmpty = title.some((title) => title.titre == '')

        console.log(titleEmpty)
        if (questionEmpty || titleEmpty) {
            alert("Veuillez remplir tous les champs avant d'envoyer !");
            return;
        }
        if (question.length === 0) {
            alert("Veuillez ajouter au moins une question avant d'envoyer !");
            return;
        }

        let questionnaire = {
            titre: title[0].titre,
            question: question
        }

        console.log(questionnaire)
    }

    /** gestion de à qui l'envoyer */
    let listFormation = [
        'Front',
        'Back',
        'Cda',
        'ERA'
    ]

    let listEtudiant = [
        {
            "nom": "Dupont",
            "prenom": "Jean"
        },
        {
            "nom": "Martin",
            "prenom": "Sophie"
        },
        {
            "nom": "Lemoine",
            "prenom": "Paul"
        },
        {
            "nom": "Durand",
            "prenom": "Emma"
        },
        {
            "nom": "Bernard",
            "prenom": "Lucas"
        }
    ]

    const [selectedFormation, setSelectedFormation] = useState([]);

    const changeSelect = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedFormation(

            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const not = (a, b) => {
        return a.filter((value) => !b.includes(value));
    }

    const intersection = (a, b) => {
        return a.filter((value) => b.includes(value));
    }

    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState(listEtudiant.map((etudiant, index) => index));
    const [right, setRight] = useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredLeft = left.filter((index) => {
        const student = listEtudiant[index];
        return (
            student.nom.toLowerCase().includes(searchTerm) || student.prenom.toLowerCase().includes(searchTerm)
        );
    });

    const customList = (items) => (
        <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItemButton
                            key={value}
                            role="listitem"
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.includes(value)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${listEtudiant[value].prenom} ${listEtudiant[value].nom}`} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Paper>
    );

    return (
        <>
            <NavBase />
            <section className='sectionQuestionnaire'>
                <div className='divL'>

                    <div className='nomQuestion'>
                        <h2>Crée questionnaire</h2>
                        <TextField onChange={(e) => handleTitleChange(e.target.value)} id="outlined-basic" label="Nom questionnaire:" variant="outlined" required />
                    </div>
                    <ul className='questionList'>
                        {question.map((question) => (
                            <li key={question.id}>
                                <TextField onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                                    className='questionCree'
                                    id="outlined-basic"
                                    label="Question:"
                                    variant="outlined"
                                    required
                                />
                                <IconButton onClick={() => removeQuestion(question.id)} aria-label="RemoveCircleOutlineIcon" size="large">
                                    <RemoveCircleOutlineIcon fontSize="inherit" />
                                </IconButton>
                            </li>
                        ))}
                        <div className='addQuestion'>
                            <IconButton onClick={addQuestion} aria-label="AddCircleOutlineIcon" size="large">
                                <AddCircleOutlineIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                    </ul>

                    <div className='btnCree'>
                        <Button onClick={getQuestions} variant="contained" disableElevation>Crée</Button>
                        <button onClick={() => console.log(right.map(index => listEtudiant[index]))}>CLICK</button>
                    </div>
                </div>

                <div className='divR'>
                    <div className='selectFormation'>
                        <h3>Sélection formation</h3>
                        <FormControl className='listFormation'>
                            <InputLabel id="demo-multiple-checkbox-label">Formation</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={selectedFormation}
                                onChange={changeSelect}
                                input={<OutlinedInput label="Formation" />}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {listFormation.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={selectedFormation.includes(name)} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div className='selectEtudiant'>
                        <div className='etudiantSearchDiv'>
                            <h3>Sélection étudiant</h3>
                            <TextField className='etudiantSearch'
                                onChange={handleSearchChange}
                                label="Nom étudiant"
                                variant="outlined"
                                slotProps={
                                    {
                                        input:
                                            { type: 'search' }
                                    }}
                            />
                        </div>

                        <Grid container direction={useMediaQuery('(min-width:1050px)') ? "row" : "column"} className='etudiantTransfer'>
                            <Grid item>{customList(filteredLeft)}</Grid>
                            <Grid item>
                                <Grid container direction="column" sx={{ alignItems: 'center' }}>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleCheckedRight}
                                        disabled={leftChecked.length === 0}
                                        aria-label="move selected right"
                                    >
                                        &gt;
                                    </Button>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleCheckedLeft}
                                        disabled={rightChecked.length === 0}
                                        aria-label="move selected left"
                                    >
                                        &lt;
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item>{customList(right)}</Grid>
                        </Grid>
                    </div>
                </div>
            </section>
        </>
    )
}
/** import des different modules */
import { useEffect, useState } from 'react';
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
import Autocomplete from '@mui/material/Autocomplete';

/** import css */
import './AjoutQuestion.css';

/** export de la page */
export const AjoutQuestion = () => {
    /** gestions ajout questions */

    const [question, setQuestion] = useState([]) //recuperes et stock la liste des questions
    const [title, setTitle] = useState([{ titre: '' }]) //recuperes et stock le titre du questionnaire
    const [newQuestion, setNewQuestion] = useState('')

    /** rajoute un champ de text a remplir */
    const addQuestion = () => {
        setQuestion([...question, { id: Date.now(), text: '' }])
    }

    /** retire un champ de text a remplir */
    const removeQuestion = (id) => {
        setQuestion(question.filter((question) => question.id !== id))
    }

    /** recupers la valeur du champ de text des questions */
    const handleQuestionChange = (id, value) => {
        console.log(value)
        setQuestion(
            question.map((question) =>
                question.id === id ? { ...question, text: value } : question
            )
        )
    }

    /** recupers la valeur du champ de text du titre */
    const handleTitleChange = (value) => {
        setTitle([{ titre: value }])
    }

    const handleNewQuestionChange = (value) => {
        setNewQuestion(value)
    }

    const createNewQuestion = () => {
        console.log(newQuestion)
    }

    /** gestion du bouton d'envoie */
    const createQuestionnaire = () => {
        /** verifie que les champs de text son bien remplie et renvoie une erreur si il y en a un vide */
        const questionEmpty = question.some((question) => question.text.trim() == '');
        const titleEmpty = title.some((title) => title.titre == '')

        if (questionEmpty || titleEmpty) {
            alert("Veuillez remplir tous les champs avant d'envoyer !");
            return;
        }
        if (question.length === 0) {
            alert("Veuillez ajouter au moins une question avant d'envoyer !");
            return;
        }

        /** stock les valeurs du questionnaires */
        let questionnaire = {
            titre: title[0].titre,
            question: question
        }

        console.log(questionnaire)
        console.log(right.map(index => listEtudiant[index]))
    }

    /** gestion de à qui l'envoyer */
    let listFormation = [
        'Front',
        'Back',
        'Cda',
        'ERA'
    ]
    let listEtudiant = [
    { "nom": "Dupont", "prenom": "Jean", "formation": "Front" },
    { "nom": "Martin", "prenom": "Sophie", "formation": "Back" },
    { "nom": "Lemoine", "prenom": "Paul", "formation": "Cda" },
    { "nom": "Durand", "prenom": "Emma", "formation": "ERA" },
    { "nom": "Bernard", "prenom": "Lucas", "formation": "Front" },
    { "nom": "Petit", "prenom": "Camille", "formation": "Back" },
    { "nom": "Robert", "prenom": "Nicolas", "formation": "Cda" },
    { "nom": "Richard", "prenom": "Elodie", "formation": "ERA" },
    { "nom": "Simon", "prenom": "Julien", "formation": "Front" },
    { "nom": "Lefevre", "prenom": "Alice", "formation": "Back" },
    { "nom": "Morel", "prenom": "Thomas", "formation": "Cda" },
    { "nom": "Girard", "prenom": "Laura", "formation": "ERA" },
    { "nom": "Andre", "prenom": "Maxime", "formation": "Front" },
    { "nom": "Lambert", "prenom": "Chloe", "formation": "Back" },
    { "nom": "Bonnet", "prenom": "Antoine", "formation": "Cda" },
    { "nom": "Francois", "prenom": "Julie", "formation": "ERA" }
    ]

    const [selectedFormation, setSelectedFormation] = useState([]); //recuperes et stock la liste des formation selectionner
    const [checked, setChecked] = useState([]); //stock la valeur des élément cocher de la liste d'éléves
    const [left, setLeft] = useState(listEtudiant.map((etudiant, index) => index)); //stock la liste d'éleves a afficher dans la liste de gauche
    const [right, setRight] = useState([]); //stock la liste d'éleves a afficher dans la liste de droite

    /** filtre les étudiant avec le select formation */
    useEffect(() => {
        if (selectedFormation.length > 0) {
            let selectedEtudiants = listEtudiant
                .map((etudiant, index) => (selectedFormation.includes(etudiant.formation) ? index : null))
                .filter((index) => index !== null);
            setRight(selectedEtudiants);
            setLeft(listEtudiant.map((etudiant, index) => (selectedEtudiants.includes(index) ? null : index)).filter(index => index !== null));
        } else {
            setLeft(listEtudiant.map((etudiant, index) => index));
            setRight([]);
        }
    }, [selectedFormation]); 


    /** recuperes la valeur des formations sélectionner */
    const changeSelect = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedFormation(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    /** gere les checkbox en fonction du coter ou il sont */
    const not = (a, b) => {
        return a.filter((value) => !b.includes(value));
    }

    const intersection = (a, b) => {
        return a.filter((value) => b.includes(value));
    }
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    /** geres le bouton pour passer les élément a droite  */
    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    /** geres le bouton pour passer les élément a gauche  */
    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

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

    /** crée un élément dans la liste pour chaque étudiant */
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

    /** affichage des éléments dans le HTML */
    return (
        <>
            <NavBase />
            <section className='sectionQuestionnaire'>
                <div className='divL flexL'>
                    <div className='nomQuestion'>
                        <h2>Crée questionnaire</h2>
                        <TextField onChange={(e) => handleTitleChange(e.target.value)} id="outlined-basic" label="Nom questionnaire:" variant="outlined" required />
                    </div>
                    <ul className='questionList'>
                        {question.map((question) => (
                            <li key={question.id}>
                                <Autocomplete onChange={
                                    (e) => handleQuestionChange(question.id, e.target.textContent)}
                                    disablePortal
                                    options={['question1', 'plop']}
                                    sx={{ width: 10000 }}
                                    renderInput={(params) => <TextField {...params} label="question" />}
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

                    <div className='addNewQuestion'>
                        <TextField onChange={(e) => handleNewQuestionChange(e.target.value)} label="Nouvelle question:" variant="outlined" />
                        <Button onClick={createNewQuestion} variant="contained" disableElevation>Crée nouvelle question</Button>
                    </div>
                </div>

                <div className='divR flexR'>
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
                        <div className='btnCree'>
                            <Button onClick={createQuestionnaire} variant="contained" disableElevation>Crée questionnaire</Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
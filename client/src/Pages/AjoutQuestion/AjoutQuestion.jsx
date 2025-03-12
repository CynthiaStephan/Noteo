/** import des different modules */
import { useEffect, useRef, useState } from 'react';
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
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

/** import css */
import './AjoutQuestion.css';

/** export de la page */
export const AjoutQuestion = () => {
    /** gestions ajout questions */

    const [question, setQuestion] = useState([]) //stock les valeur pour l'ajout de question
    const [title, setTitle] = useState([{ titre: '' }]) //stock le titre du questionnaire
    const [listeQuestions, setListeQuestions] = useState([]) //stock la liste des questions
    const [listFormation, setListFormation] = useState([])  //stock la liste des formations
    const [newQuestion, setNewQuestion] = useState('') //stock la nouvelle question crée
    const [disabledBtn, setDisabledBtn] = useState(false)
    const newQuestionRef = useRef(null) //recuperes la ref de la nouvelle question crée pour pouvoir supprimer le champs de text

    /** geres les alert en cas de succes */
    const [addSuccess, setAddSuccess] = useState(false)
    const [addSuccessMessage, setAddSuccessMessage] = useState('')
    useEffect(() => {
        if (addSuccess) {
            setTimeout(() => {
                setAddSuccess(false);
            }, 3000);
        }
    }, [addSuccess]);

    /** geres les alert en cas d'erreur'*/
    const [addError, setAddError] = useState(false)
    const [addErrorMessage, setAddErrorMessage] = useState('')
    useEffect(() => {
        if (addError) {
            setTimeout(() => {
                setAddError(false);
            }, 3000);
        }
    }, [addError]);

    /** rajoute un champ de text a remplir */
    const addQuestion = () => {
        setQuestion([...question, { key: Date.now(), text: '', questionId: 0 }])
    }

    /** retire un champ de text a remplir */
    const removeQuestion = (key) => {
        setQuestion(question.filter((question) => question.key !== key))
    }

    /** recupers la valeur du champ de text des questions */
    const handleQuestionChange = (key, value) => {
        setQuestion(
            question.map((question) =>
                question.key === key ? { ...question, text: value.question, questionId: value.question_id } : question
            )
        )
    }

    /** recupers la valeur du champ de text du titre */
    const handleTitleChange = (value) => {
        setTitle([{ titre: value }])
    }

    /** recupers la valeur du champ de nouvelle question */
    const handleNewQuestionChange = (value) => {
        setNewQuestion(value)
    }

    /** recuperes dans la base de donnée et affiche la liste des questions dans les select */
    useEffect(() => {
        fetch(`http://localhost:5000/question/`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                setListeQuestions(data)
            })
            .catch(error => console.error(error))
    }, [newQuestion == ''])

    const createNewQuestion = (e) => {
        e.preventDefault()
        console.log({ question: newQuestion })

        fetch(`http://localhost:5000/question/new`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: newQuestion })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    setAddErrorMessage(data.error)
                    setAddError(true)
                } else {
                    newQuestionRef.current.value = ''
                    setNewQuestion('')
                    setAddSuccessMessage('Question ajouter.')
                    setAddSuccess(true)
                }
            })
            .catch(error => console.error(error))
    }

    /** gestion du bouton d'envoie */
    const createQuestionnaire = () => {
        /** verifie que les champs de text son bien remplie et renvoie une erreur si il y en a un vide */
        const questionEmpty = question.some((question) => question.text.trim() == '')
        const titleEmpty = title.some((title) => title.titre == '')

        if (questionEmpty || titleEmpty) {
            setAddErrorMessage("Veuillez remplir tous les champs avant d'envoyer !")
            setAddError(true)
            return;
        }
        if (question.length === 0) {
            setAddErrorMessage("Veuillez ajouter au moins une question avant d'envoyer !")
            setAddError(true)
            return;
        }
        if (right.length === 0) {
            setAddErrorMessage("Veuillez atruibuer le questionnaire à au moin un étudiant !")
            setAddError(true)
            return;
        }

        /** stock les valeurs du questionnaires */
        let newQuestionaireRequest = {
            title: title[0].titre,
            question_ids: question.map(q => q.questionId),
            user_ids: right.map(index => listEtudiant[index].user_id)
        }

        /** envoies les donnée du questionnaire pour le crée dans la base de donnée */
        console.log(newQuestionaireRequest)
        fetch(`http://localhost:5000/questionnaire/new/${localStorage.getItem('userId')}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newQuestionaireRequest)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    setAddErrorMessage(data.error)
                    setAddError(true)
                } else {
                    setDisabledBtn(!disabledBtn)
                    setAddSuccessMessage('Questionnaire crée.')
                    setAddSuccess(true)
                    setTimeout(() => {
                        window.location.reload()
                    }, 3000);
                }
            })
            .catch(error => console.error(error))

        setAddSuccessMessage('Questionnaire crée.')
        setAddSuccess(true)
    }

    /** gestion de à qui l'envoyer */

    const [listEtudiant, setListEtudiant] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/user`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setListEtudiant(data)
            })
            .catch(error => console.error(error))

        fetch(`http://localhost:5000/training`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setListFormation(data)
            })
            .catch(error => console.error(error))
    }, [])

    const [selectedFormation, setSelectedFormation] = useState([]) //recuperes et stock la liste des formation selectionner
    const [checked, setChecked] = useState([]) //stock la valeur des élément cocher de la liste d'éléves
    const [right, setRight] = useState([]) //stock la liste d'éleves a afficher dans la liste de droite
    /** stock la liste d'éleves a afficher dans la liste de gauche */
    const [left, setLeft] = useState([])
    useEffect(() => {
        setLeft(listEtudiant.map((etudiant, index) => etudiant.role === 'intern' ? index : null).filter(index => index !== null)) //filtre les étudiant de tout les utilisateur
    }, [listEtudiant])

    /** filtre les étudiant avec le select formation */
    useEffect(() => {
        if (selectedFormation.length > 0) {
            let selectedEtudiants = listEtudiant
                .map((etudiant, index) =>(etudiant.trainings.some(training => selectedFormation.includes(training.name)) ? index : null))
                .filter((index) => index !== null)
            setRight(selectedEtudiants)
            setLeft(listEtudiant.map((etudiant, index) => (selectedEtudiants.includes(index) || etudiant.role !== 'intern' ? null : index)).filter(index => index !== null))
        } else {
            setLeft(listEtudiant.map((etudiant, index) => etudiant.role === 'intern' ? index : null).filter(index => index !== null))
            setRight([])
        }
    }, [selectedFormation])


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
        return a.filter((value) => !b.includes(value))
    }

    const intersection = (a, b) => {
        return a.filter((value) => b.includes(value))
    }
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right)

    /** geres le bouton pour passer les élément a droite  */
    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked))
        setLeft(not(left, leftChecked))
        setChecked(not(checked, leftChecked))
    };

    /** geres le bouton pour passer les élément a gauche  */
    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked))
        setRight(not(right, rightChecked))
        setChecked(not(checked, rightChecked))
    }
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }


    const [searchTerm, setSearchTerm] = useState('')

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase())
    }

    const filteredLeft = left.filter((index) => {
        const student = listEtudiant[index];
        return (
            student.last_name.toLowerCase().includes(searchTerm) || student.first_name.toLowerCase().includes(searchTerm)
        )
    })

    /** crée un élément dans la liste pour chaque étudiant */
    const customList = (items) => (
        <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`

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
                            <ListItemText id={labelId} primary={`${listEtudiant[value].first_name} ${listEtudiant[value].last_name}`} />
                        </ListItemButton>
                    )
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
                            <li key={question.key}>
                                <Autocomplete onChange={
                                    (e) => {
                                        handleQuestionChange(question.key, listeQuestions.find(item =>
                                            item.question === e.target.textContent))
                                    }}
                                    disablePortal
                                    options={listeQuestions.map(q => q.question)}
                                    sx={{ width: 10000 }}
                                    renderInput={(params) => <TextField {...params} label="question" />}
                                />
                                <IconButton onClick={() => removeQuestion(question.key)} aria-label="RemoveCircleOutlineIcon" size="large">
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

                    <form onSubmit={(e) => createNewQuestion(e)} className='addNewQuestion'>
                        <TextField id='newQuestion' inputRef={newQuestionRef} onChange={(e) => handleNewQuestionChange(e.target.value)} label="Nouvelle question:" variant="outlined" />
                        <Button id='btnCreeQuestion' type="submit" variant="contained" disableElevation>Crée nouvelle question</Button>
                    </form>
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
                                {listFormation.map((f) => (
                                    <MenuItem key={f.training_id} value={f.name}>
                                        <Checkbox checked={selectedFormation.includes(f.name)} />
                                        <ListItemText primary={f.name} />
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
                            <Button disabled={disabledBtn} onClick={createQuestionnaire} variant="contained" disableElevation>Crée questionnaire</Button>
                        </div>
                        <div className='alertPopUp'>
                            <Collapse in={addError} >
                                <Alert severity="error">{addErrorMessage}</Alert>
                            </Collapse>
                            <Collapse in={addSuccess} >
                                <Alert severity="success">{addSuccessMessage}</Alert>
                            </Collapse>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
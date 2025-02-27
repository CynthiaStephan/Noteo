import { NavBase } from '../../Nav/NavBase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import './AjoutQuestion.css';
import { useState } from 'react';

export const AjoutQuestion = () => {

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
        question.map((question) => console.log(question.text))
    }

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
                                <TextField onChange={(e) => handleQuestionChange(question.id, e.target.value)} className='questionCree' id="outlined-basic" label="Question:" variant="outlined" required />
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
                    </div>


                </div>
                <div className='divR'>
                    <div className='selectFormation'>

                    </div>

                    <div className='selectEtudiant'>

                    </div>
                </div>
            </section>
        </>
    )
}
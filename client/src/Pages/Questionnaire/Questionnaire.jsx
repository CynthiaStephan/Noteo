import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
);

import { Radar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { NavBase } from '../../Nav/NavBase'
import './Questionnaire.css'

export const Questionnaire = () => {
    const [chartData, setChartData] = useState(null)

    const [listQuestionnaire, setListQuestionnaire] = useState([])
    const [selectedQuestions, setSelectedQuestions] = useState([])
    const [questionaireTitle, setQuestionaireTitle] = useState('')

    useEffect(() => {
        fetch(`http://localhost:5000/questionnaire`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                setListQuestionnaire(data.map((q) => ({ title: q.title, id: q.questionnaire_id, creatorId: q.user_id })))
            })
            .catch(error => console.error(error))
    }, [])

    const handleClickQuestionnaire = (clickedQuestionnaires) => {
        fetch(`http://localhost:5000/questionnaire/${clickedQuestionnaires.id}`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                setSelectedQuestions(data.questions)
                setQuestionaireTitle(data.title)
            })
            .catch(error => console.error(error))


        fetch(`http://localhost:5000/results/questionnaire/${clickedQuestionnaires.id}/${localStorage.getItem('userId')}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => console.error(error))

    }

    useEffect(() => {
        setChartData({
            labels: selectedQuestions.map((q, i) => `Q: ${i + 1}`),
            datasets: [
                {
                    label: 'eval formateur',
                    data: [],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'auto eval',
                    data: [],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1,
                },
            ],
        })
    }, [selectedQuestions])

    const [questionNote, setQuestionNote] = useState([])
    const noteValue = (e, questionName) => {
        if (e.target.value > 16) {
            e.target.value = 16
        }
        if (e.target.value < 0) {
            e.target.value = 1
        }
        setQuestionNote(value => ({ ...value, [questionName]: e.target.value }))
    }

    const sendResult = (e) => {
        e.preventDefault()
        console.log(questionNote)
    }

    return (
        chartData &&
        <>
            <NavBase />
            <section className='sectionQuestionnaire' id='flexLQ'>
                <form onSubmit={(e) => sendResult(e)} className='divL' >
                    <h2>{questionaireTitle}</h2>
                    <ul className='questionQuestionnaireList'>
                        {selectedQuestions.map((q, i) =>
                            <li key={q.question_id}>
                                <label htmlFor={q.question_id}><strong>{i + 1}</strong>{`: ${q.question}`}</label>
                                <TextField
                                    id={q.question_id}
                                    className='noteField'
                                    onChange={e => noteValue(e, q.question)}
                                    label="note"
                                    type="number"
                                    inputProps={{
                                        min: 1,
                                        max: 16
                                    }}
                                    required
                                />
                            </li>
                        )}
                    </ul>
                    <div className='btnEnvoyer'>
                        <Button type='submit' variant="contained" disableElevation>Envoyer</Button>
                    </div>

                </form>
                <div className='divR' id='flexRQ'>
                    <div className='graphique'>
                        <Radar
                            data={chartData}
                            options={
                                {
                                    scales: {
                                        r: {
                                            max: 16,
                                            beginAtZero: true,
                                        }
                                    }
                                }}
                        />
                    </div>

                    <div className='listQuestionnaire'>
                        <ul className='questionnaireListe'>
                            {listQuestionnaire.map((questionnaire) => (
                                <Button key={questionnaire.id} onClick={() => handleClickQuestionnaire(questionnaire)}>{questionnaire.title}</Button>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}
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
    Legend
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

    useEffect(() => {
        fetch(`http://localhost:5000/questionnaire`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                setListQuestionnaire(data.map((questionnaire) => ({ title: questionnaire.title, id: questionnaire.questionnaire_id })))
            })
            .catch(error => console.error(error))
    }, [])

    const questions = [
        { question_id: 1, question: 'question 1' },
        { question_id: 2, question: 'question 2' },
        { question_id: 3, question: 'question 3' },
        { question_id: 4, question: 'question 4' },
        { question_id: 5, question: 'question 5' },
        { question_id: 6, question: 'question 6' },
        { question_id: 7, question: 'question 7' },
        { question_id: 8, question: 'question 8' },
        { question_id: 9, question: 'question 9' }
    ]

    useEffect(() => {
        setChartData({
            labels: [
                'question 1',
                'question 2',
                'question 3',
                'question 4',
                'question 5',
                'question 6'
            ],
            datasets: [
                {
                    label: 'eval formateur',
                    data: [5, 9, 2, 12, 14, 7],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'auto eval',
                    data: [7, 10, 8, 10, 13, 10],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1,
                },
            ],
        });
    }, [])

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
                    <h2>Questionnaire 1</h2>
                    <ul className='questionQuestionnaireList'>
                        {questions.map((q) =>
                            <li key={q.question_id}>
                                <label htmlFor={q.question_id}>{q.question}</label>
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
                                <Button key={questionnaire.id} onClick={() => console.log(questionnaire)}>{questionnaire.title}</Button>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}
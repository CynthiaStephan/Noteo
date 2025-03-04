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

    const question = [
        'question 1',
        'question 2',
        'question 3',
        'question 4',
        'question 5',
        'question 6',
        'question 7',
        'question 8',
        'question 9',
        'question 10'
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


    return (
        chartData &&
        <>
            <NavBase />
            <section className='sectionQuestionnaire' id='flexLQ'>
                <div className='divL' >
                    <h2>Questionnaire 1</h2>
                    <ul className='questionList'>
                        {question.map(q =>
                            <li key={q}>
                                <p>{q}</p>
                                <TextField
                                    id="outlined-number"
                                    label="note"
                                    type="number"
                                    defaultValue="1"
                                    inputProps={{
                                        min: 1,
                                        max: 16
                                    }}
                                />
                            </li>
                        )}
                    </ul>
                    <div className='btnEnvoyer'>
                        <Button onClick={() => console.log('click')} variant="contained" disableElevation>Envoyer</Button>
                    </div>

                </div>
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
                            <Button onClick={() => console.log('click')}>questionnaire 1</Button>
                            <Button onClick={() => console.log('click')}>questionnaire 2</Button>
                            <Button onClick={() => console.log('click')}>questionnaire 3</Button>
                            <Button onClick={() => console.log('click')}>questionnaire 4</Button>
                            <Button onClick={() => console.log('click')}>questionnaire 5</Button>
                            <Button onClick={() => console.log('click')}>questionnaire 6</Button>
                            <Button onClick={() => console.log('click')}>questionnaire 7</Button>
                            <Button onClick={() => console.log('click')}>questionnaire 8</Button>
                            <Button onClick={() => console.log('click')}>questionnaire 9</Button>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}
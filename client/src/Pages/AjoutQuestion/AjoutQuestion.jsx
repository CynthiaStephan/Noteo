import { NavBase } from '../../Nav/NavBase'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import './AjoutQuestion.css'

export const AjoutQuestion = () => {
    return (
        <>
            <NavBase />
            <section className='sectionQuestionnaire'>
                <div className='divL'>
                    <div className='nomQuestion'>
                        <h2>Crée questionnaire</h2>
                        <TextField id="outlined-basic" label="Nom questionnaire:" variant="outlined" />
                    </div>
                    <ul className='questionList'>
                        <li>
                            <TextField id="outlined-basic" label="Question:" variant="outlined" />
                            <IconButton onClick={() => console.log('click')} aria-label="RemoveCircleOutlineIcon" size="large">
                                <RemoveCircleOutlineIcon fontSize="inherit" />
                            </IconButton>
                        </li>
                        <div className='addQuestion'>
                            <IconButton  onClick={() => console.log('click')} aria-label="AddCircleOutlineIcon" size="large">
                                <AddCircleOutlineIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                    </ul>

                    <div className='btnCree'>
                        <Button onClick={() => console.log('click')} variant="contained" disableElevation>Crée</Button>
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
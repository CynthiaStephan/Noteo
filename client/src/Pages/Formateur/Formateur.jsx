import { NavBase } from '../../Nav/NavBase'
import './Formateur.css'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export const Formateur = () => {
    return (
        <>
            <NavBase />
            <div className='formateur'>
                <div className='filtreListe'>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Front" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Back" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="CDA" />
                </div>
                <button><p>Rajouter questionnaire</p></button>
                </div>
                <div className='tabeauEleve'>
                    <div className='categorie'>
                        <div className='liste'><p>Formation</p><p>Nom</p><p>Prenom</p><p className='mobileDisparition'>Email</p></div>
                    </div>
                    <div className='listeEleve'>
                        <div className='liste'><p>Front</p><p>Nom éleve 1</p><p>Prenom éleve 1</p><p className='mobileDisparition'>vtwnj9q5g@outlook.com</p></div>
                        <div className='liste'><p>Front</p><p>Nom éleve 2</p><p>Prenom éleve 2</p><p className='mobileDisparition'>vtwnj9q5g@outlook.com</p></div>
                    </div>
                </div>
        </>
    )
}
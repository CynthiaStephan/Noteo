import { useEffect, useState } from 'react';
import { NavBase } from '../../Nav/NavBase';
import { useNavigate } from "react-router";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

import './Formateur.css'
export const Formateur = () => {
    const navigate = useNavigate()
    const [listEtudiant, setListEtudiant] = useState([])
    const [listFormation, setListFormation] = useState([])
    const [selectedFormations, setSelectedFormations] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/user`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setListEtudiant(data.filter(etudiant => etudiant.role === 'intern'))
                console.log(data)
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

    const handleCheck = (formation) => {
        setSelectedFormations((prev) =>
            prev.includes(formation) ? prev.filter(f => f !== formation) : [...prev, formation]
        )
    }

    const filteredStudents = listEtudiant.filter(etudiant =>
        selectedFormations.length === 0 || selectedFormations.includes(etudiant.trainings[0].name)
    )



    return (
        <>
            <NavBase />
            <div className='formateur'>
                <div className='filtreListe'>
                    {listFormation.map((f) => (
                        <FormControlLabel checked={selectedFormations.includes(f.name)} onChange={() => handleCheck(f.name)} control={<Checkbox />} label={f.name} key={f.training_id} />
                    ))}
                </div>
                <Button onClick={() => navigate('/ajout_questionnaire')} variant="contained" >Rajouter questionnaire</Button>
            </div>

            <div className='titleListe'>
                <p>Formation</p>
                <p>Nom</p>
                <p>Prenom</p>
                <p className='mobileDisparition'>Email</p>
            </div>

            <div className='tableauEleve'>
                <div className='listeEleve'>
                    {filteredStudents.map((etudiant) => (
                        <div key={etudiant.user_id} className='liste' onClick={() => navigate(`/questionnaire?studiant_id=${etudiant.user_id}`)}>
                            <p>{etudiant.trainings.length === 0 ? '' : etudiant.trainings[0].name}</p>
                            <p>{etudiant.last_name}</p>
                            <p>{etudiant.first_name}</p>
                            <p className='mobileDisparition'>{etudiant.email}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
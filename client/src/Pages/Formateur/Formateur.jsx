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
    const [selectedFormations, setSelectedFormations] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/user`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setListEtudiant(data.filter(etudiant => etudiant.role === 'intern'))
            })
            .catch(error => console.error(error))
    }, [])

    let listFormation = [
        { formation: 'Front', id_formation: 1 },
        { formation: 'Back', id_formation: 2 },
        { formation: 'Cda', id_formation: 3 },
        { formation: 'ERA', id_formation: 4 }
    ]

    const handleCheck = (formation) => {
        setSelectedFormations((prev) =>
            prev.includes(formation) ? prev.filter(f => f !== formation) : [...prev, formation]
        )
    }

    const getFormationForStudent = (etudiant) => {
        return etudiant.user_id % 2 === 1 ? 'Front' : 'Back'
    }

    const filteredStudents = listEtudiant.filter(etudiant =>
        selectedFormations.length === 0 || selectedFormations.includes(getFormationForStudent(etudiant))
    )



    return (
        <>
            <NavBase />
            <div className='formateur'>
                <div className='filtreListe'>
                    {listFormation.map((formation) => (
                        <FormControlLabel checked={selectedFormations.includes(formation.formation)} onChange={() => handleCheck(formation.formation)} control={<Checkbox />} label={formation.formation} key={formation.id_formation} />
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
                        <div key={etudiant.user_id} className='liste' onClick={() => console.log(`etudiant id:${etudiant.user_id}`)}>
                            <p>{getFormationForStudent(etudiant)}</p>
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
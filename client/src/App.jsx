import { BrowserRouter, Route, Routes } from 'react-router'
import { Connexion } from './Pages/Connexion/Connexion'
import { CreeCompte } from './Pages/CreeCompte/CreeCompte'
import { Questionnaire } from './Pages/Questionnaire/Questionnaire'
import { Formateur } from './Pages/Formateur/Formateur'
import { AjoutQuestion } from './Pages/AjoutQuestion/AjoutQuestion'
import { NotFound } from './Pages/NotFound/NotFound'
import { Profil } from './Pages/Profil/Profil'

import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Connexion />} />
        <Route path='/cree_compte' element={<CreeCompte />} />
        <Route path='/questionnaire' element={<Questionnaire />} />
        <Route path='/formateur' element={<Formateur />} />
        <Route path='/ajout_questionnaire' element={<AjoutQuestion />} />
        <Route path='/profil' element={<Profil />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

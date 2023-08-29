import { Routes, Route, Router } from 'react-router-dom';
import FormCadEntregadores from './FormCadEntregadores';
import TabelaEntregadores from './TabelaEntregadores';

export default function Rotas() {
    return (
            <Routes>
                <Route path='/home' element={<h1>Home</h1>}/>
                <Route path='/cadastrarEntregadores' element={<FormCadEntregadores/>}/>
                <Route path='/visualizarEntregadores' element={<TabelaEntregadores/>}/>
            </Routes>
    )
}
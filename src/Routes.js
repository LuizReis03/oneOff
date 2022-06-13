import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/Index";
import Cadastro from "./pages/Cadastro";
import InserePonto from "./pages/InserePonto";
import RelatorioPonto from "./pages/RelatorioPonto";


export default () =>
{
    return(
        <Routes>
            
            <Route exact path="/" element={ <Login /> }/>

            <Route exact path="/cadastro" element={ <Cadastro /> } />

            <Route exact path="/inserePonto" element={ <InserePonto /> } />

            <Route exact path="/relatorioPonto" element={ <RelatorioPonto /> } />

        </Routes>
    );
}
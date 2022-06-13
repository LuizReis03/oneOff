//Libs
import React, { Component, useState, useEffect } from "react";

//Components
import Header from "../components/Header";

//Static
import "../static/css/index.css";

//Services
import api from "../services/Api";

function RelatorioPonto() {

    const [ponto, setPonto] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    const [busca, setBusca] = useState('');
    console.log(busca);

    useEffect(() => {
        api.get('api/v1/ponto/user' , busca , {
        headers: {
            Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            setPonto(response.data.content)
        })
    }, []);

    return (
        <div>
            <Header />

            <main>

                <div class="div-controla">

                    <h2 class="titulo-controla">Relatório ponto</h2>
                    <div class="div-pesquisa">
                        <h3 class="titulo-busca">Filtrar:</h3>
                        <input class="busca-relatorio" value={busca} onChange={(ev) => setBusca(ev.target.value)}
                        type="date"/>
                    </div>

                    <table class="box-relatorio">
                        <thead>
                            <tr scope="row">
                                <th>Dia</th>
                                <th>Entrada</th>
                                <th>Saída</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                        {ponto.map(pontos =>
                            <tr>
                                <td>{pontos.dia}</td>
                                <td>{pontos.horaEntrada}</td>
                                <td>{pontos.horaSaida}</td>
                                <td class="descricao">{pontos.descricao}</td>
                            </tr>
                        )};
                        </tbody>
                    </table>
                </div>

            </main>

        </div>

    );
}

export default RelatorioPonto;
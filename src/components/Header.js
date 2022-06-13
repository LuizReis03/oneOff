import React from "react";
import { Link } from "react-router-dom";

//import imgs
import logo from "../static/img/logo.png";
import lapis from "../static/img/lapis.png";
import icone from "../static/img/relatorio.png";
import sair from "../static/img/sair.png";

//CSS
import "../static/css/index.css";

function Header() {
    return (
        <div>
            <header>

                <img class="logo" src={logo} />
                <div class="div-link-header">
                        <Link class="link-header" to="/inserePonto">
                            <img class="icone" src={lapis} />Registre seu ponto
                        </Link>
                    <br />
                    <Link class="link-header" to="/relatorioPonto">
                        <img class="icone" src={icone} />Relatório ponto
                    </Link>
                </div>

                <Link class="sair-header" to="/">
                    <img class="icone-sair" src={sair} />Sair
                </Link>

            </header>
        </div>
    );
}

export default Header;
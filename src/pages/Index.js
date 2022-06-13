//Libs
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from "react-router-dom";

//Components
import { mask } from '../components/MaskCpf';

//Static
import "../static/css/style.css";
import arteLogin from "../static/img/arteLogin.jpg"

//Services
import api from '../services/Api';

//Validacao
const validacaoLogin = yup.object().shape({
    cpf: yup.string().required("O CPF é obritório!").min(14, "Verifique o CPF!"),
    senha: yup.string().required("A senha é obritória!"),
});

function Login() {

    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');

    const history = useNavigate();

    async function login(e){
        e.preventDefault();

        const data = {
            cpf,
            password,
        };

        try {
            const response = await api.post('/', data);

            localStorage.setItem('accessToken', response.data);

            history.push('/inserePonto')
        } catch (err) {
            alert('Insira os dados corretamente e tente novamente!!!');
        }
    };

        //Validacao
        const { register, handleSubmit, formState: { errors } } = useForm({
            resolver: yupResolver(validacaoLogin)
        });
    
        const addLogin = data => console.log(data);

        return (

            <div class="box-fundo">
                <img class="arteLogin" src={arteLogin} alt="OneOff" />

                <form className="formulario-login" onSubmit={handleSubmit(addLogin, login)} action="">

                    <h3 class="titulo-campo-login">CPF</h3>
                    <input class="campo-login" placeholder="000.000.000-00" name="cpf" {...register("cpf")}
                    maxlength="14" value={cpf} onChange={e => setCpf(e.target.value)}/>
                    <p className="erro-mensagem">{errors.cpf?.message}</p>

                    <h3 class="titulo-campo-login">SENHA</h3>
                    <input class="campo-login" type="password" name="senha" {...register("senha")}
                    value={password} onChange={e => setPassword(e.target.value)} /><br />
                    <p className="erro-mensagem">{errors.senha?.message}</p>

                    <input class="btn-login" type="submit" value="ENTRAR" />

                </form>
                
                <div class="div-link-login">
                    <p class="p-link-login"> É novo no OneOff? <Link class="link-login" to="./cadastro">Crie sua conta</Link></p>
                </div>
            </div>

        );
}

export default Login;
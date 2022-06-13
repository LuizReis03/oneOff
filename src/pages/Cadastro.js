//Libs
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate} from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//Services
import api from '../services/Api';

//Static
import "../static/css/style.css";

//Validacao
const validacaoCadastro = yup.object().shape({
    nome: yup.string().required("O nome é obritório!").max(55, "O nome deve conter no máximo 55 caracteres"),
    email: yup.string().required("O e-mail é obritório!"),
    cpf: yup.string().required("O CPF é obritório!").min(14, "Verifique o CPF!"),
    senha: yup.string().required("A senha é obritória!").min(5, "A senha deve conter no mínimo 5 caracteres"),
});

function Cadastro() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');

    const history = useNavigate();

    async function cadastro(e){
        e.preventDefault();

        const data = {
            nome,
            email,
            cpf,
            password
        };

        try {
            const response = await api.post('/api/v1/users', data);

            localStorage.setItem('accessToken', response.data);

            history.push('/login')
        } catch (err) {
            alert('Insira os dados corretamente e tente novamente!!!');
        }
    };

    //Validacao
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validacaoCadastro)
    });

    const addCadastro = data => console.log(data);

    return (

        <div class="box-fundo">
            <h2 class="titulo-cad">CADASTRO</h2>

            <form class="formulario-cad" onSubmit={handleSubmit(addCadastro, cadastro)} action="/">

                <h3 class="titulo-campo-login">Nome completo</h3>
                <input class="campo-cad" placeholder="Ex: José Silva" name="nome" type="campo" {...register("nome")}
                value={nome} onChange={e => setNome(e.target.value)}/><br />
                <p className="erro-mensagem">{errors.nome?.message}</p>

                <h3 class="titulo-campo-login">E-mail</h3>
                <input class="campo-cad" placeholder="Ex: email@email.com" name="email" type="campo" {...register("email")}
                value={email} onChange={e => setEmail(e.target.value)} /><br />
                <p className="erro-mensagem">{errors.email?.message}</p>

                <div class="controla-cad">

                    <div class="controla-campo-cpf">
                        <h3 class="titulo-campo-cad-menor" >CPF</h3>
                        <input class="campo-cad-menor" placeholder="000.000.000-00" name="cpf" {...register("cpf")}
                        value={cpf} onChange={e => setCpf(e.target.value)} maxlength="14"/>

                        <p className="erro-mensagem-menor">{errors.cpf?.message}</p>
                    </div>

                    <div class="controla-campo-senha">
                        <h3 class="titulo-campo-cad-menor">Senha</h3>
                        <input class="campo-cad-menor" name="senha" type="password" {...register("senha")}
                        value={password} onChange={e => setPassword(e.target.value)} />
                        <p className="erro-mensagem-menor">{errors.senha?.message}</p>
                    </div>
                </div>

                <input class="btn-cad" type="submit" value="ENTRAR" />

            </form>
        </div>

    );
}

export default Cadastro;
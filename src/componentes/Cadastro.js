import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class CadastroFormulario extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            dataNasc: '',
            cpf: '',
            endereco: '',
            estado: '',
            cidade: '',
            cep: '',
            email: '',
            telefone: '',
            senha: '',
            tipoCadastro: 'cliente',
            restricoes: []
        };

        this.baseState = this.state;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.enviaForm = this.enviaForm.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    componentDidMount() {
        var that = this;

        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 100, // Creates a dropdown of 15 years to control year,
            max: new Date(),
            format: 'yyyy-mm-dd',
            today: 'Hoje',
            clear: 'Limpar',
            close: 'Ok',
            closeOnSelect: true, // Close upon selecting a date,
            onClose: function () {
                that.setState({dataNasc: this.get('value')});
            }
        });

        $('#tipoCadastro').on('change', function (event) {
            this.setState({tipoCadastro: event.target.value});
        }.bind(this));

        $('#restricoes').on('change', function (event) {
            this.setState({restricoes: [...event.target.options].filter(o => o.selected).map(o => o.value)});
        }.bind(this));

        $('#tipoCadastro').material_select();
    }

    handleInputChange(event) {
        const target = event.target;
        let value = target.value;

        if (target.type === 'checkbox') {
            value = target.checked;
        }

        if (target.type === 'select-multiple') {
            value = [...target.options].filter(o => o.selected).map(o => o.value);
        }

        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    resetForm() {
        this.setState(this.baseState);
    }

    enviaForm(event) {
        event.preventDefault();

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `${localStorage.getItem('auth-token')}`,
            })
        };

        fetch(`http://localhost:8080/users`, requestInfo)
            .then(response => {
                if (response.ok) {
                    this.resetForm();
                    return response.json();
                } else {
                    throw new Error("Token expirou");
                }
            })
            .catch(error => {
                browserHistory.push("/");
            });
    }

    render() {
        $(document).ready(function () {
            $('select').material_select();
        });
        return (
            <form className="col s6 offset-s3" onSubmit={this.enviaForm} method="POST">
                <div className="row">
                    <div className="input-field col s6">
                        <input id="nome" name="nome" type="text"
                               value={this.state.nome}
                               onChange={this.handleInputChange} required/>
                        <label htmlFor="nome">Nome Completo</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="dataNasc" name="dataNasc" type="text"
                               className="datepicker"
                               value={this.state.dataNasc}
                               onChange={this.handleInputChange} required/>
                        <label htmlFor="dataNasc">Data Nascimento</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="cpf" name="cpf" type="text"
                               value={this.state.cpf}
                               onChange={this.handleInputChange} required/>
                        <label htmlFor="cpf">CPF</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="endereco" name="endereco" type="text"
                               value={this.state.endereco}
                               onChange={this.handleInputChange} required/>
                        <label htmlFor="endereco">Endereço</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s4">
                        <input id="estado" name="estado" type="text"
                               value={this.state.estado}
                               onChange={this.handleInputChange} required/>
                        <label htmlFor="estado">Estado</label>
                    </div>
                    <div className="input-field col s4">
                        <input id="cidade" name="cidade" type="text"
                               value={this.state.cidade}
                               onChange={this.handleInputChange} required/>
                        <label htmlFor="cidade">Cidade</label>
                    </div>
                    <div className="input-field col s4">
                        <input id="cep" name="cep" type="text"
                               value={this.state.cep}
                               onChange={this.handleInputChange} required/>
                        <label htmlFor="cep">Cep</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="email" name="email" type="email"
                               value={this.state.email}
                               onChange={this.handleInputChange} required/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="telefone" name="telefone" type="text"
                               value={this.state.telefone}
                               onChange={this.handleInputChange} required/>
                        <label htmlFor="telefone">Telefone</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s4">
                        <input id="senha" name="senha" type="password"
                               value={this.state.senha}
                               onChange={this.handleInputChange} required/>
                        <label htmlFor="senha">Senha</label>
                    </div>
                    <div className="input-field col s4">
                        <select id="tipoCadastro" name="tipoCadastro" value={this.state.tipoCadastro}
                                onChange={this.handleInputChange}>
                            <option value="cliente">Cliente</option>
                            <option value="funcionario">Funcionário</option>
                        </select>
                        <label htmlFor="tipoCadastro">Tipo de cadastro</label>
                    </div>
                    <div className="input-field col s4">
                        <select id="restricoes" name="restricoes" value={this.state.restricoes}
                                onChange={this.handleInputChange} multiple>
                            {
                                this.props.restricoes.map(function (restricao) {
                                    return (
                                        <option key={restricao._links.self.href}
                                                value={restricao._links.self.href}>{restricao.descricao}</option>
                                    )
                                })
                            }
                        </select>
                        <label htmlFor="restricoes">Restrições</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12">
                        <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}


export default class CadastroBox extends Component {

    constructor() {
        super();
        this.state = {restricoes: []};
    }

    componentDidMount() {
        const requestInfo = {
            method: 'GET',
            headers: new Headers({
                'Authorization': `${localStorage.getItem('auth-token')}`,
                'Content-type': 'application/json'
            })
        };

        fetch(`http://localhost:8080/restricoes`, requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Token expirou");
                }
            })
            .then(data => {
                let restricoes = data._embedded.restricoes;
                this.setState({restricoes: restricoes});
                $('#restricoes').material_select();
            })
            .catch(error => {
                browserHistory.push("/");
            });
    }

    render() {
        return (
            <CadastroFormulario restricoes={this.state.restricoes}/>
        )
    }

}
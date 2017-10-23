import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import {browserHistory} from 'react-router';
import $ from 'jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import Inputmask from "inputmask";

class FormularioFuncionario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: '',
            funcao: '',
            cargaHorarioMensal: '1',
            grauInstrucao: '',
            valorHora: '1',
            salario: '1',
            observacao: '',
            msgSucesso: '',
            msgErro: ''
        };

        this.baseState = this.state;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeSalario = this.handleInputChangeSalario.bind(this);
        this.enviaForm = this.enviaForm.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.formSubmitInfo = this.formSubmitInfo.bind(this);
    }

    componentDidMount() {
        $('#usuario').on('change', function (event) {
            this.setState({usuario: event.target.value});
        }.bind(this));

        $('#funcao').on('change', function (event) {
            this.setState({funcao: event.target.value});
        }.bind(this));

        $('#grauInstrucao').on('change', function (event) {
            this.setState({grauInstrucao: event.target.value});
        }.bind(this));

        $('#usuario').material_select();
        $('#funcao').material_select();
        $('#grauInstrucao').material_select();
    }

    resetForm() {
        this.setState(this.baseState);
    }

    formSubmitInfo() {
        let data = {
            usuario: this.state.usuario,
            funcao: this.state.funcao,
            cargaHorarioMensal: this.state.cargaHorarioMensal,
            grauInstrucao: this.state.grauInstrucao,
            valorHora: this.state.valorHora,
            salario: this.state.salario,
            observacao: this.state.observacao
        };

        return data;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleInputChangeSalario(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        if (name === 'cargaHorarioMensal') {
            this.setState({salario: parseFloat(value) * parseFloat(this.state.valorHora)});
        }

        if (name === 'valorHora') {
            this.setState({salario: parseFloat(this.state.cargaHorarioMensal) * parseFloat(value)});
        }
    }

    enviaForm(event) {
        event.preventDefault();

        console.log(JSON.stringify(this.formSubmitInfo()));

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(this.formSubmitInfo()),
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `${localStorage.getItem('auth-token')}`,
            })
        };

        fetch(`http://localhost:8080/funcionarios`, requestInfo)
            .then(response => {
                if (response.ok) {
                    this.resetForm();
                    this.setState({msgSucesso: 'Funcionário salvo com sucesso.'});
                    return response.json();
                } else {
                    throw new Error("Não foi possível realizar o cadastro do funcionário.");
                }
            })
            // .then(body => {
            //     PubSub.publish('atualiza-lista-restricoes', body);
            // })
            .catch(error => {
                if (localStorage.getItem('auth-token')) {
                    this.setState({msgErro: error.message})
                } else {
                    browserHistory.push("/?msg=Seu tempo de login expirou");
                }
            });
    }

    render() {
        return (
            <div>
                <form className="col s6 offset-s3" onSubmit={this.enviaForm} method="POST">
                    {
                        this.state.msgErro.length > 0 &&
                        <div className="card-panel red lighten-1">
                            <span className="white-text">{this.state.msgErro}</span>
                        </div>
                    }
                    {
                        this.state.msgSucesso.length > 0 &&
                        <div className="card-panel green lighten-1">
                            <span className="white-text">{this.state.msgSucesso}</span>
                        </div>
                    }

                    <div className="row">
                        <div className="input-field col s6">
                            <select id="usuario" name="usuario" value={this.state.usuario}
                                    onChange={this.handleInputChange}>
                                {
                                    this.props.funcionarios.map(function (funcionario) {
                                        return (
                                            <option key={funcionario._links.self.href}
                                                    value={funcionario._links.self.href}>{funcionario.nome}</option>
                                        )
                                    })
                                }
                            </select>
                            <label htmlFor="usuario">Usuário</label>


                        </div>
                        <div className="input-field col s6">
                            <select id="funcao" name="funcao" value={this.state.funcao}
                                    onChange={this.handleInputChange} required>
                                <option value="personalTrainer">Personal Trainer</option>
                                <option value="instrutor">Instrutor</option>
                            </select>
                            <label htmlFor="funcao">Função</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6">
                            <input id="cargaHorarioMensal" name="cargaHorarioMensal" type="number"
                                   value={this.state.cargaHorarioMensal}
                                   onInput={this.handleInputChangeSalario} required/>
                            <label htmlFor="cargaHorarioMensal">Carga Horário Mensal</label>
                        </div>

                        <div className="input-field col s6">
                            <select id="grauInstrucao" name="grauInstrucao" value={this.state.grauInstrucao}
                                    onChange={this.handleInputChange} required>
                                <option value="superiorIncompleto">Superior Incompleto</option>
                                <option value="superiorCompleto">Superior Completo</option>
                                <option value="mestre">Mestre</option>
                                <option value="doutor">Doutor</option>
                            </select>

                            <label htmlFor="grauInstrucao">Grau de Instrução</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6">
                            <input id="valorHora" name="valorHora" type="number"
                                   value={this.state.valorHora}
                                   onInput={this.handleInputChangeSalario} required/>
                            <label htmlFor="valorHora">Valor Hora</label>
                        </div>


                        <div className="input-field col s6">
                            <input id="salario" name="salario" type="number"
                                   value={this.state.salario}
                                   onChange={this.handleInputChange} disabled/>
                            <label htmlFor="salario">Salário</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <textarea id="observacao" name="observacao" type="text"
                                      value={this.state.observacao} className="materialize-textarea"
                                      onChange={this.handleInputChange}/>
                            <label htmlFor="observacao">Observações</label>
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
            </div>
        )
    }
}

// class TabelaMatricula extends Component {
//
//     constructor(props) {
//         super(props);
//
//         this.removeRestricao = this.removeRestricao.bind(this);
//     }
//
//     removeRestricao(restricao) {
//         const requestInfo = {
//             method: 'DELETE',
//             headers: new Headers({
//                 'Content-type': 'application/json',
//                 'Authorization': `${localStorage.getItem('auth-token')}`,
//             })
//         };
//
//         fetch(`${restricao._links.self.href}`, requestInfo)
//             .then(response => {
//                 if (response.ok) {
//                     PubSub.publish('atualiza-lista-restricoes', 'asd');
//                 } else {
//                     throw new Error("Não foi possível excluir uma restrição.");
//                 }
//             })
//     }
//
//     render() {
//         return (
//             <div className="col s6 offset-s3">
//                 <table className="pure-table">
//                     <thead>
//                     <tr>
//                         <th>Restrições</th>
//                         <th className="right-align">Ações</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {
//                         this.props.restricoes.map(function (restricao) {
//                             return (
//                                 <tr key={restricao._links.self.href}>
//                                     <td>{restricao.descricao}</td>
//                                     <td className="right-align">
//                                         <i onClick={() => this.removeRestricao(restricao)}
//                                            className="material-icons red-text">delete</i>
//                                     </td>
//                                 </tr>
//                             );
//                         }.bind(this))
//                     }
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }
// }


export default class FuncionarioBox extends Component {

    constructor() {
        super();
        this.state = {funcionarios: []};
    }

    componentDidMount() {
        const requestInfo = {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `${localStorage.getItem('auth-token')}`,
            })
        };
        fetch(`http://localhost:8080/users/search/findByFuncionario`, requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Não foi possível buscar os funcionários.");
                }
            })
            .then(body => {
                this.setState({funcionarios: body._embedded.users});
                $('#usuario').material_select();
            });

        // PubSub.subscribe('atualiza-lista-clientes-matricula', function (topico, novaRestricao) {
        //     fetch(`http://localhost:8080/clientes`, requestInfo)
        //         .then(response => {
        //             if (response.ok) {
        //                 return response.json();
        //             } else {
        //                 throw new Error("Não foi possível buscar as restrições.");
        //             }
        //         })
        //         .then(body => {
        //             this.setState({clientes: body._embedded.clientes});
        //         });
        // }.bind(this));
    }

    render() {
        return (
            <div>
                <FormularioFuncionario funcionarios={this.state.funcionarios}/>
                {/*<TabelaRestricoes restricoes={this.state.restricoes}/>*/}
            </div>
        );
    }


}
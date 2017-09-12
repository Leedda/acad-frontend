import React, {Component} from 'react';
import $ from 'jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

export default class CadastroBox extends Component {

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
            tipoCadastro: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.enviaForm = this.enviaForm.bind(this);
    }

    componentDidMount() {
        $('select').material_select();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log(target.type);

        this.setState({
            [name]: value
        });
    }

    enviaForm(event) {
        event.preventDefault();

        console.log(this.state);
    }

    render() {
        return (
            <form className="col s6 offset-s3" onSubmit={this.enviaForm} method="POST">
                <div className="row">
                    <div className="input-field col s6">
                        <input id="nome" name="nome" type="text" className="validate"
                               value={this.state.nome}
                               onChange={this.handleInputChange}/>
                        <label htmlFor="nome">Nome Completo</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="dataNasc" name="dataNasc" type="text" className="validate"
                               value={this.state.dataNasc}
                               onChange={this.handleInputChange}/>
                        <label htmlFor="dataNasc">Data Nascimento</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="cpf" name="cpf" type="text" className="validate"
                               value={this.state.cpf}
                               onChange={this.handleInputChange}/>
                        <label htmlFor="cpf">CPF</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="endereco" name="endereco" type="text" className="validate"
                               value={this.state.endereco}
                               onChange={this.handleInputChange}/>
                        <label htmlFor="endereco">Endereço</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s4">
                        <input id="estado" name="estado" type="text" className="validate"
                               value={this.state.estado}
                               onChange={this.handleInputChange}/>
                        <label htmlFor="estado">Estado</label>
                    </div>
                    <div className="input-field col s4">
                        <input id="cidade" name="cidade" type="text" className="validate"
                               value={this.state.cidade}
                               onChange={this.handleInputChange}/>
                        <label htmlFor="cidade">Cidade</label>
                    </div>
                    <div className="input-field col s4">
                        <input id="cep" name="cep" type="text" className="validate"
                               value={this.state.cep}
                               onChange={this.handleInputChange}/>
                        <label htmlFor="cep">Cep</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="email" name="email" type="email" className="validate"
                               value={this.state.email}
                               onChange={this.handleInputChange}/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="telefone" name="telefone" type="text" className="validate"
                               value={this.state.telefone}
                               onChange={this.handleInputChange}/>
                        <label htmlFor="telefone">Telefone</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="senha" name="senha" type="password" className="validate"
                               value={this.state.senha}
                               onChange={this.handleInputChange}/>
                        <label htmlFor="senha">Senha</label>
                    </div>
                    <div className="input-field col s6">
                        <select id="tipoCadastro" name="tipoCadastro" value={this.state.tipoCadastro}
                                onChange={this.handleInputChange}>
                            <option value="cliente">Cliente</option>
                            <option value="funcionario">Funcionário</option>
                        </select>
                        <label htmlFor="tipoCadastro">Tipo de cadastro</label>
                    </div>
                </div>

                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
        )
    }

}
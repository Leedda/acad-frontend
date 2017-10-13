import React, {Component} from 'react';
import {browserHistory} from 'react-router';

export default class RestricoesBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            descricao: '',
        };

        this.baseState = this.state;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.enviaForm = this.enviaForm.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    resetForm() {
        this.setState(this.baseState);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
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

        fetch(`http://localhost:8080/restricoes`, requestInfo)
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
        return (
            <form className="col s6 offset-s3" onSubmit={this.enviaForm} method="POST">
                <div className="row">
                    <div className="input-field col s6">
                        <input id="descricao" name="descricao" type="text"
                               value={this.state.descricao}
                               onChange={this.handleInputChange} required/>
                        <label htmlFor="descricao">Descrição</label>
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
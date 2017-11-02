import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Header extends Component {

    render() {
        return (
            <div>
                <ul id="slide-out" className="side-nav fixed z-depth-2">
                    <li className="center no-padding">
                        <div className="red lighten-1 white-text valign-wrapper title-side-nav-wrapper">
                            <span className="title-side-nav center-align">
                                Academia ABC
                            </span>
                        </div>
                    </li>

                    <li><Link to="/academia">Dashboard</Link></li>
                    <li><Link to="/academia/cadastro">Cadastro</Link></li>
                    <li><Link to="/academia/restricoes">Restrições</Link></li>
                    <li><Link to="/academia/funcionario">Funcionário</Link></li>
                    <li><Link to="/academia/matricula">Matrícula</Link></li>
                </ul>


                <header>
                    <ul className="dropdown-content" id="user_dropdown">
                        <li><a className="red-text text-lighten-2">Profile</a></li>
                        <li><Link className="red-text text-lighten-2" to="/academia/logout">Logout</Link></li>
                    </ul>

                    <nav className="red lighten-2" role="navigation">
                        <div className="nav-wrapper">
                            <a data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>

                            <ul className="right hide-on-med-and-down">
                                <li>
                                    <a className='right dropdown-button' href='' data-activates='user_dropdown'><i className=' material-icons'>account_circle</i></a>
                                </li>
                            </ul>

                            <a data-activates="slide-out" className="button-collapse"><i className="mdi-navigation-menu"></i></a>
                        </div>
                    </nav>

                </header>

            </div>

        );
    }
}

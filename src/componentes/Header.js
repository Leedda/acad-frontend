import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Header extends Component {

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <div className="col s12">
                        <Link to="/academia" className="brand-logo">Academia ABC</Link>
                        <a data-activates="menu-mobile" className="button-collapse">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><Link to="/academia/logout">Logout</Link></li>
                        </ul>
                        <ul id="menu-mobile" className="side-nav">
                            <li><Link to="/academia/logout">Logout</Link></li>
                        </ul>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><Link to="/academia/cadastro">Cadastro</Link></li>
                        </ul>
                        <ul id="menu-mobile" className="side-nav">
                            <li><Link to="/academia/cadastro">Cadastro</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

import React, {Component} from 'react';
import $ from 'jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import {Link} from 'react-router';

class App extends Component {

    componentDidMount() {
        $(".button-collapse").sideNav();
    }

    render() {
        return (
            <div className="row">
                <nav>
                    <div className="nav-wrapper">
                        <div className="col s12">
                            <Link to="/" className="brand-logo">Academia ABC</Link>
                            <a data-activates="menu-mobile" className="button-collapse">
                                <i className="material-icons">menu</i>
                            </a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><Link to="/cadastro">Cadastro</Link></li>
                            </ul>
                            <ul id="menu-mobile" className="side-nav">
                                <li><Link to="/cadastro">Cadastro</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="main col s12">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;

import React, {Component} from 'react';
import $ from 'jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import Header from "./componentes/Header";

class App extends Component {

    componentDidMount() {
        $(".button-collapse").sideNav();
    }

    render() {
        return (
            <div className="row">
                <Header/>

                <div className="main col s12">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;

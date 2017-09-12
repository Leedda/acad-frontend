import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './componentes/Home';
import CadastroBox from './componentes/Cadastro';
import registerServiceWorker from './registerServiceWorker';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route exact path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/cadastro" component={CadastroBox}/>
        </Route>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();

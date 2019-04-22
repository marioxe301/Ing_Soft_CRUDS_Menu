import React, { Component } from 'react';
import  {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import ListaUsuario from './TablaUsuarios';
import './App.css';



class App extends Component {
    render() {
        return ( 
            <body>
                <h1>USUARIOS</h1>
                
                    <div className="Forms">
                        <ListaUsuario/>
                    </div>

            </body>    
        );
    }
}

export default App;
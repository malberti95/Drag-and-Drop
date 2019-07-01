import React, { Component } from 'react';

import TitleBar from './TitleBar';
import Main from './Main'

class App extends Component{

    constructor(){
        super();
        this.state = {
            user: 'Martin'
        }
    }

    render(){


        return(
            <div>
                <TitleBar user={this.state.user}/>
                
                <Main/>
            </div>
        )
    }
}

export default App;
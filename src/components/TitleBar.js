import React, { Component } from 'react';
//form imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class TitleBar extends Component{

    constructor(){
        super()
        this.state = {
            boardTitle: '',
            newBoardTitle: '',
            boardForm: true
        }
    }

    changeBoardTitle(){
        const newName = this.state.newBoardTitle;
        this.setState({
            boardTitle: newName,
            boardForm: false
        })
    }
    openForm(){
        this.setState({
            newBoardTitle: '',
            boardForm: true
        })
    }

    renderForm(){
        return(
            <Form.Group className="d-flex" controlId="newBoardName" >
                <Form.Control 
                    type="text"
                    placeholder="Board title..." 
                    className="d-inline-block"
                    onChange={event => this.setState({ newBoardTitle: event.target.value})}
                />
                <Button 
                    className="mx-1 d-inline-block" 
                    variant="success"
                    onClick={() => this.changeBoardTitle()}
                >
                    Set
                </Button>
            </Form.Group>
        )
    }


    render(){
        const titleForm = this.state.boardForm === true ? 
                            this.renderForm() : 
                            <div >
                                <h1 className="d-inline-block">
                                {this.state.boardTitle}
                                </h1>
                                {'    '}
                                <p className="d-inline-block" onClick={() => this.openForm()}>Edit</p>
                            </div>
                            ;
    
        return(
            <nav className="navbar navbar-dark bg-dark">
                <div className="d-inline-block mr-auto ml-5">
                    <h1 className="navbar-brand">Boardy</h1>
                </div>
                <div className="d-inline-block mx-auto">
                    {titleForm}
                </div>
                <div className="d-inline-block ml-auto mr-5">
                    <h3 className="navbar-brand">{this.props.user}</h3>
                </div>
            </nav>
        )
    }
}

export default TitleBar;
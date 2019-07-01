import React, { Component } from 'react';

//jumbotrom imports
import Jumbotron from 'react-bootstrap/Jumbotron'
import Dropdown from 'react-bootstrap/Dropdown'
//form imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import PipeCard from './PipeCard'

class Pipeline extends Component{

    constructor(props){
        super(props);
        this.state = {
            cards: [],
            newCardTitle: '',
            newCardContent: '',
            newPipeline: true,
            newPipelineNameShow: true,
            newPipelineName: ''
        }
    }

    showForm(){
        this.setState({
            newPipeline: false
        })
    }
    hideForm(){
        this.setState({
            newPipeline: true
        })
    }
    addForm(){
        return(
            <Form.Group className="" controlId="newPipeline">
                <Form.Control 
                    className="mt-3"
                    type="text"
                    placeholder="Card title..." 
                    onChange={event => this.setState({ newCardTitle: event.target.value})}
                />
                <Form.Control 
                    className="mb-3"
                    type="text"
                    placeholder="Card content..." 
                    onChange={event => this.setState({ newCardContent: event.target.value})}
                />
                <Button 
                    className="mx-1" 
                    variant="success"
                    onClick={() => this.addCard()}
                >
                    Add
                </Button>
                <Button 
                    className="mx-1" 
                    variant="danger"
                    onClick={() => this.hideForm()}
                >
                    Cancel
                </Button>
            </Form.Group>
        )
    }

    //Funciones para cambiar el nombre de la pipeline
    showNewNameForm(){
        this.setState({
            newPipelineNameShow: false
        })
    }
    closeNewNameForm(){
        this.setState({
            newPipelineNameShow: true
        })
    }
    changePipeName(){
        const newName = this.state.newPipelineName;
        this.props.changeName(this.props.title, newName);
        this.closeNewNameForm();
    }

    newPipelineNameShow(){
        return(                
                <Form.Group className="row" controlId="newPipelineName" >
                    <div className="col-12 mb-1">    
                        <Form.Control 
                            type="text"
                            placeholder="Pipeline title..." 
                            onChange={event => this.setState({ newPipelineName: event.target.value})}
                        />
                    </div>
                    <div className="col-6">
                        <Button 
                            className="mx-1" 
                            variant="success"
                            onClick={this.changePipeName.bind(this)}
                        >
                            Change
                        </Button>
                    </div>
                    <div className="col-6">
                        <Button 
                            className="mx-1" 
                            variant="danger"
                            onClick={() => this.closeNewNameForm()}
                        >
                            Cancel
                        </Button>
                    </div>
                </Form.Group>
        )
    }

    addCard(){
        if(this.state.newCardTitle !== '' && this.state.newCardContent !== '' ){
            let cardList = this.state.cards;

            const newCard = {
                title: this.state.newCardTitle,
                content: this.state.newCardContent,
                id: this.state.cards.length + 1,
                origin: this.props.title,
            }
            cardList.push(newCard);
            this.setState({
                cards: cardList,
                newCardTitle: '',
                newCardContent: '',
                newPipeline: true
            })
        }
    }


/*****************************************************************************************************************************
*********************************************** Funciones para drag and drop  ***********************************************
*****************************************************************************************************************************/

    //cuando se agarra item
    handleDragStart(e, data, i) {
        this.draggedCard = this.state.cards[i];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("card", JSON.stringify(data));
    }
    //cuando se pasa por arriba de otra card (para reordenar)
    handleDragOver(index){
        const draggedOverItem = this.state.cards[index];
        if(this.draggedCard === draggedOverItem){
            return;
        }
        let cards = this.state.cards.filter(el => el !== this.draggedCard);
        cards.splice(index, 0, this.draggedCard)
        this.setState({ cards });
    }
    //cuando se tira el item
    handleDrop(evt){
        evt.preventDefault();
        let obj = evt.dataTransfer.getData("card");
        obj = JSON.parse(obj);

        this.props.lastAct(this.props.title);
        
        if(this.props.last !== this.props.title){
            let cards = this.state.cards.filter(card => card !== obj);
            cards.push(obj);
            obj.origin = this.props.title;
            this.setState({ cards })
        }
    }
    //cuando se termina de agarrar
    handleDragEnd(index){
        this.draggedIdx = null;

        if(this.props.last !== this.props.title){
            let cards = this.state.cards.filter(card => card !== this.draggedCard);
            this.setState({
                cards
            })
        }
    }

    render(){
        
        const form = this.state.newPipeline ? <div></div> : <div className="newCardForm">{this.addForm()}</div>;
        const newName = this.state.newPipelineNameShow ?  <h3 onClick={() => console.log(this.state.cards)}>{this.props.title}</h3> : this.newPipelineNameShow();

        let renderCards = this.state.cards.map((el, i) =>{
            return(
                <div
                    draggable
                    onDragStart={(e) => this.handleDragStart(e, el, i)}
                    onDragOver ={() => this.handleDragOver(i)}
                    onDragEnd = {() => this.handleDragEnd(i)}
                    key={`${i}_${new Date().setTime()}`} 
                >
                    <PipeCard
                        title={el.title} 
                        content={el.content}
                        id={i}
                        origin={this.props.title}
                    />
                </div>
            )
        })

        return(
            <article className='col-lg-4 col-md-2'>
                <Jumbotron
                    className='py-3'
                    onDragOver={(e) => e.preventDefault(e)} 
                    onDrop={(e) => this.handleDrop(e)}>
                    <div className='row no-gutters'>
                        <div className='col-10'>
                            <div className="row">
                                <div className="col-11">
                                    {newName}
                                </div>
                            </div>
                        </div>
                        <div className='col-2'>

                            <Dropdown alignRight>
                                <Dropdown.Toggle >
                                    Edit
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => this.showNewNameForm()}>Change name</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.props.delete()}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </div>
                        <div className='col-12'>
                            {renderCards}
                            {form}
                            <p className='m-0 addCard' onClick={() => this.showForm()} >+ Add a card</p>
                        </div>
                    </div>
                    
                </Jumbotron>
            </article>
        )
    }
}

export default Pipeline;
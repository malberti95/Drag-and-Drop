import React, { Component } from 'react';


//components imports
import Pipeline from './Pipeline'

//form imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

class Main extends Component{

    constructor(props){
        super(props);
        this.state = {
            pipelines: [],
            newPipeline: '',
            newName: '',
            cardToDelete: null
        }
    }

    addPipeline(){

        if(this.state.newPipeline !== ''){
            let all = this.state.pipelines;
        
            all[all.length] = {
                title: this.state.newPipeline,
                id: all.length + 1
            };
            this.setState({
                pipelines: all,
                newPipeline: ''
            })
            const input = document.querySelector('.newPipeInput')
            input.value ='';
        }
    }



    removePipeline(pipeline){
        let update = this.state.pipelines;
        for (let i = 0; i < update.length; i++) {
            const el = update[i];
            if(el === pipeline){
                update.splice(i, 1);
                break;
            }
        }

        this.setState({
            pipelines: update
        });
        
    }

    changeName(oldTitle, newTitle) {
        if(newTitle !== ''){
            let update = this.state.pipelines;
            update.map(el => {
                if(oldTitle === el.title){
                    el.title = newTitle;
                }
                return el
            })
            this.setState({
                pipelines: update
            })
        }
    }
    // componentDidUpdate(){
    //     console.log(this.props.lastAct)
    // }

    lastPipeAct(newTitle){
        this.setState({
            cardToDelete: newTitle
        })

    }

    render(){
        let pipes = this.state.pipelines.map((el, i) => {
            return(
                <Pipeline 
                title={el.title} 
                key={i} 
                delete={() => this.removePipeline(el)} 
                changeName={this.changeName.bind(this)}
                lastAct={this.lastPipeAct.bind(this)}
                last={this.state.cardToDelete}
                />
            )
        })
        
        return(
            <section className="container">        
                <form className="row no-gutters">
                    
                        <div className="col-4 mr-auto mt-5" >
                            <p>+ Add a new pipeline!</p>
                            <Form.Group className="d-inline-flex" controlId="newPipeline" >
                                <Form.Control 
                                    className="mx-1 newPipeInput"
                                    type="text" 
                                    placeholder="New pipeline name" 
                                    onChange={event => this.setState({ newPipeline: event.target.value})}
                                />
                                <Button 
                                    className="mx-1" 
                                    variant="primary"
                                    onClick={() => this.addPipeline()}
                                >
                                    Add
                                </Button>
                            </Form.Group>
                        </div>
                </form>
                <div className="row">
                    {pipes}
                </div>
            </section> 
        )
    }
}

export default Main;
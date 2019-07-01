import React, { Component } from 'react';

//import bootstrap
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
//imports forms
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class PipeCard extends Component{

    constructor(props) {
        super(props);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,
          title: this.props.title,
          content: this.props.content,
          id: this.props.id,
          origin: this.props.origin,
          newTitle: '',
          newContent: ''
        };
      }
      handleClose() {
        this.setState({ 
            show: false,
            newTitle: '',
            newContent: ''
         });
      }
      handleShow() {
        this.setState({ show: true });
      }
      modifyTask(){
        if(this.state.newTitle !== ''){
            this.setState({
                title: this.state.newTitle,
                show: false
            })
        }
        if(this.state.newContent !== ''){
            this.setState({
                content: this.state.newContent,
                show: false
            })
        }
      }


    render(){

        return(

            <article className='row my-3'>
                <div className='col-12'>
                    <Card bg="dark" text="white" onClick={this.handleShow}>
                        <Card.Body>
                            <Card.Title>{this.state.title}</Card.Title>
                            <Card.Text>
                                {this.state.content}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modify this task!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <Form.Group className="" controlId="newPipeline" >
                                <Form.Control 
                                    className=" my-3"
                                    type="text"
                                    placeholder="Card title..." 
                                    onChange={event => this.setState({ newTitle: event.target.value})}
                                />
                                <Form.Control 
                                    className=" my-3"
                                    type="text"
                                    placeholder="Card content..." 
                                    onChange={event => this.setState({ newContent: event.target.value})}
                                />
                                <Button 
                                    className="mx-1 my-3" 
                                    variant="success"
                                    onClick={() => this.modifyTask()}
                                >
                                    Save
                                </Button>
                            </Form.Group>
                        </form>
                    </Modal.Body>
                </Modal>
            </article>
        )
    }
}

export default PipeCard;
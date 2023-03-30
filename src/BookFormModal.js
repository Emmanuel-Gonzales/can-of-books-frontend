
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import React, { Component } from 'react'

export default class BookFormModal extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     show: false,
  //   }
  // };

  // handleShow = () => {
  //   this.setState({
  //     show: true
  //   })
  // }

  // handleClose = () => {
  //   this.setState({
  //     show: false
  //   })
  // }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.handleClose();
  }

  handleBookSubmit = (event) => {
    event.preventDefault();

    let bookObj = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.checked
    }

    this.props.postBook(bookObj);

    console.log(bookObj)
  }



  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add a Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={this.handleBookSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Check type="checkbox" label="status" />
              </Form.Group>
              <Button type="submit">Add Book</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}



// class Form extends React.Component{
//   render(){
//     return(
//       <>
//       <Modal>
//         <Button></Button>
//       </Modal>
//       </>
//     )
//   }
// };

// export default BookFormModal
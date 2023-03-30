import React from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';



class UpdateBookForm extends React.Component {

  handleBookSubmit = (event) =>{
     event.preventDefault(); 
    let sendBookforUpd = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.checked,
      _id: this.props.bookToUpdate._id,
      __v: this.props.bookToUpdate.__v
    }
    console.log(sendBookforUpd);

    this.props.updateBook(sendBookforUpd);
  }

  render() {
    //console.log(this.props)
    return (
      <div>
        <Modal
          show={this.props.showUpdate}
          onHide={this.props.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Book info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleBookSubmit}>
              <Form.Group controlId="title" >
                <Form.Label>Title</Form.Label>
                <Form.Control type="text"  defaultValue={this.props.bookToUpdate.title}/>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" defaultValue={this.props.bookToUpdate.description}/>
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Check type="checkbox" label="status" defaultChecked = {this.props.bookToUpdate.status} />
              </Form.Group>
              <Button type="submit">Update Book</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </div>)
  }
}

export default UpdateBookForm;
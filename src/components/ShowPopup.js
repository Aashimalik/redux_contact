import React,{ Component } from 'react';
import { Modal,Button} from 'react-bootstrap';

class ShowPopup extends Component{
  
    render(){
    	return(

    		
    		<Modal show={this.props.show} onHide={this.props.onHide} bsSize="small" aria-labelledby="contained-modal-title-sm">
                     <Modal.Header closeButton>
                       <Modal.Title id="contained-modal-title-sm">Delete Contact</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                       <h4>Are you sure</h4>
                     </Modal.Body>
                     <Modal.Footer>
                       <Button onClick={this.props.onHide}>Close</Button>
                       <Button bsStyle="danger" onClick={this.props.deleteclick}>Delete</Button>
                     </Modal.Footer>
                   </Modal>  

    		);
    }

}


export default ShowPopup;
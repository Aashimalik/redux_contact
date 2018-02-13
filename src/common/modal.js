import React,{ Component } from 'react';
import { Modal,Button} from 'react-bootstrap';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class ModalCrop extends Component{
    constructor(props){
        super(props)
        this.state={
            src:null,
            cropResult:null,
        }
        this.upload=this.upload.bind(this);
        this._crop=this._crop.bind(this);
    }
    upload(){
        this.props.aftercrop(this.state.cropResult)
        this.props._onchange(dataURItoBlob(this.state.cropResult))
    }
    _crop(){
        const k= this.refs.cropper.getCroppedCanvas().toDataURL();
        this.setState({
            cropResult:k
        })
      }
    render(){
    	return(
    		<Modal show={this.props.smShow} onHide={this.props.onHide}  bsSize="small" aria-labelledby="contained-modal-title-sm">
                    <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">Profile Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Cropper
                    ref='cropper'
                     src={this.props.image}
                    style={{height: 300, width:"100%"}}
                    aspectRatio={16 / 9}
                    guides={false}
                    crop={this._crop}
                    />
                     </Modal.Body>
                     <Modal.Footer>
                       <Button onClick={this.props.onHide}>Close</Button>
                       <Button onClick={this.upload}>Crop</Button>
                     </Modal.Footer>
                   </Modal>  

    		);
    }
}

function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    var i = 0;
    var l = binary.length;
    
    for ( ; i < l; i++) {
      array.push(binary.charCodeAt(i));
    }
    
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  }



// function dataURItoBlob(dataURI) {
//     // convert base64 to raw binary data held in a string
//     var byteString = atob(dataURI.split(',')[1]);

//     // separate out the mime component
//     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

//     // write the bytes of the string to an ArrayBuffer
//     var arrayBuffer = new ArrayBuffer(byteString.length);
//     var _ia = new Uint8Array(arrayBuffer);
//     for (var i = 0; i < byteString.length; i++) {
//         _ia[i] = byteString.charCodeAt(i);
//     }

//     var dataView = new DataView(arrayBuffer);
//     var blob = new Blob([dataView], { type: mimeString });
//     return blob;
// }

export default ModalCrop;

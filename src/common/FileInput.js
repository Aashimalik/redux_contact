import React from 'react'
import { FormGroup, ControlLabel } from "react-bootstrap";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import ModalCrop from './modal'

class FileInput extends React.Component {
    constructor(props) {
      super(props);
      this.state={
          smShow:false,
          image:null,
          src:''
      }
      
      this.select = this.select.bind(this);
      this.toggleModal=this.toggleModal.bind(this);
      this.aftercrop=this.aftercrop.bind(this);
    }
    aftercrop(value){
        this.setState({
            smShow:false,
            src:value
        })

    }

    select(event) {
        this.setState({ smShow: true });
        const {_onchange}=this.props;
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({
                   image: e.target.result
                })
            };
            reader.readAsDataURL(event.target.files[0]);
        
        }
        
    //   const { input,_onchange } = this.props;
    //   input.onChange(e.target.files[0])
    //   this.setState({src:e.target.files[0].name})
    //   _onchange(e.target.files[0].name)
    }
    toggleModal(){
        this.setState(function(prevState) {
            return {smShow: !prevState.smShow};
        })
    } 
    render() {
    	const {  label,input} = this.props;
        const { src}=this.state;
    	return (
    		<FormGroup>
    			<ControlLabel>{label}</ControlLabel>
                <input type="file"  onChange={this.select}  />
              <img src={src} /> 
               < ModalCrop {...this.props} image={this.state.image} aftercrop={this.aftercrop} smShow={this.state.smShow} onHide={this.toggleModal}/>
    		</FormGroup>
    	);
      }
    }




export default FileInput;
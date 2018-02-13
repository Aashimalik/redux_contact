import React,{ Component } from 'react';
import {Http} from '../lib/Http';
import FileInput from "../common/FileInput";
import { Form,Button,Image } from 'react-bootstrap';
import { Field,reduxForm, SubmissionError } from 'redux-form';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class MyProfile extends Component{
    constructor(props){
        super(props)
        this.state={
            image:{},
            cropResult:null
        }
       this.formSubmit=this.formSubmit.bind(this);
       this.isLoading=this.isLoading.bind(this);
      
    }
    isLoading(val){
        this.setState({image:val});
    }
    _crop() {
     let k=this.refs.cropper.getCroppedCanvas().toDataURL();
     
      }
    
   
    render(){
        const {  handleSubmit, submitting} = this.props;
        const {image}=this.state;
        return(
          
             <Form onSubmit={handleSubmit(this.formSubmit)}>
                <Field 
                component={FileInput} type="file"
                label="Profile Image"
                name="image"
                _onchange={this.isLoading}/>
                <Button  bsStyle="primary" type="submit" >Upload</Button>
            </Form>
            
        );
    }

    formSubmit(values) {
       const {image}=values;
       let formdata=new FormData();
       formdata.append('mail','vbn');
       formdata.append('',this.state.image);
       console.log(formdata)
       Http.post('adminapi/user/add',formdata)
       .then((data)=>{
           console.log("data",data)
       })
       .catch((err)=>{
           console.log(err)
       })

    }
}

const image=reduxForm({
    form:'Myprofile'
})(MyProfile)
export default (image);



//image ? this.setState({isLoading:true}):this.setState({isLoading:false});
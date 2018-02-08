import React, { Component } from 'react';
import {Modal,Button} from 'react-bootstrap';
import {Http} from '../lib/Http';
import AlertNotification from './aletmodal' ;

class Signup extends Component{
    constructor(props) {
      super(props);
      this.handlemodal=this.handlemodal.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.resetForm = this.resetForm.bind(this);
      this.Signup = this.Signup.bind(this);
      this.state = {
        username: '',
        password: '',
        error: '',
        success: '',
        signupLink:'',
        email:'',
        confirm_pass:""
      };
    }

    handleChange(event){
    
      this.setState({[event.target.name]:event.target.value});
    }

    

    resetForm(){
      this.setState({username:"",password:"",email:" ",confirm_pass:'',error:''});
    }

    handlemodal(){
     this.setState({username:"",password:"",success:'',error:'',email:"",confirm_pass:''})
    }

    Signup(){
    //  let password=document.getElementById("password").value;
    //   let confirm_pass=document.getElementById("confirm_pass").value;
      // if(password !==confirm_pass){
      //   document.getElementById("password").style.borderColor = "#E34234";
      //   document.getElementById("confirm_pass").style.borderColor = "#E34234";
      // }else{
       
        const { username, password ,email} = this.state;
        Http.post(`adminapi/user/sign`, { username, password,email})
        .then((data) => {
          
          if (data.error) {
            console.log(data)
            this.setState({ error: data.error, success: '' })
          } else {
            this.setState({ success: data.Success, error:'',signupLink:data.signupLink });
            this.resetForm();         
          }
        })
    
      
        
    }

   
  

    render(){
      const { username, password, error, success,email,confirm_pass } = this.state
      const { show, hide } = this.props;
      const isEnabled = username.length > 0 && password.length > 0;
      
        return(
          <div className="modal-container" style={{ height: 200, width: 10 }}>
            <Modal
              show={show}
              onHide={hide}
              onExiting={this.handlemodal}
              aria-labelledby="contained-modal-title" >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">
                  <AlertNotification alertVisible={error || success} alertMsg={error || success} className={error ? "danger" : "success"} />
                  Signup
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
            
                <div className="form-area">
                  <form >
                    <div className="form-group">
                      <input type="text" name="username" value={username} className="form-control" onChange={this.handleChange} id="name" placeholder="Name" required />
                    </div>
                    <div className="form-group">
                      <input type="text" name="email" value={email} className="form-control" onChange={this.handleChange} id="email" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                      <input type="password" name="password" value={password} className="form-control" onChange={this.handleChange} id="password" placeholder="Password" required />
                    </div>
                    <div className="form-group">
                      <input type="password" name="confirm_pass" value={confirm_pass} className="form-control" onChange={this.handleChange} id="confirm_pass" placeholder="Confirm Password" required />
                      <span>{}</span>
                    </div>
                  </form>
                </div>
               

              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.props.hide}>Close</Button>
                <Button bsStyle="info" disabled={!isEnabled} onClick={this.Signup} >Signup</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
        
    }

}





export default Signup;
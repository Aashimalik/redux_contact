import React, { Component } from 'react';
import {Modal,Button ,Form} from 'react-bootstrap';
import {Http} from '../lib/Http';
import {connect} from 'react-redux';
import { Field ,reduxForm} from 'redux-form';
import {FormField} from '../common/FormField';
import {FormSubmit} from '../common/FormSubmit';
import AlertNotification from './aletmodal' ;

class Signup extends Component{
    constructor(props) {
      super(props);
      this.handleExited= this.handleExited.bind(this);
      this.sign_Up = this.sign_Up.bind(this);
      this.state = {
       
        signupLink:''
      };
    }

    handleExited() {
      console.log("this.props",this.props)
      const {dispatch, reset} = this.props;
      dispatch(reset('signupForm'))
    }

    render(){
     
      const { show, hide,handleSubmit,errors,invalid,submitting} = this.props;
        return(
          <div className="modal-container" style={{ height: 50, width: 10 }}>
            <Modal
              show={show}
              onHide={hide}
              onExited={() => this.handleExited()}
              aria-labelledby="contained-modal-title" >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">
             
                  Signup
                </Modal.Title>
              </Modal.Header>
              <Form onSubmit={handleSubmit(this.sign_Up)} >
              <Modal.Body>
                  <Field
                    placeholder="Name"
                    label="Name"
                    type="text"
                    name="username"
                    component={FormField}
                  />
                  <Field
                    placeholder="Enter Email"
                    label="Email"
                    type="email"
                    name="email"
                    component={FormField}
                  />
                  <Field
                    placeholder="Password"
                    label="Password"
                    type="password"
                    name="password"
                    component={FormField}
                  />
                  <Field
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    type="password"
                    name="confirm_pass"
                    component={FormField}
                  />
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.props.hide}>Close</Button>
                <FormSubmit errors={errors} invalid={invalid} submitting={submitting} />
              </Modal.Footer>
              </Form>
            </Modal>
          </div>
        );
        
    }
    
    sign_Up(values) {
    console.log("inside from submit",values)
    const { username, password, email } = values;
    const { hide } = this.props;
    Http.post(`adminapi/user/signup`, { username, password, email })
      .then((data) => {
          setTimeout(() => {
            this.handleExited();
          }, 3000);
    
      })
      .catch((err) => {
        console.log(err)
      })
  }

}

const mapStateToProps = (state) => {
  const { router } = state
  return {
      router:router.location
  }
}

const signForm = reduxForm({
  form: 'signupForm',
  validate: (values) => {
    console.log(values)
      const errors = {}
      if (!values.username) {
          errors.username = "Name is required"
      }
      if (!values.email) {
          errors.email = "Email is required"
      }
      if (!values.password) {
        errors.password = "Password is required"
      }else if( values.confirm_pass && values.password !== values.confirm_pass ) {
    		errors.password = 'Password and Confirm password should match';
    	}
      if (!values.confirm_pass) {
        errors.confirm_pass = "Password is required"
    }
      return errors
  }
  
})(Signup)


export default connect(mapStateToProps) (signForm);
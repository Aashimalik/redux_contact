import React,{ Component } from 'react';
import {Http} from '../lib/Http';
import Signup from './Signup';
import { Link } from 'react-router-dom';
import AlertNotification from './aletmodal' ;
import {FormField} from '../common/FormField';
import { Form,Button } from 'react-bootstrap';
import { Field ,reduxForm} from 'redux-form';
import {createCookie} from '../lib/Cookie';

class login extends Component{
    constructor(props){
        super(props);
        this.state={
            error:'',
            success:'',
            show:false,
            
        }
      
        this.formSubmit=this.formSubmit.bind(this);
        this.toggle=this.toggle.bind(this);

    }
    
    toggle(){
        this.setState(function(prevState) {
            return {show: !prevState.show};
        })
    } 

    

    render(){
        const {error,success}=this.state;
        const { handleSubmit}=this.props;
  
        return(
            <div className="container">
            <div className="col-md-5">
                
                <AlertNotification alertVisible={error || success} alertMsg={error || success} className={error ? "danger" : "success"}/>
                    <Form onSubmit={handleSubmit(this.formSubmit)}>
                    <h3 >Login</h3>
                    <Field 
                     placeholder="Name"
                     type="text"
                     name="username"
                     label="Name"
                     component={FormField}
                    />
                    <Field 
                    component={FormField}
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                    />
                     No account? 
                    <a onClick={()=>{this.setState({show:true})}}>Create one</a><br/>
                    <Link to='/forgot'> Forgot Password</Link><br/>
                    <Button type="submit">Login</Button>
                    </Form>
                    <Signup show ={this.state.show} hide={this.toggle} />
                </div>
            </div>

        )
    }


    formSubmit(values) {
        console.log('inside form submit')
        const { history } = this.props;
        const { username, password } = values;
        Http.post(`adminapi/user/login`, { username, password })
            .then((data) => {
                const { errors } = data
                if (errors) {
                    this.setState({ error: errors.message })
                }
                if (data.token != null) {
                    createCookie("token", data.token, 1)
                    history.push('/show')
                }
            })
            .catch((err) => { console.log(err) })
    }
}

const loginForm = reduxForm({
    form: 'login',
    validate: (values) => {
        const errors = {}
        if (!values.username) {
            errors.username = "Name is required"
        }
        if (!values.password) {
            errors.password = "Password is required"
        }
        return errors
    }
})(login)







export default (loginForm);
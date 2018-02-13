import React from 'react';
import {  Button } from "react-bootstrap";

export const FormSubmit =(value)=>{
console.log(value);

const { invalid, submitting}=value
    return (
        <Button type="submit" bsStyle="primary" disabled={invalid || submitting}>
        Submit
        </Button>
    )

}
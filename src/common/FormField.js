import React from "react";
import {  HelpBlock ,FormGroup,ControlLabel,FormControl} from "react-bootstrap";
    
export const FormField = (field) => {
        const { meta ,input,type,label,placeholder} = field;
       
       return (
        <FormGroup  validationState={!meta.touched ? null : (meta.error ? 'error' : null)}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...input}  placeholder={placeholder} type={type} />
        <HelpBlock>
        {meta.touched && meta.error ? meta.error : null}
        </HelpBlock>
        </FormGroup>
        )
    

};

  
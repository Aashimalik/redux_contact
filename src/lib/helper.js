import React from 'react';
import {Label} from 'react-bootstrap';

export const statusLabel=(status)=> <Label bsStyle={status ? 'primary':'danger'}>{status ? 'Active':'Inactive'}</Label>


export const getCookie=(c_name)=> {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            let c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}


export const  delete_cookie = (name)=> {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
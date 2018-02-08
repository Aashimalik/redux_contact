import React from 'react';
import ReactDOM from 'react-dom';
import CreateContact from '../components/add';

it('renders without crashing', () => {
    const match={
        params:{
            id:"5a44e7288def2e0011ba7cd0"
        }
    }
    const div = document.createElement('div');
    ReactDOM.render(<CreateContact match={match}/>,div);
  });
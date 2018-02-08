import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

class PaginationList extends Component{
   
      render() {
          const {items,maxButtons,activePage,onSelect}=this.props;
        return (
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            items={items}
            maxButtons={maxButtons || 5}
            activePage={activePage}
            onSelect={onSelect}
          />
        );
      }
}

Pagination.propTypes={
    items:PropTypes.number.isRequired,
    maxButtons:PropTypes.number,
    activePage:PropTypes.number.isRequired,
    onSelect:PropTypes.func.isRequired,
}

export default PaginationList;
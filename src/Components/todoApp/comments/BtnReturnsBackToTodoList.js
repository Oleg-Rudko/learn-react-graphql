import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BtnReturnsBackToTodoList = () => {
  return (
    <Button variant="outline-info">
      <Link to="/" >back</Link>
    </Button>
  )
}

export default BtnReturnsBackToTodoList

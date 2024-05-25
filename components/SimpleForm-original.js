


import styles from './SimpleForm.module.css';
import { useState } from 'react';

import Joi from 'joi-browser';

const schema = {
  name: Joi.string().min(1).max(20).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(1).max(100).required(),
}

function SimpleForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  })
  const [error, setError] = useState({});

  /*
    Input box onChange handler + validation
  */

  const handlerOnChange = (event) => {
    const {name, value} = event.target;
    const errorMessage = validate(event);
    let errorData = {...error};

    if (errorMessage) {
      errorData[name] = errorMessage;
    } else {
      delete errorData[name];
    }

    let userData = {...user};
    userData[name] = value;

    setUser(userData);
    setError(errorData);
  }
  const validate = (event) => {
    // Insert validate function code here 
    const {name, value} = event.target;
    const objToCompare = {[name]: value};
    const subSchema ={[name]: schema[name]};

    const result = Joi.validate(objToCompare, subSchema);
    const {error} = result;
    return error ? error.details[0].message : null;

  }

  /*
    Submit handler
  */
  const handlerOnSubmit = (event) => {
    event.preventDefault();
    const result = Joi.validate(user, schema, {abortEarly: false});
    //const result = null; // Replace null with JOI validation here
    const {error} = result;
    if (!error) {
      console.log(user);
      return user;
    } else {
      const errorData = {};
      for (let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        errorData[name] = message;
      }
      setError(errorData);
      console.log(errorData);
      return errorData
     
    }
  }
  
  return (
    <div className={styles.container}>
      <h2>SimpleForm</h2>
      <form onSubmit={handlerOnSubmit}>
        <label>Name:</label>
        <input type='text' name='name' placeholder='Enter name' onChange={handlerOnChange} />
        <label>Email:</label>
        <input type='email' name='email' placeholder='Enter email address' onChange={handlerOnChange} />
        <label>Age:</label>
        <input type='number' name='age' placeholder='Enter age' onChange={handlerOnChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default SimpleForm
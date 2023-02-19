import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

import logo from '../../assets/logo.svg';


const Login = () => {

  let [data, setData] = useState({
    user: '',
    password: ''
  });

  let [ errorsState, setErrorsState ] = useState({
    user: false,
    password: false
  });

  const handleInput = ( event ) => {
    setData({
      ...data,
      [event.target.name] : event.target.value
    });
  }

  const usuario = 'admin';
  const contrasenia = 'admin123';

  const navigate = useNavigate();

  const handleSubmit = ( event ) => {

    event.preventDefault();

    let isError = false;

    let errors = {};

    if ( !data.user.trim() || data.user.trim().length < 0 ) {
      errors.user = 'El campo "Usuario" no debe estar vacío';
      isError = true;
    } else if ( data.user !== usuario ) {
      errors.user = 'El usuario ingresado es incorrecto';
      isError = true;
    }

    if ( !data.password.trim() || data.password.trim().length < 0 ) {
      errors.password = 'El campo "Contraseña" no debe estar vacío';
      isError = true;
    } else if ( data.password !== contrasenia ) {
      errors.password = 'La contraseña ingresada es incorrecta';
      isError = true;
    }

    if ( !isError ) {

      localStorage.setItem( 'auth', 'true' );
      
      event.target.reset();

      navigate('/dashboard');

    } else {
      setErrorsState( errors );
    }

  }
  
  return (

    <main
      className="d-flex flex-nowrap flex-column justify-content-center align-items-center"
      style={{ height: '100vh' }}
      bg="secondary"
    >
      <div className="img mb-4">
        <Image src={ logo } alt="Logo del restaurante" width={ 230 } height={ 120 } />
      </div>
      <div>
        <h3>Administración del restaurante</h3>
        <p>Espacio reservado para el personal</p>
      </div>
      <Form className="container col-md-4 form-home" onSubmit={ handleSubmit }>
        <Form.Group className="mb-3 ">
          <Form.Control type="text" name='user' placeholder="Usuario" onChange={ handleInput } />
          {
            errorsState.user &&
            <span className='text-danger'>{ errorsState.user }</span>
          }
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control type="password" name='password' placeholder="Contraseña" onChange={ handleInput } />
          {
            errorsState.password &&
            <span className='text-danger'>{ errorsState.password }</span>
          }
        </Form.Group>
        <Button variant="secondary" type="submit">
          Ingresar
        </Button>
      </Form>
    </main>

  );
};

export default Login;

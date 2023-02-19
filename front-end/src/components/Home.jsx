import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import logo from "../assets/logo.svg";

const Home = () => {

  /* Validando contenido de inputs  */
  const [ name, setName ] = useState("");
  const [ table, setTable ] = useState("");
  const errorMessage = validate( name, table );

  const [ searchParams, setSearchParams ] = useSearchParams();
  useEffect(() => {

    let numberTable = searchParams.get( 'mesa' );
    numberTable !== null ? setTable( numberTable ) : setTable( 0 );

  }, [])

  const navigate = useNavigate();
  const nextPage = () => {

    let client = {
      nombre: name,
      mesa: table
    }

    localStorage.setItem('cliente', JSON.stringify( client ));
    navigate("/categories");
  };

  const dashPage = () => {
    navigate("/login"); 
  }

  return (
    <>
    
    <main className="d-flex flex-nowrap flex-column justify-content-center align-items-center" style={{ height: '100vh' }} bg="secondary">
      <div className="img mb-4">
        <Image src={ logo } alt="Logo del restaurante" width={ 230 } height={ 120 } />
      </div>

      <div className="container">
        <h1>Bienvenid@!</h1>
        <p>Para continuar, debes ingresar tu nombre</p>
        <p className="fw-bolder text-warning">Número de mesa: { table }</p>

        <Form
          className="container col-md-3 form-home"
          onSubmit={(ev) => {
            ev.preventDefault();
          }}
        >
          <Form.Control
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="Nombre"
            className="mb-3"
          />
        </Form>
      </div>

      <div className="button">
        <p className="">{ errorMessage }</p>
        <Button
          type="submit"
          variant='warning'
          className='fw-bold rounded-pill py-3 mb-4'
          style={{ width: '160px' }}
          disabled={ errorMessage }
          onClick={ nextPage }
        >
          Continuar
        </Button>
      </div>
      <Button
          type="submit"
          variant='dark'
          className='fw-bold rounded-pill py-3'
          style={{ width: '160px' }}
          onClick={ dashPage }
        >
          Acceso Admin
        </Button>
    </main>
    
    
    </>
  );
};

const validate = (name, table) => {
  if (name === "") return "Tienes que ingresar un nombre para continuar";
};

export default Home;
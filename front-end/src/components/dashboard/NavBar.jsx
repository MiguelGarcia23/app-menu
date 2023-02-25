import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from "react-bootstrap/Image";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from "../../assets/logo-alternativo.svg";

import '../../styles/dashboard.css';


function NavBar() {
  
  /* setTimeout(() => {
    window.location.reload();
  }, 30000); */

  let [ lengthPendingSales, setLengthPendingSales ] = useState( 0 );
    
  useEffect(() => {

    const getSales = async () => {

      await fetch('http://localhost:3030/sales/pending')
        .then(( response ) => response.json())
        .then(( data ) => {
          setLengthPendingSales( data.lengthSales );
        })
        .catch((e) => console.log(e));

    }

    getSales();
    
  }, []);

  const navigate = useNavigate();

  const logOut = () => {

    localStorage.removeItem( 'auth' );
    navigate('/login');

  }

  return (

    <Navbar bg="warning" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <Image src={ logo } alt="Logo del restaurante" width={ 100 } height={ 60 } />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 d-flex"
            style={{ maxHeight: '150px' }}
            navbarScroll
          >
            <Nav.Link href="/dashboard" className='text-dark fw-semibold'>Home</Nav.Link>
            <Nav.Link href="/dashboard/foods" className='text-dark fw-semibold'>Comidas</Nav.Link>
            <Nav.Link href="/dashboard/drinks" className='text-dark fw-semibold'>Bebidas</Nav.Link>
            <NavDropdown title="Ventas" className='nav-dropdown' id="collasible-nav-dropdown">
              <NavDropdown.Item href="/dashboard/sales/daily">Diarias</NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/sales/weekly">Semanales</NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/sales/monthly">Mensuales</NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/sales/annual">Anuales</NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/sales">Todas</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav
            className="d-flex"
            style={{ maxHeight: '150px' }}
          >
            <Nav.Link href="/dashboard/sales/pending" className='d-flex flex-nowrap align-items-center me-3'>
              <i className="fa-solid fa-bell fs-5 text-dark fw-semibold me-2" />
              <p className='text-dark fw-semibold m-0 me-2' style={{ fontSize: '1.125rem' }}>Pedidos Pendientes</p>
              <p className='text-dark fw-bolder m-0 d-block border border-dark rounded-circle px-2'>{ lengthPendingSales }</p>
            </Nav.Link>
            <Button className='bg-transparent border-0 text-dark fw-semibold fs-5' title='Cerrar sesión' onClick={ logOut }>
              <i className="fa-solid fa-right-from-bracket" />
            </Button>
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Buscar</Button>
          </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default NavBar;
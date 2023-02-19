import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from "react-bootstrap/Image";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from "../../assets/logo-alternativo.svg";

import '../../styles/dashboard.css';

function NavBar() {
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
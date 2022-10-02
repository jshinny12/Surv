
import React from 'react'
import { Navbar,  Nav,  Offcanvas, Container} from 'react-bootstrap';

const NavBar = () => {
    const styles = {
        color: 'white',
    };

    return (
       
        <div styles= {{backgroundColor: '#181818'}}>
        <Navbar bg="#181818" variant="light" fixed="top" expand='xl'>
            <Container>
            <Navbar.Brand href="/" style = {styles}>Tradim</Navbar.Brand>
            <Navbar.Offcanvas
                placement="end"
            >
            <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-5">
                    <Nav.Link href="/" style = {{color: 'white'}}>Home</Nav.Link>
                    <Nav.Link href="/company" style = {{color: 'white'}}>Companies</Nav.Link>
                    <Nav.Link href="/customer" style = {{color: 'white'}}>Customers</Nav.Link>
                    <Nav.Link href="/about" style = {{color: 'white'}}>About</Nav.Link>
                    <Nav.Link href="/login" style = {{color: 'white', border: '1px solid white'}}>Login</Nav.Link>
                    <Nav.Link href="/create" style = {{color: 'white', border: '1px solid white'}}>Create Record</Nav.Link>
                    <Nav.Link href="/records" style = {{color: 'white', border: '1px solid white'}}>View Table</Nav.Link>
                </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
            </Container>
                
        </Navbar>
        </div>
       
    )
}

export default NavBar
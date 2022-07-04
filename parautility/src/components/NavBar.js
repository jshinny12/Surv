
import React from 'react'
import { Navbar,  Nav,  Offcanvas} from 'react-bootstrap';




const NavBar = () => {
    const styles = {
        left: "20px",
    };

    return (
        <div>
        <Navbar bg="light" variant="light" fixed="top" expand='xl'>
            <Navbar.Brand href="#home" style = {styles}>Parautility</Navbar.Brand>
            <Navbar.Offcanvas
                placement="end"
            >
            <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/company">Companies</Nav.Link>
                <Nav.Link href="/user">Customers</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>

                </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
            
                
        </Navbar>
        </div>
    )
}

export default NavBar
import {ReactSession} from "react-client-session";
import React from 'react'
import { Navbar,  Nav,  Offcanvas, Container} from 'react-bootstrap';

const NavBar = () => {
    const styles = {
        color: 'white',
    };

    return (
       
        <div styles= {{backgroundColor: '#181818', border: '1px solid black'}}>
        <Navbar bg="#181818" variant="light" fixed="top" expand='xl'>
            <Container>
            <Navbar.Brand href="/" style = {styles}>Tradim</Navbar.Brand>
            <Navbar.Offcanvas
                placement="end"
            >
            <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-5">
                    <Nav.Link href="/" style = {{color: 'white'}}>Home</Nav.Link>
                    {ReactSession.get("role") === "Merchant" ? <Nav.Link href="/company" style = {{color: 'white'}}>Companies</Nav.Link> : <></>}
                    {ReactSession.get("role") === "Customer" ? <Nav.Link href="/customer" style = {{color: 'white'}}>Customers</Nav.Link> : <></>}
                    <Nav.Link href="/about" style = {{color: 'white'}}>About</Nav.Link>
                    <Nav.Link href="/login" style = {{color: 'white', border: '1px solid white'}}>Login</Nav.Link>
                    {ReactSession.get("role") === "Merchant" ? <Nav.Link href="/create" style = {{color: 'white', border: '1px solid white'}}>Create Record</Nav.Link> : <></>}
                    {ReactSession.get("role") === "Merchant" ? <Nav.Link href="/users" style = {{color: 'white', border: '1px solid white'}}>View User Table</Nav.Link> : <></>}
                    <Nav.Link href="/admin-signup" style = {{color: 'white', border: '1px solid white'}}>Admin Signup</Nav.Link>
                    <Nav.Link href="/customer-signup" style = {{color: 'white', border: '1px solid white'}}>Customer Signup</Nav.Link>
                    <Nav.Link href="/merchant-signup" style = {{color: 'white', border: '1px solid white'}}>Merchant Signup</Nav.Link>
                </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
            </Container>
                
        </Navbar>
        </div>
       
    )
}

export default NavBar
import React from 'react'
import { Navbar,  Nav,  Offcanvas, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const Header = () => {
    const styles = {
        color: 'white',
    };

    const stored_role = localStorage.getItem("role");
    console.log(stored_role);

    return (
       
        <div styles= {{backgroundColor: '#181818', border: '1px solid black'}}>
        <Navbar bg="#181818" variant="light" fixed="top" expand='xl'>
            <Container>
            <Navbar.Brand href="/" style = {styles}>Tradim</Navbar.Brand>
            <Navbar.Offcanvas placement="end">
            <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-5">
                    <Nav.Link style = {{color: 'white'}}>Welcome, {localStorage.getItem("fname")}</Nav.Link>
                    <Nav.Link href="/" style = {{color: 'white'}}>Home</Nav.Link>
                    {stored_role === "merchant" ? <Nav.Link href="/my-company" style = {{color: 'white'}}>My Company</Nav.Link> : <></>}
                    {stored_role === "customer" ? <Nav.Link href="/customer" style = {{color: 'white'}}>My Wallet</Nav.Link> : <></>}
                    <Nav.Link href="/about" style = {{color: 'white'}} onClick = {console.log("hello")}>About</Nav.Link>
                    <Nav.Link href="/login" style = {{color: 'white'}}>Login</Nav.Link>
                    {stored_role === "admin" ? <Nav.Link href="/users" style = {{color: 'white', border: '1px solid white'}}>View User Table</Nav.Link> : <></>}
                    {stored_role === "admin" ? <Nav.Link href="/admin-company-list" style = {{color: 'white', border: '1px solid white'}}>View Company Table</Nav.Link> : <></>}
                    <Nav.Link href="/signup" style = {{color: 'white'}}>Signup</Nav.Link>
                </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
            </Container>
                
        </Navbar>
        </div>
       
    )
}

export default Header
import React, {useEffect, useState} from 'react'
import { Navbar,  Nav,  Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const Header = () => {
    const styles = {
        color: 'white',
    };

    const [navBarRole, setNavBarRole] = useState(false);

    useEffect(() => {
        (async () => {
            const stored_role = localStorage.getItem("role");
            setNavBarRole(stored_role);
        })();
    }, [navBarRole]);

    return (
       
        <div styles= {{backgroundColor: '#181818', border: '1px solid black'}}>
        <Navbar collapseOnSelect bg="dark" fixed="top" expand='lg'>
            <Container>
                <img src="./tradim/tradim_banner.png" height={40} align="left" href="/"/>
            <Navbar.Brand href="/" style = {styles}>Tradim</Navbar.Brand>
                <Navbar.Brand href="/" style = {styles}>Welcome, {localStorage.getItem("fname")}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsve-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/" style = {{color: 'white'}}>Home</Nav.Link>
                    {navBarRole === "merchant" ? <Nav.Link href="/my-company" style = {{color: 'white'}}>My Company</Nav.Link> : <></>}
                    {navBarRole === "customer" ? <Nav.Link href="/customer" style = {{color: 'white'}}>My Wallet</Nav.Link> : <></>}
                    <Nav.Link href="/about" style = {{color: 'white'}} onClick = {console.log("hello")}>About</Nav.Link>
                    <Nav.Link href="/login" style = {{color: 'white'}}>Login</Nav.Link>
                    {navBarRole === "admin" ? <Nav.Link href="/users" style = {{color: 'white'}}>View User Table</Nav.Link> : <></>}
                    {navBarRole === "admin" ? <Nav.Link href="/admin-company-list" style = {{color: 'white'}}>View Company Table</Nav.Link> : <></>}
                    <Nav.Link href="/signup" style = {{color: 'white'}}>Signup</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
                
        </Navbar>
        </div>
       
    )
}

export default Header
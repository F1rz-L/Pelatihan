import { useEffect, useState } from "react";
import {Container, Navbar, Nav} from "react-bootstrap";

const AppNavbar = () => {
    const [visible, setVisible] = useState(true);
    useEffect(()=>{
        let path = window.location.hash;
        if(path=="#login"){
            setVisible(false)
        }
    },[])

    return (
        <Navbar className="bg-primary" variant='dark'>
            <Container>
                <Navbar.Brand href='/' className='mr-auto'>Vaccination Platform</Navbar.Brand>
                <Nav className="ms-auto">
                    <Navbar.Text className="me-1">Budi</Navbar.Text>
                    <Nav.Link href="#logout">Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default AppNavbar;
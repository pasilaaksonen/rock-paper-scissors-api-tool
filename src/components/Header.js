import logo from '../logo.svg';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar } from 'react-bootstrap'

function Header() {
    return (
        <div className="App">
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
                <img alt="logo" src={logo} width="40px" height="40px"/>
                Rock paper scissors app
            </Navbar.Brand>
            <Nav>
                <Nav.Link href="/">Live games</Nav.Link>
                <Nav.Link href="/history">Player history</Nav.Link>
            </Nav>
            </Navbar>
        </div>
    );
}

export default Header

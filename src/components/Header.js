import logo from '../logo.svg';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar } from 'react-bootstrap'

function Header({ setPage }) {
    return (
        <div className="App">
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
                <img alt="logo" src={logo} width="40px" height="40px"/>
                Rock paper scissors app
            </Navbar.Brand>
            <Nav>
                <Nav.Link onClick={() => setPage("LiveGames")}>Live games</Nav.Link>
                <Nav.Link onClick={() => setPage("PlayerHistory")}>Player history</Nav.Link>
            </Nav>
            </Navbar>
        </div>
    );
}

export default Header

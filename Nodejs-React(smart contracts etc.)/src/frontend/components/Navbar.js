import {
    Link
} from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'

const Navigation = ({ web3Handler, account }) => {
    return (
        <Navbar expand="lg" bg="primary" variant="dark">
            <Container>
               
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Ana Sayfa</Nav.Link>
                        <Nav.Link as={Link} to="/nft-olustur">NFT Üret</Nav.Link>
                        <Nav.Link as={Link} to="/ilanlar">İlanlarım</Nav.Link>
                        <Nav.Link as={Link} to="/satin-aldiklarim">Satın Aldıklarım</Nav.Link>
                    </Nav>
                    <Nav>
                        {account ? (
                            <Nav.Link
                                href={`https://etherscan.io/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">
                                <Button variant="outline-light">
                                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                </Button>

                            </Nav.Link>
                        ) : (
                            <Button onClick={web3Handler} variant="outline-light">Cüzdana Bağlan</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Navigation;
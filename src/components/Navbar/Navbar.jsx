import React from "react";
import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { useDbData } from "../../utilities/firebase";

export default function NavbarApp() {
    const [data, error] = useDbData();
    if (data !== undefined) {
        console.log("database", data);
    }
    return (
        <div>
        <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/" data-cy="pageTitle">Itinerary Planner</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: "100px" }}
                    navbarScroll
                    >
                        <Nav.Link href="/" data-cy="home">Home</Nav.Link>
                        {/* <Nav.Link href="/" data-cy="home">Locations</Nav.Link>
                        <Nav.Link href="/adventures" data-cy="home">Adventures</Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </div>
    );
}
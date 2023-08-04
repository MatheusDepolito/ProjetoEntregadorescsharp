import React, { useEffect, useRef } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Header() {
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Verificar se o clique foi fora do Navbar e se o menu está expandido
      if (navbarRef.current && !navbarRef.current.contains(event.target) && document.querySelector(".navbar-collapse.show")) {
        document.querySelector(".navbar-toggler").click(); // Fechar o menu
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect ref={navbarRef}>
      <Container>
        <Navbar.Brand href="/">Seu Entregador</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/cadastrarEntregadores">Cadastrar Entregadores</Nav.Link>
            <Nav.Link as={Link} to="/visualizarEntregadores">Visualizar Entregadores</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

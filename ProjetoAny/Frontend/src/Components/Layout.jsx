import React from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Conteudo from './Conteudo';

export default function Layout() {
    return (
        <>
            <Header/>
            <Container>
                <Conteudo/>
            </Container>
        </>
    );
}
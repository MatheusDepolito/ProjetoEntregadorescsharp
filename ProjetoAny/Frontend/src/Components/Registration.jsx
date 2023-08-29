import React from "react"
import { Card, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import InputMask from "react-input-mask";
import axios from "axios";


export default function Registration() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState();
    const [email, setEmail] = useState();
    const [type, setType] = useState();  
    const [validado, setValidado] = useState(false);
    const [cadastroSucesso, setCadastroSucesso] = useState(false);
    const [cadastroErro, setCadastroErro] = useState(false);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };
    const handlePasswordConfirmChange = (event) => {
        setPasswordConfirmation(event.target.value);
    };

    async function manipulaSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();
    
        const form = evento.currentTarget;
    
        if (form.checkValidity()) {
          setValidado(false);
    
            setFirstName("");
            setLastName("");
            setPassword("");
            setEmail("");
            setType("");
            setPasswordConfirmation("");
            enviarDados();
        } else {
          setValidado(true);
        }
    }
    async function enviarDados() {
        try {
          const response = await axios.post("https://172.16.100.82:5001/users/cadastrar", {
            firstName,
            lastName,
            password,
            email,
            type,
          });
          console.log("teste " + response.data); // Exibe a resposta do backend (opcional)
          exibirMensagemSucesso();
        } catch (error) {
          console.error(error);
          exibirMensagemErro();
        }
    }

    function exibirMensagemSucesso() {
        setCadastroSucesso(true);
        setTimeout(() => {
          setCadastroSucesso(false);
        }, 3000); // Exibir a mensagem de sucesso por 3 segundos
    }
    
      function exibirMensagemErro() {
        setCadastroErro(true);
        setTimeout(() => {
          setCadastroErro(false);
        }, 3000); // Exibir a mensagem de erro por 3 segundos
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100"> 
            <Card className="text-center p-4">
                <Card.Body>
                    <Card.Title className="mb-4">Registrar Usuário</Card.Title>
                    {cadastroSucesso && (<Alert variant="success">Cadastro realizado com sucesso!</Alert>)}
                    {cadastroErro && (<Alert variant="danger">Ocorreu um erro ao cadastrar. Por favor, tente novamente.</Alert>)}
                </Card.Body>
                <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
                    <Row className="mt-4">
                        <Form.Group as={Col} controlId="formGridFirstName">
                            <Form.Control
                                type="text"
                                placeholder="Primeiro Nome"
                                value={firstName}
                                onChange={handleFirstNameChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe o primeiro nome.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Control
                                type="text"
                                placeholder="Sobrenome"
                                value={lastName}
                                onChange={handleLastNameChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe o sobrenome.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mt-4">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe um email válido.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridType">
                                <Form.Select
                                    value={type}
                                    onChange={handleTypeChange}
                                    placeholder="Tipo"
                                    //isInvalid={validado && disponivel24horas === ""}
                                    required
                                    style={{color: "#595c5f"}}
                                    >
                                    <option value="">Tipo</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Comum">Comum</option>
                                </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe o tipo de usuario.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mt-4">
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Control
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPasswordConfirm">
                            <Form.Control
                                type="password"
                                placeholder="Confirmar Senha"
                                value={passwordConfirmation}
                                onChange={handlePasswordConfirmChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                As senhas não coincidem.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button className="mt-4" variant="primary" type="submit">
                        Cadastrar
                    </Button>
                </Form>
            </Card>
        </div>
    )
}
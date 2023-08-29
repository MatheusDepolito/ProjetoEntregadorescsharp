import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, Form, Row, Col, Button, Alert } from "react-bootstrap";
import axios from 'axios';

const schema = z.object({

    password: z.string().min(6,"A senha precisa ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    type: z.string(),
    email: z.string()

});

type FormProps = z.infer<typeof schema>;


export default function FormRegistrarUser(){
    const { handleSubmit, register, formState: { errors } } = useForm<FormProps>();
    const [cadastroSucesso, setCadastroSucesso] = useState(false);
    const [cadastroErro, setCadastroErro] = useState(false);

    async function enviarDados(data: FormProps) {
        try {
          const response = await axios.post("https://172.16.100.82:5001/users/cadastrar", data);

          //exibirMensagemSucesso();
        } catch (error) {
          console.error(error);
          //exibirMensagemErro();
        }
    }
    
    const handleForm = (data: FormProps) => {
        
    }

    return (

        <div className="d-flex justify-content-center align-items-center vh-100">
            <Card className="text-center">
                <Card.Body>
                <Card.Title className="mb-4">Cadastrar Entregadores</Card.Title>
                    {cadastroSucesso && (<Alert variant="success">Cadastro realizado com sucesso!</Alert>)}
                    {cadastroErro && (<Alert variant="danger">Ocorreu um erro ao cadastrar. Por favor, tente novamente.</Alert>)}


                    <Form onSubmit={handleSubmit(handleForm)}>

                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
import { Card, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import InputMask from "react-input-mask";
import axios from "axios";

export default function FormCadUsuarios() {
  const [validado, setValidado] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [disponivel24horas, setDisponivel24horas] = useState("");
  const [veiculo, setVeiculo] = useState("");
  const [disponivelTipoEntrega, setDisponivelTipoEntrega] = useState("");
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  const [cadastroErro, setCadastroErro] = useState(false);

  async function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      setValidado(false);

      // Limpar os campos do formulário após o envio
      setCodigo("");
      setNomeCompleto("");
      setWhatsapp("");
      setDisponivel24horas("");
      setVeiculo("");
      setDisponivelTipoEntrega("");

      // Enviar dados para o backend
      enviarDados();
    } else {
      setValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();

    //document.body.style.overflow = "hidden";
    //document.body.style.overflow = "auto";
  }

  function handleCodigoChange(event) {
    setCodigo(event.target.value);
  }

  function handleNomeCompletoChange(event) {
    setNomeCompleto(event.target.value);
  }

  function handleWhatsappChange(event) {
    setWhatsapp(event.target.value);
  }

  function handleDisponivel24horasChange(event) {
    setDisponivel24horas(event.target.value);
  }

  function handleVeiculoChange(event) {
    setVeiculo(event.target.value);
  }

  function handleDisponivelTipoEntregaChange(event) {
    setDisponivelTipoEntrega(event.target.value);
  }

  async function enviarDados() {
    try {
      const response = await axios.post("https://172.16.100.82:5001/entregador/postEntregador", {
        codigo,
        nomeCompleto,
        whatsapp,
        disponivel24horas,
        veiculo,
        disponivelTipoEntrega,
      });
      console.log(response.data); // Exibe a resposta do backend (opcional)
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
      <Card className="text-center">
        <Card.Body>
          <Card.Title className="mb-4">Cadastrar Entregadores</Card.Title>
          {cadastroSucesso && (
            <Alert variant="success">Cadastro realizado com sucesso!</Alert>
          )}
          {cadastroErro && (
            <Alert variant="danger">Ocorreu um erro ao cadastrar. Por favor, tente novamente.</Alert>
          )}
          <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCodigo">
                <Form.Control
                  type="number"
                  placeholder="Código"
                  value={codigo}
                  onChange={handleCodigoChange}
                  //isInvalid={validado && codigo === ""}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe o código.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridNomeCompleto">
                <Form.Control
                  type="text"
                  placeholder="Nome Completo"
                  value={nomeCompleto}
                  onChange={handleNomeCompletoChange}
                  //isInvalid={validado && nomeCompleto === ""}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe o nome do entregador.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row >
              <Form.Group  as={Col} controlId="formGridWhatsapp">
                <InputMask
                  mask="(99) 99999-9999"
                  maskplaceholder={null}
                  className="form-control"
                  placeholder="Número Whatsapp"
                  value={whatsapp}
                  onChange={handleWhatsappChange}
                  //isInvalid={validado && whatsapp === ""}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe o whatsapp do entregador.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mt-4">
              <Form.Group as={Col} controlId="formGridDisponivel24horas">
                <Form.Label className="mb-1">Disponível 24 Horas?</Form.Label>
                <Form.Select
                  value={disponivel24horas}
                  onChange={handleDisponivel24horasChange}
                  //isInvalid={validado && disponivel24horas === ""}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="1">Sim</option>
                  <option value="0">Não</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Por favor, informe se o entregador tem disponibilidade 24 horas.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formGridVeiculo">
                <Form.Label className="mb-1">Veículo</Form.Label>
                <Form.Select
                  value={veiculo}
                  onChange={handleVeiculoChange}
                  //isInvalid={validado && veiculo === ""}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Moto">Moto</option>
                  <option value="Carro">Carro</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Por favor, informe o veículo do entregador.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formGridDisponivelTipoEntrega">
                <Form.Label className="mb-1">Disponível para qual tipo de entrega?</Form.Label>
                <Form.Select
                  value={disponivelTipoEntrega}
                  onChange={handleDisponivelTipoEntregaChange}
                  //isInvalid={validado && disponivelTipoEntrega === ""}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Comida">Comida</option>
                  <option value="Encomendas">Encomendas</option>
                  <option value="Outros">Outros</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Por favor, informe o tipo de entrega para o qual o entregador está disponível.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button className="mt-3" variant="primary" type="submit">
              Cadastrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Col } from 'react-bootstrap';
import { BsCheck, BsPencilSquare, BsTrash, BsX } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function TabelaEntregadores() {
  const [entregadores, setEntregadores] = useState([]);
  const [editMode, setEditMode] = useState({});
  
  useEffect(() => {
    const fetchEntregadores = async () => {
      try {
        const response = await Axios.get('https://172.16.100.82:5001/entregador/getAll');
        setEntregadores(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEntregadores();
  }, []);

  const formatDisponibilidade = (valor) => {
    return valor === 1 ? "Sim" : "Não";
  };

  const handleEdit = (codigo) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [codigo]: true,
    }));
  };

  const handleConfirmEdit = async (codigo) => {
    try {
      const entregador = entregadores.find((e) => e.codigo === codigo);
      const response = await Axios.put("https://172.16.100.82:5001/entregador/updateEntregador", {
        ...entregador
      });
      //console.log("Entregador atualizado: ", response.data);
      setEditMode((prevEditMode) => ({
        ...prevEditMode,
        [codigo]: false,
      }));
    } catch (error) {
      console.log("Erro ao atualizar o entregador: ", error);
    }
  };

  const handleCancelEdit = (codigo) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [codigo]: false,
    }));
  };

  const handleDelete = async (codigo) => {
    try {
      const entregador = entregadores.find((e) => e.codigo === codigo);
      await Axios({
        method: "DELETE",
        url: `https://172.16.100.82:5001/entregador/deleteEntregador`,
        data: entregador,
      });
      setEntregadores((prevEntregadores) =>
        prevEntregadores.filter((entregador) => entregador.codigo !== codigo)
      );
      console.log("Entregador removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover o entregador:", error);
    }
  };

  const renderNormalActions = (codigo) => {
    return (
      <Col className="d-flex align-items-center justify-content-between button-column">
        <Button variant="secondary"  onClick={() => handleEdit(codigo)} style={{marginLeft: 5}}>
          <BsPencilSquare /> {/* Ícone de edição */}
        </Button>
        <Button variant="danger" onClick={() => handleDelete(codigo)} style={{marginLeft: 5}}>
          <BsTrash /> {/* Ícone de exclusão */}
        </Button>
      </Col>
    );
  };

  const renderEditActions = (codigo) => {
    return (
      <Col className="d-flex align-items-center justify-content-between button-column">
        <Button variant="secondary"  onClick={() => handleConfirmEdit(codigo)} style={{marginLeft: 5}}>
          <BsCheck />
        </Button>
        <Button variant="danger" onClick={() => handleCancelEdit(codigo)} style={{marginLeft: 5}}>
          <BsX />
        </Button>
      </Col>
    );
  };

  return (

    <div>
      <br />
      <Link to="/cadastrarEntregadores">
        <Button variant='dark' className='mb-3'>
          Cadastrar novo entregador
        </Button>
      </Link>
      <div className="table-responsive">
        <Table striped bordered hover variant='dark' className='text-center'>
          <colgroup>
            <col style={{width: "10%"}}/>
            <col style={{width: "15%"}}/> 
            <col style={{width: "15%"}}/> 
            <col style={{width: "20%"}}/> 
            <col style={{width: "15%"}}/> 
            <col style={{width: "15%"}}/> 
            <col style={{width: "10%"}}/>  
          </colgroup>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome Completo</th>
              <th>WhatsApp</th>
              <th>Disponibilidade 24 Horas</th>
              <th>Veículo</th>
              <th>Tipo de Entrega</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {entregadores.map((entregador) => (
              <tr key={entregador.codigo}>
                <td>{entregador.codigo}</td>
                <td>
                  {editMode[entregador.codigo] ? (
                    <Form.Control
                      type="text"
                      value={entregador.nomeCompleto}
                      onChange={(e) =>
                        setEntregadores((prevEntregadores) =>
                          prevEntregadores.map((prevEntregador) =>
                            prevEntregador.codigo === entregador.codigo
                              ? {
                                ...prevEntregador,
                                nomeCompleto: e.target.value,
                              } : prevEntregador
                          )
                        )
                      }
                    />
                  ) : (entregador.nomeCompleto)} {/* Fim edit mode nomeCompleto*/}
                </td>
                {/* Restante das colunas da tabela */}
                <td>
                  {editMode[entregador.codigo] ? (
                    <Form.Control
                      type='text'
                      value={entregador.whatsapp}
                      onChange={(e) =>
                        setEntregadores((prevEntregadores) =>
                          prevEntregadores.map((prevEntregador) =>
                            prevEntregador.codigo === entregador.codigo
                            ? {
                                ...prevEntregador,
                                whatsapp: e.target.value,
                              } : prevEntregador
                          )
                        )
                      }
                    />
                  ) : (entregador.whatsapp)}
                </td>
                {/* Restante das colunas da tabela */}
                <td>
                  {editMode[entregador.codigo] ? (
                    <Form.Control
                      as="select"
                      value={entregador.disponivel24horas}
                      onChange=
                      {(e) =>
                        setEntregadores((prevEntregadores) =>
                          prevEntregadores.map((prevEntregador) =>
                            prevEntregador.codigo === entregador.codigo
                            ? {
                                ...prevEntregador,
                                disponivel24horas: parseInt(e.target.value),
                              } : prevEntregador
                          )
                        )
                      }
                    >
                      <option value={1}>Sim</option>
                      <option value={0}>Não</option>
                    </Form.Control>
                  ) : (
                        formatDisponibilidade(entregador.disponivel24horas)
                      )
                  }
                </td>
                {/* Restante das colunas da tabela */}
                <td>
                  {editMode[entregador.codigo] ? (
                    <Form.Control
                      type="text"
                      value={entregador.veiculo}
                      onChange={(e) =>
                        setEntregadores((prevEntregadores) =>
                          prevEntregadores.map((prevEntregador) =>
                            prevEntregador.codigo === entregador.codigo
                              ? {
                                ...prevEntregador,
                                veiculo: e.target.value,
                              }
                              : prevEntregador
                          )
                        )
                      }
                    />
                  ) : (entregador.veiculo)}
                </td>
                {/* Restante das colunas da tabela */}
                <td>
                  {editMode[entregador.codigo] ? (
                    <Form.Control
                      as="select"
                      value={entregador.disponivelTipoEntrega}
                      onChange={(e) =>
                        setEntregadores((prevEntregadores) =>
                          prevEntregadores.map((prevEntregador) =>
                            prevEntregador.codigo === entregador.codigo
                            ? {
                                ...prevEntregador,
                                disponivelTipoEntrega: e.target.value,
                              }
                              : prevEntregador
                          )
                        )
                      }
                    >
                      <option value="Comida">Comida</option>
                      <option value="Encomendas">Encomendas</option>
                      <option value="Outros">Outros</option>
                    </Form.Control>
                  ) : (
                      entregador.disponivelTipoEntrega
                    )}
                </td>
                {/* Restante das colunas da tabela */}
                <td>
                  {editMode[entregador.codigo]
                    ? renderEditActions(entregador.codigo)
                    : renderNormalActions(entregador.codigo)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

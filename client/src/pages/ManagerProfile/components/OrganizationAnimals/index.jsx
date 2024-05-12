import styles from "./styles.module.css";
import { Button, Input, Table } from "antd";
import { Tooltip } from "antd";
import Column from "antd/es/table/Column";
import { useState } from "react";
const { Search } = Input;

export default function OrganizationAnimals() {
  const [createAnimal, setCreateAnimal] = useState(false);

  const dataSource = [
    {
      key: "1",
      name: "Mel",
      type: "Cachorro",
      sex: "Fêmea",
      size: "Médio",
      age: "14 anos",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "2",
      name: "Thor",
      type: "Cachorro",
      sex: "Macho",
      size: "Grande",
      age: "3 anos",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "3",
      name: "Luna",
      type: "Gato",
      sex: "Fêmea",
      size: "Pequeno",
      age: "1 ano",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "4",
      name: "Bela",
      type: "Cachorro",
      sex: "Fêmea",
      size: "Médio",
      age: "2 anos",
      status: "Adotado",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "5",
      name: "Max",
      type: "Cachorro",
      sex: "Macho",
      size: "Pequeno",
      age: "1 ano",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "6",
      name: "Mia",
      type: "Gato",
      sex: "Fêmea",
      size: "Pequeno",
      age: "1 ano",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "7",
      name: "Rex",
      type: "Cachorro",
      sex: "Macho",
      size: "Grande",
      age: "4 anos",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "8",
      name: "Daisy",
      type: "Cachorro",
      sex: "Fêmea",
      size: "Grande",
      age: "3 anos",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "9",
      name: "Simba",
      type: "Gato",
      sex: "Macho",
      size: "Médio",
      age: "2 anos",
      status: "Adotado",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "10",
      name: "Buddy",
      type: "Cachorro",
      sex: "Macho",
      size: "Médio",
      age: "3 anos",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "11",
      name: "Lola",
      type: "Cachorro",
      sex: "Fêmea",
      size: "Pequeno",
      age: "1 ano",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "12",
      name: "Oliver",
      type: "Gato",
      sex: "Macho",
      size: "Grande",
      age: "3 anos",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "13",
      name: "Coco",
      type: "Cachorro",
      sex: "Fêmea",
      size: "Médio",
      age: "2 anos",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "14",
      name: "Charlie",
      type: "Cachorro",
      sex: "Macho",
      size: "Pequeno",
      age: "1 ano",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "15",
      name: "Misty",
      type: "Gato",
      sex: "Fêmea",
      size: "Pequeno",
      age: "1 ano",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "16",
      name: "Rocky",
      type: "Cachorro",
      sex: "Macho",
      size: "Grande",
      age: "4 anos",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "17",
      name: "Lucy",
      type: "Cachorro",
      sex: "Fêmea",
      size: "Grande",
      age: "3 anos",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "18",
      name: "Leo",
      type: "Gato",
      sex: "Macho",
      size: "Médio",
      age: "2 anos",
      status: "Adotado",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "19",
      name: "Lucky",
      type: "Cachorro",
      sex: "Macho",
      size: "Médio",
      age: "3 anos",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "20",
      name: "Zoe",
      type: "Cachorro",
      sex: "Fêmea",
      size: "Pequeno",
      age: "1 ano",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "21",
      name: "Oscar",
      type: "Gato",
      sex: "Macho",
      size: "Grande",
      age: "3 anos",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "22",
      name: "Bella",
      type: "Cachorro",
      sex: "Fêmea",
      size: "Médio",
      age: "2 anos",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "23",
      name: "Jack",
      type: "Cachorro",
      sex: "Macho",
      size: "Pequeno",
      age: "1 ano",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "24",
      name: "Milo",
      type: "Gato",
      sex: "Macho",
      size: "Pequeno",
      age: "1 ano",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "25",
      name: "Toby",
      type: "Cachorro",
      sex: "Macho",
      size: "Grande",
      age: "4 anos",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "26",
      name: "Molly",
      type: "Cachorro",
      sex: "Fêmea",
      size: "Grande",
      age: "3 anos",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "27",
      name: "Simba",
      type: "Gato",
      sex: "Macho",
      size: "Médio",
      age: "2 anos",
      status: "Adotado",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "28",
      name: "Bailey",
      type: "Cachorro",
      sex: "Macho",
      size: "Médio",
      age: "3 anos",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "29",
      name: "Sophie",
      type: "Cachorro",
      sex: "Fêmea",
      size: "Pequeno",
      age: "1 ano",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      key: "30",
      name: "Oliver",
      type: "Gato",
      sex: "Macho",
      size: "Grande",
      age: "3 anos",
      status: "Disponível",
      actions: (
        <div className={styles.tableRowActions}>
          <Tooltip title="Ver detalhes">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log(`Teste`)}
            >
              <i className="ri-search-eye-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-edit-line"></i>
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              size="middle"
              type="link"
              onClick={() => console.log("Botão na tabela")}
            >
              <i className="ri-delete-bin-line"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      width: 130,
    },
    {
      title: "Sexo",
      dataIndex: "sex",
      key: "sex",
      width: 130,
    },
    {
      title: "Porte",
      dataIndex: "size",
      key: "size",
      width: 130,
    },
    {
      title: "Idade",
      dataIndex: "age",
      key: "age",
      width: 130,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      width: 200,
    },
  ];

  return (
    <div className={styles.container}>
      {!createAnimal && (
        <div className={styles.content}>
          <h2 className={styles.title}>Animais</h2>
          <section className={styles.actions}>
            <Search
              className={styles.searchInput}
              placeholder="Pesquise pelo nome do animal"
              loading={false}
            />
            <Button
              size="middle"
              type="primary"
              onClick={() => setCreateAnimal(() => true)}
            >
              Cadastrar animal
            </Button>
          </section>

          <Tooltip title="Mostrar filtros" className={styles.filterButton}>
            <i className={`ri-filter-line ri-xl ${styles.buttonColor}`}></i>
            <span className={styles.buttonColor}>Filtros</span>
          </Tooltip>

          <section
            className={styles.tableData}
            style={{ minWidth: "max-content" }}
          >
            <Table
              className={styles.table}
              dataSource={dataSource}
              rowClassName={styles.tableRow}
              headerClassName={styles.headerRow}
              pagination={{ total: 47 }}
              onRow={(record, rowIndex) => {
                return {
                  onDoubleClick: (event) => {
                    console.log("Teste");
                  },
                };
              }}
            >
              {columns.length &&
                columns.map(({ title, key, dataIndex, width }) => (
                  <Column
                    title={
                      <span className={styles.tableColumnTitle}>{title}</span>
                    }
                    dataIndex={dataIndex}
                    key={key}
                    width={width}
                  />
                ))}
            </Table>
          </section>
        </div>
      )}
    </div>
  );
}

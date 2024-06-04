import styles from "./styles.module.css";
import moment from "moment";
import { Button, Input, Table } from "antd";
import { Tooltip } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import CreateAnimal from "./components/CreateAnimal";
import { axiosRequest } from "../../../../../../utils/axiosRequest";
import showMessage from "../../../../../../utils/Message";
import {
  ANIMAL_SEX,
  ANIMAL_SIZES,
  ANIMAL_TYPES,
} from "../../../../../../constants";
const { Search } = Input;

export default function OrganizationAnimals({ setContent, content }) {
  const [loading, setLoading] = useState(false);
  const [createAnimal, setCreateAnimal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableFilter, setTableFilter] = useState({
    page: 1,
    size: 10,
  });

  const getLifetime = (date) => {
    const inputDate = moment(date);
    const currentDate = moment();
    const years = currentDate.diff(inputDate, "years");
    const months = currentDate.diff(inputDate, "months");
    const days = currentDate.diff(inputDate, "days");

    if (years >= 1) {
      return `${years} ${years > 1 ? "anos" : "ano"}`;
    } else if (months >= 1) {
      const exactMonths = months % 12;
      return `${exactMonths} ${exactMonths > 1 ? "meses" : "mês"}`;
    } else {
      return `${days} ${days > 1 ? "dias" : "dia"}`;
    }
  };

  const handleGetTableData = async () => {
    try {
      setLoading(true);
      const animals = await axiosRequest({
        method: "GET",
        authenticated: true,
        params: tableFilter,
        path: "/animals/table",
      });

      if ("data" in animals) {
        const formattedAnimals = animals.data.map((animal) => ({
          key: animal.id,
          name: animal.name,
          type: ANIMAL_TYPES[animal.type],
          sex: ANIMAL_SEX[animal.sex],
          size: ANIMAL_SIZES[animal.size],
          age: getLifetime(animal.birthDate),
          status: animal.status,
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
        }));
        setTableData(() => ({
          data: formattedAnimals,
          records: animals.records,
        }));
      }

      setLoading(false);
    } catch (error) {
      setTableData(() => []);
      showMessage("error", error);
      setLoading(false);
    }
  };

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

  useEffect(() => {
    handleGetTableData();
    console.log(tableData.records);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableFilter, createAnimal]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {!createAnimal ? (
          <>
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
                loading={loading}
                className={styles.table}
                dataSource={tableData.data}
                rowClassName={styles.tableRow}
                headerClassName={styles.headerRow}
                pagination={{
                  total: tableData.records,
                  pageSize: tableFilter.size,
                  showSizeChanger: true,
                  locale: { items_per_page: "" },
                  pageSizeOptions: ["10", "20", "30", "40", "50"],
                }}
                onChange={({ current, pageSize }) =>
                  setTableFilter(() => ({ page: current, size: pageSize }))
                }
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
          </>
        ) : (
          <CreateAnimal setCreateAnimal={setCreateAnimal} />
        )}
      </div>
    </div>
  );
}

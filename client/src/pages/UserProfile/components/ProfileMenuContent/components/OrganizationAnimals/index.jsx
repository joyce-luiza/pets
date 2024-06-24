import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import moment from 'moment';
import { Button, Input, Table, Tooltip, Select, Space, Flex } from 'antd';
import Column from 'antd/es/table/Column';
import CreateAnimal from './components/CreateAnimal';
import UpdateAnimal from './components/UpdateAnimal';
import ViewAnimal from './components/ViewAnimal';
import DeleteAnimal from './components/DeleteAnimal';
import { axiosRequest } from '../../../../../../utils/axiosRequest';
import showMessage from '../../../../../../utils/Message';
import {
  ANIMAL_SEX,
  ANIMAL_SIZES,
  ANIMAL_TYPES,
  ANIMAL_AGE_GROUPS,
} from '../../../../../../constants';

const { Search } = Input;
const { Option } = Select;

export default function OrganizationAnimals({ setContent, content }) {
  const [loading, setLoading] = useState(false);
  const [createAnimal, setCreateAnimal] = useState(false);
  const [updateAnimal, setUpdateAnimal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [viewAnimal, setViewAnimal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableFilter, setTableFilter] = useState({
    page: 1,
    size: 10,
    search: '',
    typeFilter: [],
    sexFilter: [],
    sizeFilter: [],
    ageFilter: [],
    statusFilter: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filterAnimation, setFilterAnimation] = useState('');

  const getLifetime = (date) => {
    const inputDate = moment(date);
    const currentDate = moment();
    const years = currentDate.diff(inputDate, 'years');
    const months = currentDate.diff(inputDate, 'months');
    const days = currentDate.diff(inputDate, 'days');

    if (years >= 1) {
      return `${years} ${years > 1 ? 'anos' : 'ano'}`;
    } else if (months >= 1) {
      const exactMonths = months % 12;
      return `${exactMonths} ${exactMonths > 1 ? 'meses' : 'mês'}`;
    } else {
      return `${days} ${days > 1 ? 'dias' : 'dia'}`;
    }
  };

  const handleGetTableData = async () => {
    try {
      //setLoading(true);
      const animals = await axiosRequest({
        method: 'GET',
        authenticated: true,
        params: {
          ...tableFilter,
          conditions: {
            search: tableFilter.search || '',
            typeFilter: tableFilter.typeFilter,
            sexFilter: tableFilter.sexFilter,
            sizeFilter: tableFilter.sizeFilter,
            ageFilter: tableFilter.ageFilter,
            statusFilter: tableFilter.statusFilter,
          },
        },
        path: '/animals/table',
      });

      if ('data' in animals && animals.data.length > 0) {
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
                  onClick={() => handleViewAnimal(animal)}
                >
                  <i className="ri-search-eye-line"></i>
                </Button>
              </Tooltip>
              <Tooltip title="Editar">
                <Button
                  size="middle"
                  type="link"
                  onClick={() => handleEditAnimal(animal)}
                >
                  <i className="ri-edit-line"></i>
                </Button>
              </Tooltip>
              <Tooltip title="Excluir">
                <Button
                  size="middle"
                  type="link"
                  onClick={() => handleDeleteAnimal(animal)}
                >
                  <i className="ri-delete-bin-line"></i>
                </Button>
              </Tooltip>
            </div>
          ),
        }));
        setTableData({
          data: formattedAnimals,
          records: animals.records,
        });
      } else {
        setTableData({
          data: [],
          records: 0,
        });
      }

      setLoading(false);
    } catch (error) {
      setTableData({
        data: [],
        records: 0,
      });
      showMessage('error', error.message || error);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      width: 130,
    },
    {
      title: 'Sexo',
      dataIndex: 'sex',
      key: 'sex',
      width: 130,
    },
    {
      title: 'Porte',
      dataIndex: 'size',
      key: 'size',
      width: 130,
    },
    {
      title: 'Idade',
      dataIndex: 'age',
      key: 'age',
      width: 130,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
    },
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      width: 200,
    },
  ];

  const handleEditAnimal = (animal) => {
    setSelectedAnimal(animal);
    setUpdateAnimal(true);
  };

  const handleViewAnimal = (animal) => {
    setSelectedAnimal(animal);
    setViewAnimal(true);
  };

  const handleDeleteAnimal = (animal) => {
    setSelectedAnimal(animal);
    setIsDeleteModalOpen(true);
  };

  const onSearch = (value) => {
    setTableFilter((prevFilter) => ({
      ...prevFilter,
      search: value,
      //page: 1, // Reseta a página para 1 ao fazer uma nova pesquisa
    }));
  };

  const handleFilterChange = (value, filterType) => {
    setTableFilter((prevFilter) => ({
      ...prevFilter,
      [filterType]: value,
      //page: 1, // Reseta a página para 1 ao aplicar o filtro
    }));
  };

  const toggleFilters = () => {
    if (showFilters) {
      setFilterAnimation('animate__slideInDown');
      setTimeout(() => {
        setShowFilters(false);
      }, 300); // Duração da animação
    } else {
      setShowFilters(true);
      setFilterAnimation('animate__slideOutUp');
    }
  };

  useEffect(() => {
    handleGetTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableFilter, createAnimal, updateAnimal, viewAnimal, isDeleteModalOpen]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {!createAnimal && !updateAnimal && !viewAnimal ? (
          !loading ? (
            <>
              <h2 className={styles.title}>Animais</h2>
              <section className={styles.actions}>
                <Search
                  className={styles.searchInput}
                  placeholder="Pesquise pelo nome do animal"
                  loading={false}
                  onSearch={onSearch}
                />
                <Button
                  size="middle"
                  type="primary"
                  onClick={() => setCreateAnimal(true)}
                >
                  Cadastrar animal
                </Button>
              </section>

              <Tooltip title="Mostrar filtros" className={styles.filterButton}>
                <i
                  className={`ri-filter-line ri-xl ${styles.buttonColor}`}
                  onClick={toggleFilters}
                ></i>
                <span className={styles.buttonColor}>Filtros</span>
              </Tooltip>

              {showFilters && (
                <div className={`animate__animated ${filterAnimation}`}>
                  <Space direction="horizontal" size={24}>
                    <Flex gap={24}>
                      <div className={styles.filtersContainer}>
                        <label>Tipo</label>
                        <Select
                          mode="multiple"
                          style={{ width: 200 }}
                          className={styles.filterSelect}
                          placeholder="Selecione o tipo"
                          value={tableFilter.typeFilter}
                          onChange={(value) =>
                            handleFilterChange(value, 'typeFilter')
                          }
                          allowClear
                        >
                          {Object.keys(ANIMAL_TYPES).map((key) => (
                            <Option key={key} value={key}>
                              {ANIMAL_TYPES[key]}
                            </Option>
                          ))}
                        </Select>
                      </div>
                      <div className={styles.filtersContainer}>
                        <label>Sexo</label>
                        <Select
                          mode="multiple"
                          style={{ width: 200 }}
                          className={styles.filterSelect}
                          placeholder="Selecione o sexo"
                          value={tableFilter.sexFilter}
                          onChange={(value) =>
                            handleFilterChange(value, 'sexFilter')
                          }
                          allowClear
                        >
                          {Object.keys(ANIMAL_SEX).map((key) => (
                            <Option key={key} value={key}>
                              {ANIMAL_SEX[key]}
                            </Option>
                          ))}
                        </Select>
                      </div>
                      <div className={styles.filtersContainer}>
                        <label>Porte</label>
                        <Select
                          mode="multiple"
                          style={{ width: 200 }}
                          className={styles.filterSelect}
                          placeholder="Selecione o porte"
                          value={tableFilter.sizeFilter}
                          onChange={(value) =>
                            handleFilterChange(value, 'sizeFilter')
                          }
                          allowClear
                        >
                          {Object.keys(ANIMAL_SIZES).map((key) => (
                            <Option key={key} value={key}>
                              {ANIMAL_SIZES[key]}
                            </Option>
                          ))}
                        </Select>
                      </div>
                      <div className={styles.filtersContainer}>
                        <label>Idade</label>
                        <Select
                          mode="multiple"
                          style={{ width: 200 }}
                          className={styles.filterSelect}
                          placeholder="Selecione a idade"
                          value={tableFilter.ageFilter}
                          onChange={(value) =>
                            handleFilterChange(value, 'ageFilter')
                          }
                          allowClear
                        >
                          {Object.keys(ANIMAL_AGE_GROUPS).map((key) => (
                            <Option key={key} value={key}>
                              {ANIMAL_AGE_GROUPS[key]}
                            </Option>
                          ))}
                        </Select>
                      </div>
                      <div className={styles.filtersContainer}>
                        <label>Status</label>
                        <Select
                          mode="multiple"
                          style={{ width: 200 }}
                          className={styles.filterSelect}
                          placeholder="Selecione o status"
                          value={tableFilter.statusFilter}
                          onChange={(value) =>
                            handleFilterChange(value, 'statusFilter')
                          }
                          allowClear
                        >
                          <Option value="ATIVO">ATIVO</Option>
                          <Option value="INATIVO">INATIVO</Option>
                        </Select>
                      </div>
                    </Flex>
                  </Space>
                </div>
              )}

              <section
                className={styles.tableData}
                style={{ minWidth: 'max-content' }}
              >
                <Table
                  loading={loading}
                  className={styles.table}
                  dataSource={tableData.data}
                  rowClassName={styles.tableRow}
                  pagination={{
                    total: tableData.records,
                    pageSize: tableFilter.size,
                    showSizeChanger: true,
                    locale: { items_per_page: '' },
                    pageSizeOptions: ['10', '20', '30', '40', '50'],
                  }}
                  onChange={({ current, pageSize }) =>
                    setTableFilter({ page: current, size: pageSize })
                  }
                  onRow={(animal) => {
                    return {
                      // onDoubleClick: () => handleViewAnimal(animal),
                    };
                  }}
                >
                  {columns.map(({ title, key, dataIndex, width }) => (
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
            <p>Carregando...</p>
          )
        ) : updateAnimal ? (
          <UpdateAnimal
            setUpdateAnimal={setUpdateAnimal}
            animalData={selectedAnimal}
          />
        ) : viewAnimal ? (
          <ViewAnimal
            setViewAnimal={setViewAnimal}
            animalData={selectedAnimal}
            getLifetime={getLifetime}
          />
        ) : (
          <CreateAnimal setCreateAnimal={setCreateAnimal} />
        )}
        <DeleteAnimal
          setIsModalOpen={setIsDeleteModalOpen}
          animalData={selectedAnimal}
          open={isDeleteModalOpen}
          handleGetTableData={handleGetTableData}
        />
      </div>
    </div>
  );
}

import { useLocation, useNavigate } from "react-router-dom";
import { getQueryParams } from "../../utils/getQueryParams";
import { useEffect, useState } from "react";
import { Checkbox } from "antd";
import styles from "./styles.module.css";
import {
  ANIMAL_AGE_GROUPS,
  ANIMAL_COLORS,
  ANIMAL_SEX,
  ANIMAL_SIZES,
  ANIMAL_TYPES,
} from "../../constants";
import AnimalListCard from "./components/AnimalListCard";
import { axiosRequest } from "../../utils/axiosRequest";
import showMessage from "../../utils/Message";
import { generateQueryParams } from "../../utils/generateQueryParamsByJson";

export default function AnimalsList() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryObject = getQueryParams(location.search);
  const [animals, setAnimals] = useState({
    data: [],
    records: 0,
  });
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({
    types: queryObject?.types ? queryObject?.types.split(",") : [],
    ageGroups: queryObject?.ageGroups ? queryObject?.ageGroups.split(",") : [],
    states: queryObject?.states ? queryObject?.states.split(",") : [],
    sex: queryObject?.sex ? queryObject?.sex.split(",") : [],
    colors: queryObject?.colors ? queryObject?.colors.split(",") : [],
    sizes: queryObject?.sizes ? queryObject?.sizes.split(",") : [],
  });

  const handleFilter = (key, values) => {
    let newFilterValues = values;
    const newFilter = { ...filter, [key]: newFilterValues };
    setFilter(() => newFilter);

    let queryParams = ``;

    if (Object.keys(newFilter).length) {
      const filters = Object.keys(newFilter).map((key, index) => ({
        index,
        value: newFilter[key],
        key,
      }));

      for (const obj of filters) {
        if (obj.value.length > 0)
          queryParams += queryParams
            ? `&${obj.key}=${obj.value}`
            : `?${obj.key}=${obj.value}`;
      }
    }

    navigate({ search: queryParams });
  };

  const getAnimals = async () => {
    try {
      setLoading(true);
      const params = generateQueryParams(filter);
      const result = await axiosRequest({
        path: `/animals/card/list${params}&page=1&size=10`,
        type: "default",
      });
      if ("data" in result) {
        setAnimals({
          data: result.data,
          records: result.records,
        });
      } else {
        setAnimals({
          data: result,
          records: result.length,
        });
      }
      setLoading(false);
    } catch (error) {
      setAnimals({
        data: [],
        records: 0,
      });
      showMessage("error", "Erro ao realizar o filtro");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnimals();
  }, [filter]); // Re-fetch data whenever filters change

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Filtros</h3>

        <section className={styles.filterGroupsContainer}>
          <div className={styles.filterGroup}>
            <Checkbox.Group
              name="types"
              style={{ width: "100%" }}
              onChange={(options) => {
                handleFilter("types", options);
              }}
              value={filter.types}
            >
              <div className={styles.groupOptions}>
                <h4 className={styles.groupTitle}>Tipo</h4>
                {Object.keys(ANIMAL_TYPES).map((key) => (
                  <Checkbox value={key} key={key}>
                    <span className={styles.option}>{ANIMAL_TYPES[key]}</span>
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          </div>

          <div className={styles.filterGroup}>
            <Checkbox.Group
              name="ageGroups"
              style={{ width: "100%" }}
              onChange={(options) => {
                handleFilter("ageGroups", options);
              }}
              value={filter.ageGroups}
            >
              <div className={styles.groupOptions}>
                <h4 className={styles.groupTitle}>Idade</h4>
                {Object.keys(ANIMAL_AGE_GROUPS).map((key) => (
                  <Checkbox value={key} key={key}>
                    <span className={styles.option}>
                      {ANIMAL_AGE_GROUPS[key]}
                    </span>
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          </div>

          <div className={styles.filterGroup}>
            <Checkbox.Group
              name="sex"
              style={{ width: "100%" }}
              onChange={(options) => {
                handleFilter("sex", options);
              }}
              value={filter.sex}
            >
              <div className={styles.groupOptions}>
                <h4 className={styles.groupTitle}>Sexo</h4>
                {Object.keys(ANIMAL_SEX).map((key) => (
                  <Checkbox value={key} key={key}>
                    <span className={styles.option}>{ANIMAL_SEX[key]}</span>
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          </div>

          <div className={styles.filterGroup}>
            <Checkbox.Group
              name="colors"
              style={{ width: "100%" }}
              onChange={(options) => {
                handleFilter("colors", options);
              }}
              value={filter.colors}
            >
              <div className={styles.groupOptions}>
                <h4 className={styles.groupTitle}>Cor</h4>
                {Object.keys(ANIMAL_COLORS).map((key) => (
                  <Checkbox value={key} key={key}>
                    <span className={styles.option}>{ANIMAL_COLORS[key]}</span>
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          </div>

          <div className={styles.filterGroup}>
            <Checkbox.Group
              name="sizes"
              style={{ width: "100%" }}
              onChange={(options) => {
                handleFilter("sizes", options);
              }}
              value={filter.sizes}
            >
              <div className={styles.groupOptions}>
                <h4 className={styles.groupTitle}>Porte</h4>
                {Object.keys(ANIMAL_SIZES).map((key) => (
                  <Checkbox value={key} key={key}>
                    <span className={styles.option}>{ANIMAL_SIZES[key]}</span>
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          </div>
        </section>
      </div>

      <section className={styles.listContainer}>
        <h1 className={styles.topFilter}>{animals.records} disponíveis</h1>

        <div className={styles.list}>
          {!loading && animals.data.length > 0 ? (
            animals.data.map((animal) => (
              <AnimalListCard key={animal.id} {...animal} />
            ))
          ) : !loading ? (
            <p>Nenhum animal encontrado.</p>
          ) : (
            <p>Carregando...</p>
          )}
        </div>
      </section>
    </div>
  );
}

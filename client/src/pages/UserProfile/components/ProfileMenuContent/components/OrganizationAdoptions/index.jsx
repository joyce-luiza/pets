import styles from "./styles.module.css";
import moment from "moment";
import { Button, Input, Table } from "antd";
import { Tooltip } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { axiosRequest } from "../../../../../../utils/axiosRequest";
import showMessage from "../../../../../../utils/Message";
import { ANIMAL_TYPES, RESULTS } from "../../../../../../constants";
import AdoptionDetails from "./AdoptionDetails";
const { Search } = Input;

export default function OrganizationAdoptions() {
    const [loading, setLoading] = useState(false);
    const [selectedAdoption, setSelectedAdoption] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [tableFilter, setTableFilter] = useState({
        page: 1,
        size: 10,
    });

    const handleGetTableData = async () => {
        try {
            setLoading(true);
            const adoptions = await axiosRequest({
                method: "GET",
                authenticated: true,
                params: tableFilter,
                path: "/adoption/table",
            });

            if ("data" in adoptions) {
                const formattedAdoptions = adoptions.data.map((adoption) => ({
                    key: adoption.id,
                    animalName: adoption.animalName,
                    type: ANIMAL_TYPES[adoption.type],
                    adopterFirstName: adoption.adopterFirstName,
                    adopterLastName: adoption.adopterLastName,
                    adopterEmail: adoption.adopterEmail,
                    result: RESULTS[adoption.result],
                    status: adoption.status,
                    createdAt: moment(adoption.createdAt).format("DD/MM/YYYY"),
                    actions: (
                        <div className={styles.tableRowActions}>
                            <Tooltip title="Ver detalhes">
                                <Button
                                    size="middle"
                                    type="link"
                                    onClick={() =>
                                        setSelectedAdoption(adoption)
                                    }
                                >
                                    <i className="ri-search-eye-line"></i>
                                </Button>
                            </Tooltip>
                        </div>
                    ),
                }));
                setTableData(() => ({
                    data: formattedAdoptions,
                    records: adoptions.records,
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
            title: "Pet",
            dataIndex: "animalName",
            key: "animalName",
            width: 200,
        },
        {
            title: "Tipo",
            dataIndex: "type",
            key: "type",
            width: 130,
        },
        {
            title: "Nome do adotante",
            dataIndex: "adopterFirstName",
            key: "fullName",
            width: 200,
        },

        {
            title: "Email do adotante",
            dataIndex: "adopterEmail",
            key: "adopterEmail",
            width: 200,
        },
        {
            title: "Status",
            dataIndex: "result",
            key: "result",
            width: 130,
        },
        {
            title: "Data de início",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 130,
        },
        {
            title: "",
            dataIndex: "actions",
            key: "actions",
            width: 100,
        },
    ];

    useEffect(() => {
        handleGetTableData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableFilter, selectedAdoption]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {!selectedAdoption ? (
                    <>
                        <h2 className={styles.title}>Adoções</h2>
                        <section className={styles.actions}>
                            <Search
                                className={styles.searchInput}
                                placeholder="Pesquise pelo nome do animal ou adotante"
                                loading={false}
                                onSearch={() => console.log("foi")}
                            />
                        </section>

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
                                    pageSizeOptions: [
                                        "10",
                                        "20",
                                        "30",
                                        "40",
                                        "50",
                                    ],
                                }}
                                onChange={({ current, pageSize }) =>
                                    setTableFilter(() => ({
                                        page: current,
                                        size: pageSize,
                                    }))
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
                                    columns.map(
                                        ({ title, key, dataIndex, width }) => {
                                            let renderFunction;
                                            if (key === "fullName") {
                                                renderFunction = (
                                                    text,
                                                    record
                                                ) =>
                                                    `${record.adopterFirstName} ${record.adopterLastName}`;
                                            }
                                            return (
                                                <Column
                                                    title={
                                                        <span
                                                            className={
                                                                styles.tableColumnTitle
                                                            }
                                                        >
                                                            {title}
                                                        </span>
                                                    }
                                                    dataIndex={dataIndex}
                                                    key={key}
                                                    width={width}
                                                    render={renderFunction}
                                                />
                                            );
                                        }
                                    )}
                            </Table>
                        </section>
                    </>
                ) : (
                    <AdoptionDetails
                        adoptionData={selectedAdoption}
                        onBack={() => setSelectedAdoption(null)}
                    />
                )}
            </div>
        </div>
    );
}

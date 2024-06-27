import styles from "./styles.module.css";
import moment from "moment";
import { Button, Input, Table, Tooltip, Tabs } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { axiosRequest } from "../../../../../../utils/axiosRequest";
import showMessage from "../../../../../../utils/Message";
import { RESULTS } from "../../../../../../constants";
import ConfirmVisit from "../OrganizationVisits/components/ConfirmVisit";
import VisitDetails from "../OrganizationVisits/components/VisitDetails";
import "remixicon/fonts/remixicon.css";
const { Search } = Input;
const { TabPane } = Tabs;

export default function AdopterVisits({ user }) {
    const [loading, setLoading] = useState(false);
    const [selectedVisit, setSelectedVisit] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [tableRequestedByAdopter, setTableRequestedByAdopter] = useState([]);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [tableFilter, setTableFilter] = useState({
        page: 1,
        size: 10,
    });

    const handleGetTableData = async () => {
        try {
            setLoading(true);
            const visits = await axiosRequest({
                method: "GET",
                authenticated: true,
                params: tableFilter,
                path: "/visit/table",
            });

            if ("data" in visits) {
                const formattedVisits = visits.data.map((visit) => ({
                    key: visit.id,
                    organizationId: visit.organizationId,
                    organizationName: visit.organizationName,
                    appointmentDateTime: moment(
                        visit.appointmentDateTime
                    ).format("DD/MM/YYYY HH:MM"),
                    requesterId: visit.requesterId,
                    result: RESULTS[visit.result],
                    status: visit.status,
                    createdAt: moment(visit.createdAt).format("DD/MM/YYYY"),
                    actions: (
                        <div className={styles.tableRowActions}>
                            <Tooltip title="Ver detalhes">
                                <Button
                                    size="middle"
                                    type="link"
                                    onClick={() => {
                                        setSelectedVisit(visit);
                                        setIsDetailsModalOpen(true);
                                    }}
                                >
                                    <i className="ri-search-eye-line"></i>
                                </Button>
                            </Tooltip>
                            {visit.requesterId !== user.id && (
                                <Tooltip title="Editar">
                                    <Button
                                        size="middle"
                                        type="link"
                                        onClick={() => {
                                            setSelectedVisit(visit);
                                            setIsEditModalOpen(true);
                                        }}
                                    >
                                        <i className="ri-edit-line"></i>
                                    </Button>
                                </Tooltip>
                            )}
                        </div>
                    ),
                }));

                const visitsRequestedByAdopter = formattedVisits.filter(
                    (visit) => visit.requesterId === user.id
                );
                const visitsRequestedByOrganization = formattedVisits.filter(
                    (visit) => visit.requesterId !== user.id
                );

                setTableData({
                    data: visitsRequestedByOrganization,
                    records: visits.records,
                });
                setTableRequestedByAdopter({
                    data: visitsRequestedByAdopter,
                    records: visits.records,
                });
            }
            setLoading(false);
        } catch (error) {
            setTableData([]);
            setTableRequestedByAdopter([]);
            showMessage("error", error);
            setLoading(false);
        }
    };

    const columns = [
        {
            title: "Nome da organização",
            dataIndex: "organizationName",
            key: "organizationName",
            width: 200,
        },
        {
            title: "Data marcada",
            dataIndex: "appointmentDateTime",
            key: "appointmentDateTime",
            width: 130,
        },
        {
            title: "Status",
            dataIndex: "result",
            key: "result",
            width: 130,
        },
        {
            title: "",
            dataIndex: "actions",
            key: "actions",
            width: 100,
        },
    ];

    const items = [
        {
            key: "1",
            label: "Solicitadas por você",
            children: (
                <Table
                    loading={loading}
                    className={styles.table}
                    dataSource={tableRequestedByAdopter.data}
                    rowClassName={styles.tableRow}
                    headerClassName={styles.headerRow}
                    pagination={{
                        total: tableRequestedByAdopter.records,
                        pageSize: tableFilter.size,
                        showSizeChanger: true,
                        locale: { items_per_page: "" },
                        pageSizeOptions: ["10", "20", "30", "40", "50"],
                    }}
                    onChange={({ current, pageSize }) =>
                        setTableFilter(() => ({
                            page: current,
                            size: pageSize,
                        }))
                    }
                >
                    {columns.map(({ title, key, dataIndex, width }) => {
                        let renderFunction;
                        if (key === "adopterFirstName") {
                            renderFunction = (text, record) =>
                                `${record.adopterFirstName} ${record.adopterLastName}`;
                        }
                        return (
                            <Column
                                title={
                                    <span className={styles.tableColumnTitle}>
                                        {title}
                                    </span>
                                }
                                dataIndex={dataIndex}
                                key={key}
                                width={width}
                                render={renderFunction}
                            />
                        );
                    })}
                </Table>
            ),
        },
        {
            key: "2",
            label: "Solicitadas por organizações",
            children: (
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
                        setTableFilter(() => ({
                            page: current,
                            size: pageSize,
                        }))
                    }
                >
                    {columns.map(({ title, key, dataIndex, width }) => {
                        let renderFunction;
                        if (key === "adopterFirstName") {
                            renderFunction = (text, record) =>
                                `${record.adopterFirstName} ${record.adopterLastName}`;
                        }
                        return (
                            <Column
                                title={
                                    <span className={styles.tableColumnTitle}>
                                        {title}
                                    </span>
                                }
                                dataIndex={dataIndex}
                                key={key}
                                width={width}
                                render={renderFunction}
                            />
                        );
                    })}
                </Table>
            ),
        },
    ];

    useEffect(() => {
        handleGetTableData();
    }, [tableFilter, selectedVisit]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2 className={styles.title}>Visitas</h2>
                <section className={styles.actions}>
                    <Search
                        className={styles.searchInput}
                        placeholder="Pesquise pelo nome do adotante"
                        loading={false}
                        onSearch={() => console.log("foi")}
                    />
                </section>

                <Tabs defaultActiveKey="1" items={items} />

                <VisitDetails
                    visit={selectedVisit}
                    open={isDetailsModalOpen}
                    setIsModalOpen={setIsDetailsModalOpen}
                />
                <ConfirmVisit
                    visit={selectedVisit}
                    open={isEditModalOpen}
                    setIsModalOpen={setIsEditModalOpen}
                />
            </div>
        </div>
    );
}

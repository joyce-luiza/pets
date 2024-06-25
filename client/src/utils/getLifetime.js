import moment from "moment";

export function getLifetime(date) {
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
}

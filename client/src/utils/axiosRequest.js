import axios from "axios";

/**
 * @typedef {'get' | 'post' | 'put' | 'delete'} HttpMethod
 */

/**
 * @typedef {Object} AxiosParams
 * @property {HttpMethod} [method=""]
 * @property {string} [path=""]
 * @property {Object} [body={}]
 * @property {string} [params=""]
 */

/**
 * Função para realizar requisições HTTP utilizando Axios.
 * @param {AxiosParams} params
 * @returns {Promise<Object> | Promise<boolean>}
 */
export async function axiosRequest({
    method = "get",
    path = "",
    body = {},
    params = {},
}) {
    try {
        const { data } = await axios({
            method,
            url: path ? `${process.env.REACT_APP_API_PATH}${path}` : "",
            data: body,
            params: params,
        });
        return data;
    } catch (error) {
        console.error("Erro na requisição:", error.message);
        return false;
    }
}

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
 * @property {boolean} [basePath=true]
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
    basePath = true,
}) {
    try {
        const { data } = await axios({
            method,
            url:
                path && basePath
                    ? `${process.env.REACT_APP_API_PATH}${path}`
                    : `${path}`,
            data: body,
            params: params,
        });
        return data;
    } catch (error) {
        throw error.response.data;
    }
}

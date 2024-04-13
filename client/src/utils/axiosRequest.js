import axios from "axios";

/**
 * @typedef {'GET' | 'POS' | 'PUT' | 'DELETE'} HttpMethod
 */

/**
 * @typedef {Object} AxiosParams
 * @property {HttpMethod} [method=""]
 * @property {string} [path=""]
 * @property {Object} [body={}]
 * @property {string} [params=""]
 * @property {boolean} [basePath=true]
 * @property {boolean} [authenticated=true]
 */

/**
 * Função para realizar requisições HTTP utilizando Axios.
 * @param {AxiosParams} params
 * @returns {Promise<Object> | Promise<boolean>}
 */
export async function axiosRequest({
  method = "GET",
  path = "",
  body = {},
  params = {},
  basePath = true,
  authenticated = false,
}) {
  try {
    let headers = {};

    if (authenticated && localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      headers["Authorization"] = `Bearer ${user.token}`;
    }

    const res = await axios({
      method,
      url:
        path && basePath
          ? `${process.env.REACT_APP_API_PATH}${path}`
          : `${path}`,
      data: body,
      params: params,
      headers,
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
}

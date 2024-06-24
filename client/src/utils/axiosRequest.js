import axios from "axios";

/**
 * @typedef {'GET' | 'POST' | 'PUT' | 'DELETE'} HttpMethod
 * @typedef {'default' | 'multipart'} RequestType
 */

/**
 * @typedef {Object} AxiosParams
 * @property {HttpMethod} [method=""]
 * @property {string} [path=""]
 * @property {Object | FormData} [body={}]
 * @property {string} [params=""]
 * @property {boolean} [basePath=true]
 * @property {boolean} [authenticated=false]
 * @property {RequestType} [type='default']
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
  type = "default",
}) {
  try {
    let headers = {};

    if (authenticated && localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      headers["Authorization"] = `Bearer ${user.token}`;
    }

    if (type === "multipart") {
      headers["Content-Type"] = "multipart/form-data";
      if (typeof body === "object" && !(body instanceof FormData)) {
        const formData = new FormData();
        for (const key in body) {
          if (Array.isArray(body[key])) {
            body[key].forEach((item) => {
              formData.append(key, item);
            });
          } else {
            formData.append(key, body[key]);
          }
        }
        body = formData;
      }
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
    console.log(error);
    throw error.response.data;
  }
}

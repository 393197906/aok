const axios = require("axios");

function fetch(url, data, method) {
    let option = {
        method,
        url,
        data
        // headers: {
        //   'Authorization': getToken()
        // },
        // validateStatus: function (status) {
        //   return true
        // },
    }
    if (method === "get") {
        option = { ...option,
            params: { ...data
            }
        }
    }
    return axios(option).then(result => {
        const {
            data,
            status,
            statusText
        } = result
        if (status > 400) {
            throw {
                status,
                message: statusText
            }
        }
        return data;
    }).then(data => {
        data = JSON.parse(data.toString());
        if (!data.success) {
            throw {
                status,
                message: "error"
            }
        }
        return data;
    }).then(data => ({
        data
    })).catch(err => ({
        err
    }))
}

module.exports = {
    get: (url, data = {}, load) => fetch(url, data, 'get', load)
}
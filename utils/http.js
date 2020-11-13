import queryString from 'query-string';

class Http {
    async get(url, params, options = {}) {
        const response = await fetch(`${url}?${queryString.stringify(params)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        });

        return await response.json();
    }

    async post(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        let result;

        try {
            result = await response.json();
        } catch (e) {
            result = response;
        }

        return result;
    }

    async put(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    }

    async delete(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    }
}

export default new Http();

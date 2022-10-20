export const useHttp = () => {
    const ip = 'http://94.139.252.92:8000/';
    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        try {
            const response = await fetch(`${ip}${url}`, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            throw e;
        }
    };

    return {request}
}
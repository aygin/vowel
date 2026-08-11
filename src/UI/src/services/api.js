import { BASE_API_URL } from "./consts";

export const apiCall = () => {
    const headers = new Headers();
    headers.append("Content-Type", "text/xml");

    return new Promise((resolve , reject) => {
        fetch(`${BASE_API_URL}/transcribe` , {
            method: 'POST',
            headers,
        }).then((response) => {
            if(response.ok && response.status === 200) {
                response.json().then((body) => {
                    console.log("response recieved" , body);
                    resolve(body);
                }).catch(() => {
                    console.error("error in jsoning the response!");
                    resolve({isError: true});
                })
            } else {
                console.error("request failed!", response.status);
                console.error("request failed!", response);
                resolve({isError: true});
            }
        });
    })
}

export const BASE_URL='https://photobooksapi.herokuapp.com/'
// export const BASE_URL="http://192.168.0.103:3000/"
export const post = (url: string, payload: any) => {
    return new Promise((resolve, rej) => {
        fetch(`${BASE_URL}${url}`, {
            method: 'post',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type':'application/json'
              },

        })
            .then((res) => res.json()).then(res => resolve(res))
            .catch(err => rej(err))
    })
}


export const get = (url: string) => {
    return new Promise((resolve, rej) => {
        fetch(`${BASE_URL}${url}`)
            .then((res) => res.json())
            .then(res => resolve(res))
            .catch(err => rej(err))
    })
}
const FetchHelper = {
    base : 'http://127.0.0.1:8000/api',
    get : async (url, params) => {
            const token = localStorage.getItem('token')
            if(!token){
                window.location.href = '#login'
            }
            params['token'] = token;
        url = FetchHelper.base + "/" + url + "?" + new URLSearchParams(params).toString();
        const response = await fetch(FetchHelper.base + url);
        const data = await response.json();
        return data;
    },
    post: async (url,body) => {
         const token = localStorage.getItem('token')
         if(!token){
            window.location.href = '#login'
         }
         url = FetchHelper.base + "/" + url + '?token=' + token
         const response = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body)
         });
         const data = await response.json();
         return data;
    }
}

export default FetchHelper
const authentication = async()=>{
    const url = "https://ce.judge0.com/authorize";
    const options = {
    method: 'POST',
    headers: {
        "X-Auth-User": "a1133bc6-a0f6-46bf-a2d8-6157418c6fe2"
    }
    };
    fetch(url, options)
    .then(resp=>resp.text())
    .then(res=>console.log(res))
    .catch (error=>console.error("error",error))
}
authentication();
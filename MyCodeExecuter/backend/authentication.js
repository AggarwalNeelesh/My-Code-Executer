const authentication = async()=>{
    const url = "https://ce.judge0.com/authenticate";
    const options = {
    method: 'POST',
    headers: {
        "X-Auth-Token": "f6583e60-b13b-4228-b554-2eb332ca64e7"
    }
    };
    try {
        // response = await 
        fetch(url, options).then((resp)=>{
            console.log(resp);
            resp.text().then((res)=>{
                console.log(res);
            })
        });
    } catch (error) {
        console.error("error",error);
    }
}
authentication();


const signin = async(user)=>{
    try{
        const response = await fetch('/auth/signin/',{
            method: 'POST',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        return await response.json();

    } catch(err){console.log(err)}
}

const signout = async()=>{
    try{
        const response = await fetch('/auth/signout',{
            method: 'GET',
        })
        return await response.json();
    }catch(err){ console.log(err) }
}

export {signin, signout}
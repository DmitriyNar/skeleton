const getErrorMessage =(err)=>{
    let message='';
    if(err.code){
        switch(err.code){
            case '11001':
            case '11001':
                message = getUniqueErrorMessage(err);
                break;
            default:
                message = "Something goes wrong"; 
        }
    }else{
        for (const errName in err.errors){
            if(err.errors[errName].message)
            message = err.errors[err.Name].message;
        }
    }

    return message
}

const getUniqueErrorMessage = (err) => {
   let output;
    try{
        let fieldname;
        fieldname = err.message.substring(err.message.lastIndexOf('.$') + 2,
        err.message.lastIndexOf('_1'))
        output = fieldname.charAt(0).toUpperCase() + fieldname.slice(1) + 'already exists';
    }catch(ex){
        output = "Unique field alredy exists";
    }
    return output;
    }


export default getErrorMessage
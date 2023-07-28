import React from 'react'


function Alert(props) {
  const caps =(text)=>{
     return(text.charAt(0).toUpperCase(0)+text.slice(1));
  }
  return (
    props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        {caps(props.alert.msg)}
    </div>
  )
}

export default Alert
import React, { useContext } from 'react'
import alertContext from "../context/alert/alertContext";


function Alert(props) {
  const { message, type } = useContext(alertContext).alert;
  console.log("object")
  console.log(message, type)
  return (
    <>
      <div style={{height: "50px"}}>
        {message &&

          <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
            {message}
          </div>

        }</div>
    </>
  )
}

export default Alert

import React, { useState } from 'react'
import AlertContext from './alertContext';

const AlertState = (props) => {
  const [alert, setalert] = useState({ message: null, type: null });

  const showalert = (message, type) => {
    setalert({
      message,
      type
    })
    setTimeout(() => {
      setalert({ message: null, type: null })
    }, 2000);
  }
  console.log(alert)
  return (
    <AlertContext.Provider value={{ alert, showalert }}>
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState

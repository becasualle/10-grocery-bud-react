import React, { useEffect } from 'react'

const Alert = ({ msg, type, removeAlert, list }) => {
  // each time we change list - removeAlert after 3 sec
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);


  return (
    // change background color depending on type
    <p className={`alert alert-${type}`}> {msg} </p>
  )
}

export default Alert

import './NotFound.css'

import React from 'react'

const NotFound = () => {
  return (
    <div className='notfound-page'>
      <div className='notfound-content'>
        <h1 className='notfound-code'>
            404
        </h1>
        <p className='notfound-message'>
          Página não encontrada
        </p>
      </div>
    </div>
  )
}

export default NotFound
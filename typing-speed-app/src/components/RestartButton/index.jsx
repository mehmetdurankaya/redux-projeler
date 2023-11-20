import React from 'react'
import syncIcon  from '../../assets/syncIcon.svg'

const RestartButton = ({handleRestartClick}) => {
  return (
    <button className="btn btn-success d-flex justify-content-center align-items-center" onClick={handleRestartClick}>
      <img src={syncIcon} alt="Sync Icon" className='icon'/>
    </button>
  )
}

export default RestartButton
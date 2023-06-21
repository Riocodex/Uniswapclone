import React from 'react'

const ConfigModal = props => {
  return (
    <div className='modaly' onClick={props.onClose}>
        <div className='modal-content' onClick={e => e.stopPropagation()}>
            <div className='modal-body'>
                <h4 className='titleHeader'>Transaction Settings</h4>
            </div>

        </div>
    </div>
  )
}

export default ConfigModal
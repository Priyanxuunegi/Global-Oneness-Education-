import React from 'react'
import ReactDom from "react-dom" ;

const ModalOverlay = props =>{
  return (
    <div className='fixed z-50  w-screen '>
        <div>
           {props.children}
        </div>
    </div>
  )
}

const  PortalElement = document.getElementById("overlay"); 

const Modal = (props) => {

  return (
    <div className=' '>
     {ReactDom.createPortal(<ModalOverlay > {props.children} </ModalOverlay> ,  PortalElement) }
    </div>
  )
}

export default Modal
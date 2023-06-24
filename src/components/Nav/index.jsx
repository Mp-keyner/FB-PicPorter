import React from 'react'
import './index.css'

const Nav = () => {
  return (
    <>
      <div className='nav center'>
        <img src="https://raw.githubusercontent.com/Mp-keyner/PicPorter/f8a267d0f1c07e141187f68a4eda9a241b857af7/public/img/logo-ko.svg" className='logo' alt="" />
        <div className='center'>
            <h2>PicPorter</h2>
            <img src="https://raw.githubusercontent.com/Mp-keyner/PicPorter/f8a267d0f1c07e141187f68a4eda9a241b857af7/public/img/Pic.svg" alt="" />
        </div>
      <div >
        <ul className='center'>
          <li>Home</li>
          <li>About</li>
          <li>New Image</li>
        </ul>
      </div>  
      </div>
    </>
  )
}

export default Nav

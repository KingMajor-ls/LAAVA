import { useState } from 'react'

import Header from './Header'
import Sidebar from './Sidebar'


// function Layout()
const Layout = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <div style={{ paddingTop: '30px', position: 'fixed', width:'230px'}}><Sidebar  openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/></div>
        {/* {children} */}
         <div style={{ paddingTop: '60px',paddingLeft:'230px', width:'1128px' }}>{children}</div>
      </div>
      
  )
}

export default Layout
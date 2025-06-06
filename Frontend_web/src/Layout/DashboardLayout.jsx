import React from 'react'
import DashboardmainLayout from '../Good/DashboardMainLayout'
import DashboardSlider from '../Good/DashboardSideBar'
export const DashboardLayout = () => {
  return (
    <>
    <div className="h-full w-full flex">

        <DashboardSlider/>
        <DashboardmainLayout/>
        

        </div>

    {/* side bar */}
    {/* mainLayout */}
    
    </>
  )
}

export default DashboardLayout

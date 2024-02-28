import { useState } from 'react'
import '../../Styles/Dashboard.css'

import Layout from './Layout';
import Charts from './Charts';

function Dashboard() {

  return (
    <div >
      <Layout >
        <Charts />
      </Layout>
    </div>
  )
}

export default Dashboard


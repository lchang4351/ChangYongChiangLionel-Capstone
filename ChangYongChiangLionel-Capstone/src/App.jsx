import { useEffect, useState } from 'react'

import Form from './Form.jsx'
import StockList from './StockList.jsx';


function App() {
  const [stocks, setStocks] = useState([]);

  return(
    <>
      <h1>Finance Dashboard</h1>
      <Form stocks={stocks} setStocks={setStocks} />
      <h1>Stock List</h1>
      <StockList stocks={stocks} />
      
    </>
  )
}

export default App

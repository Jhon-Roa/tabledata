import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SaveProducts from  './components/SaveProducts';
import PrintProducts from './components/printProducts';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SaveProducts />} />
        <Route path='/list' element={<PrintProducts />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

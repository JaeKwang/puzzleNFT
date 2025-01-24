import Layout from './components/Layout.jsx';
import './index.css';
import HomePage from './pages/Home.jsx';
import MintPage from './pages/Mint.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return <BrowserRouter>
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />}/>
      <Route path="/mint" element={<MintPage />}/>
    </Route>
  </Routes>
  </BrowserRouter>;
}

export default App;
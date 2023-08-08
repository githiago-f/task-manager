import { AuthPage } from './pages/auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={AuthPage} path='/' />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

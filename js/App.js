import React from 'react';
//rotas
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
//componentes
import NotFound from './components/NotFound';
import FormData from './pages/FormData';
import BuinessPage from './pages/Buiness-page';
import Confirm from './pages/Confirm';
import UploadImages from './pages/UploadImages';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/buiness-center-community' element={<FormData />} />
          <Route path='/buiness-center-community/buiness' element={<BuinessPage />} />
          <Route path='/buiness-center-community/upload-image' element={<UploadImages />} />
          <Route path='/buiness-center-community/confirm' element={<Confirm />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
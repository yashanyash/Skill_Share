import React from 'react';
import { Route,Routes } from 'react-router';
import Home from './components/Home/Home';
import AddItem from './components/AddItem/AddItem';
import DisplayItem from './components/DisplayItem/DisplayItem';
import UpdateItem from './components/UpdateItem/UpdateItem';
function App() {
  return (
    <div >
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/allitem" element={<DisplayItem />} />
          <Route path="/UpdateItem/:id" element={<UpdateItem />} />
        </Routes>
      </React.Fragment>
     
    </div>
  );
}

export default App;

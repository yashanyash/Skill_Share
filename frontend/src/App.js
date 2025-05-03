import React from 'react';
import { Route,Routes } from 'react-router';
import Home from './components/Home/Home';
import AddItem from './components/AddItem/AddItem';
import DisplayItem from './components/DisplayItem/DisplayItem';
import UpdateItem from './components/UpdateItem/UpdateItem';

import AddComment from './components/AddComment/AddComment';
import DisplayComment from './components/DisplayComment/DisplayComment';
import EditComment from './components/EditComment/EditComment';

function App() {
  return (
    <div >
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/allitem" element={<DisplayItem />} />
          <Route path="/UpdateItem/:id" element={<UpdateItem />} />
          <Route path="/addComment" element={<AddComment />} />
          <Route path="/comments" element={<DisplayComment />} />
          <Route path="/editComment/:id" element={<EditComment />} />
          <Route path="/viewComment/:id" element={<EditComment />} />
        </Routes>
      </React.Fragment>
     
    </div>
  );
}

export default App;

import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './AddItem.css'

function AddItem() {
    const navigate = useNavigate();
    const [learning, setlearning] = useState({
        itemId: "",
        itemName: "",
        itemCategory: "",
        itemDescription: "",
        itemDetails: ""
    });
    const { itemId, itemName, itemCategory, itemDescription, itemDetails } = learning;

    const onInputChange = (e) => {
        setlearning({ ...learning, [e.target.name]: e.target.value });
    }

    const onsubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post("http://localhost:8080/learning", learning);
            alert("Item added successfully");
            navigate('/'); 
        } catch (error) {
            console.error("Error adding item:", error); 
            alert("Error adding item: " + (error.response?.data || error.message));
        }
    }

  return (
    <div className="add-item-container">
      <h1 className="add-item-title">Add Learning Plan</h1>
      <form className="add-item-form" id="itemForm" onSubmit={(e) => onsubmit(e)}>
        <div className="form-group">
          <label htmlFor="itemId">User Name</label>
          <input 
            className="form-control"
            type="text" 
            id="itemId" 
            name="itemId" 
            onChange={(e) => onInputChange(e)} 
            value={itemId} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="itemName">Learning Plan Name</label>
          <input 
            className="form-control"
            type="text" 
            id="itemName" 
            name="itemName" 
            onChange={(e) => onInputChange(e)} 
            value={itemName} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="itemCategory">Learning Plan Category</label>
          <select 
            className="form-control"
            id="itemCategory" 
            name="itemCategory" 
            onChange={(e) => onInputChange(e)} 
            value={itemCategory} 
            required
          >
            <option value="" disabled>Select Category</option>
            <option value="English">English</option>
            <option value="Maths">Maths</option>
            <option value="Science">Science</option>
            <option value="ICT">ICT</option>
            <option value="History">History</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="itemDescription">Description</label>
          <textarea 
            className="form-control"
            id="itemDescription" 
            name="itemDescription" 
            onChange={(e) => onInputChange(e)} 
            value={itemDescription} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="itemDetails"> Details</label>
          <textarea 
            className="form-control"
            id="itemDetails" 
            name="itemDetails" 
            onChange={(e) => onInputChange(e)} 
            value={itemDetails} 
            required 
          />
        </div>

        <button type="submit" className="submit-btn">Submit Learning Plan</button>
      </form>
    </div>
  )
}

export default AddItem;
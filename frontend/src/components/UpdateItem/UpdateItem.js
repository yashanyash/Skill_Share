import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router'

function UpdateItem () {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        itemId: "",
        itemName: "",
        itemCategory: "",
        itemDescription: "",
        itemDetails: "" 
    });
    useEffect(() => {
        const fechItemData = async() => {
            try{
                const response = await axios.get(`http://localhost:8080/learning/${id}`);
                const itemData = response.data;
                setFormData({
                    itemId: itemData.itemId || '',
                    itemName: itemData.itemName || '',
                    itemCategory: itemData.itemCategory || '',
                    itemDescription: itemData.itemDescription || '',
                    itemDetails: itemData.itemDetails || ''
                });

            }catch (err) {
                console.error('error fech data:', err);
            }
            
        };
        fechItemData();
    }, [id]);

    const onInputChange = (e) => {
        const{name,value,files} = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        })
    };

    const onsubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('itemDetails', JSON. stringify({
            itemId: formData.itemId,
            itemName: formData.itemName,
            itemCategory: formData.itemCategory,
            itemDescription: formData.itemDescription,
            itemDetails: formData.itemDetails
        }));

        try{
            const response = await axios.put(`http://localhost:8080/learning/${id}`, data);
            alert("Item updated successfully");
            window.location.href = '/allitem'; 
        }catch (err) {
            console.error('Error updating item:', err);
            alert("Error updating item: " );
        }

    }

  return (
    <div>
        
        <div className="add-item-container">
      <h1 className="add-item-title">Update Learning Plan</h1>
      <form className="add-item-form" id="itemForm" onSubmit={onsubmit}>
        <div className="form-group">
          <label htmlFor="itemId">User Name</label>
          <input 
            className="form-control"
            type="text" 
            id="itemId" 
            name="itemId" 
            onChange={onInputChange} 
            value={formData.itemId} 
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
            onChange={ onInputChange} 
            value={formData.itemName} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="itemCategory">Category</label>
          <select 
            className="form-control"
            id="itemCategory" 
            name="itemCategory" 
            onChange={onInputChange} 
            value={formData.itemCategory} 
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
            onChange={onInputChange} 
            value={formData.itemDescription} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="itemDetails">Details</label>
          <textarea 
            className="form-control"
            id="itemDetails" 
            name="itemDetails" 
            onChange={onInputChange} 
            value={formData.itemDetails} 
            required 
          />
        </div>

        <button type="submit" className="submit-btn">Update Learning Plan</button>
      </form>
    </div>
    </div>
  )
}

export default UpdateItem
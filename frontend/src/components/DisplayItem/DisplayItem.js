import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DisplayItem.css';

function DisplayItem() {
    const [learning, setlearning] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        loadlearning();
    }, []);

    const loadlearning = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:8080/learning");
            const data = await response.json();
            setlearning(data);
        } catch (error) {
            console.error("Failed to fetch learning items:", error);
            setlearning([]); 
        } finally {
            setLoading(false);
        }
    };

    const updateNavigate = (itemId) => {
        window.location.href = `/updateItem/${itemId}`;
    }

    //Delete Function
    const deleteItem = async (id) => {
        const confimationMessage = window.confirm(
            "Are you sure you want to delete this item?"
        )
        if (confimationMessage){
            try{
                await axios.delete(`http://localhost:8080/learning/${id}`);
                loadlearning();
                alert("Item deleted successfully");
            } catch (error) {
                alert("Error deleting item:" + error.message);
            }
        }
    };

    return (
        <div className="learning-container">
            <h1 className="learning-title">Learning Plans</h1>
            
            {loading ? (
                <p className="loading-message">Loading data...</p>
            ) : learning.length === 0 ? (
                <p className="no-data-message">No learning items found</p>
            ) : (
                <div className="card-container">
                    {learning.map((item, index) => (
                        <div className="item-card" key={index}>
                            <div className="card-header">
                                <h2 className="card-title">{item.itemName}</h2>
                                <span className="card-category">{item.itemCategory}</span>
                            </div>
                            <div className="card-body">
                                <div className="card-id">
                                    <strong>ID:</strong> 
                                    {item.itemId}
                                </div>
                                <div className="card-description">
                                    <strong>Description:</strong>
                                    {item.itemDescription}
                                </div>
                                <div className="card-details">
                                    <strong>Details:</strong>
                                    {item.itemDetails}
                                </div>
                            </div>
                            <div className="card-actions">
                                <button className="edit-btn" onClick={() => updateNavigate(item.id)}>
                                    Edit
                                </button>
                                <button className="delete-btn" onClick={() => deleteItem(item.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DisplayItem;
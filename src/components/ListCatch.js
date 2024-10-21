import React, { useState } from 'react';
import axios from 'axios';

const ListCatch = () => {
    const [species, setSpecies] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/fishermen/new-listing', {
                species,
                quantity: parseInt(quantity),
                price: parseFloat(price),
            });
            alert('Catch listed successfully!');
            // Reset form fields
            setSpecies('');
            setQuantity('');
            setPrice('');
        } catch (error) {
            console.error('Error listing catch:', error);
            alert('Failed to list catch. Please try again.');
        }
    };

    return (
        <div>
            <h2>List Your Catch</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Species:
                    <input type="text" value={species} onChange={(e) => setSpecies(e.target.value)} />
                </label>
                <br />
                <label>
                    Quantity:
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </label>
                <br />
                <label>
                    Price (per unit):
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                <br />
                <button type="submit">List Catch</button>
            </form>
        </div>
    );
};

export default ListCatch;

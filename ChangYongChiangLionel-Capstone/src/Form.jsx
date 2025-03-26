import { useState } from 'react'
import './form.css'

function Form() {
    const [symbol, setSymbol] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [stocks, setStocks] = useState([])

    const  handleSymbolChange = (event) => {
        setSymbol(event.target.value.toUpperCase());
    };
    const  handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };
    const  handlePriceChange = (event) => {
        setPrice(event.target.value);
    };


    return(
        <>
            <form className='form-group'>
                <input className='form-box' type="text" value={symbol} onChange={handleSymbolChange} placeholder="Stock Symbol" />
                <input className='form-box' type="text" value={quantity} onChange={handleQuantityChange} placeholder="Quantity" />
                <input className='form-box' type="text" value={price} onChange={handlePriceChange} placeholder="Purchase Price" />
                
                <button className='button'>Add Stock</button>
            </form>
            <h1>Stock List</h1>
            <p className='no-info'>No stocks added yet.</p>
        </>
    )
}

export default Form
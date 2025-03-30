import { useState } from 'react'
import './Form.css'

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


    const handleSubmit = (event) => {
        event.preventDefault(); 

        if (!symbol || !quantity || !price) {
            alert("Please fill in all fields.");
            return;
        }
        
        const newStock = { symbol, quantity, price: parseFloat(price).toFixed(2) };
        setStocks([...stocks, newStock]);

        setSymbol("");
        setQuantity("");
        setPrice("");
    };

    return(
        <>
            <form className='form-group' onSubmit={handleSubmit}>
                <input className='form-box' type="text" value={symbol} onChange={handleSymbolChange} placeholder="Stock Symbol" />
                <input className='form-box' type="number" value={quantity} onChange={handleQuantityChange} placeholder="Quantity" />
                <input className='form-box' type="number" value={price} onChange={handlePriceChange} placeholder="Purchase Price" />
                
                <button className='button'>Add Stock</button>
            </form>
            <h1>Stock List</h1>

            {stocks.length === 0 ? (
                <p className='no-info'>No Stocks To Display</p>
            ) : (
                <ul className='stocks-log'>
                    {stocks.map((stock, index) => (
                        <li className='stocks-list' key={index}>
                            {stock.symbol} , {stock.quantity} shares at ${stock.price}
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default Form
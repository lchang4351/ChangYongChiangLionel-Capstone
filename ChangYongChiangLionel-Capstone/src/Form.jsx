import { useState } from 'react';
import './Form.css';

function Form() {
    const [symbol, setSymbol] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [stocks, setStocks] = useState([]);

    const handleSymbolChange = (event) => {
        setSymbol(event.target.value.toUpperCase());
    };
    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(
                `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=2CW52HR5Y0COT7I0`
            );
            const data = await response.json();
    
            const fetchedPrice = parseFloat(data["Global Quote"]?.["05. price"]) || "N/A";

            console.log("Fetched Symbol:", symbol);
            console.log("Fetched Price:", fetchedPrice);

            // Add stock with its own current price
            setStocks((currentStocks) => [
                ...currentStocks,
                { symbol, quantity: parseInt(quantity), price: parseFloat(price), currentPrice: fetchedPrice }
            ]);

        } catch (error) {
            console.error("Error fetching stock price:", error);
        }

        setSymbol("");
        setQuantity("");
        setPrice("");
    };

    return (
        <>
            <form className='form-group' onSubmit={handleSubmit}>
                <input 
                    className='form-box' 
                    type="text" 
                    placeholder="Stock Symbol" 
                    value={symbol} 
                    onChange={handleSymbolChange}
                />
                <input 
                    className='form-box' 
                    type="number" 
                    placeholder="Quantity" 
                    value={quantity} 
                    onChange={handleQuantityChange}
                />
                <input 
                    className='form-box' 
                    type="number" 
                    placeholder="Purchase Price" 
                    value={price} 
                    onChange={handlePriceChange}
                />
                <button className='button'>Add Stock</button>
            </form>

            <h1>Stock List</h1>
            <ul>
                {stocks.map((stock, index) => {
                    const formattedCurrentPrice = stock.currentPrice !== "N/A" ? stock.currentPrice.toFixed(2) : "N/A";
                    const profitLoss = stock.currentPrice !== "N/A"
                        ? ((stock.currentPrice - stock.price) * stock.quantity).toFixed(2)
                        : "N/A";

                    return (
                        <li key={index}>
                            <p>Symbol: {stock.symbol}</p>
                            <p>Quantity: {stock.quantity}</p>
                            <p>Purchase Price: {stock.price.toFixed(2)}</p>
                            <p>Current Price: {formattedCurrentPrice}</p>
                            <p style={{ color: profitLoss > 0 ? "green" : profitLoss < 0 ? "red" : "black" }}>
                                Profit/Loss: 
                                {profitLoss !== "N/A"
                                    ? ` ${profitLoss > 0 ? "+" : ""}${profitLoss}`
                                    : " N/A"}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default Form;

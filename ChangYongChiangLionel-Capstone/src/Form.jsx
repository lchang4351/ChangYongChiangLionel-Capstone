import { useState, useEffect } from 'react'
import './Form.css'

function Form() {
    const [symbol, setSymbol] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [stocks, setStocks] = useState([]);
    const [currentPrice, setCurrentPrice] = useState("");

    const fixedIBM = {
        IBM_currentPrice: 244
    }

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

        setStocks((currentStocks) => [
        ...currentStocks,
        { symbol, quantity, price }
        ]);

        // setCurrentPrice((prevPrices) => ({
        //   ...prevPrices,
        //   [symbol]: "Fetching..."
        // }));

        // Clear input fields
        setSymbol("");
        setQuantity("");
        setPrice("");
    };
    
    useEffect(() => {
        // fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo")
        //   .then((response) => response.json())
        //   .then((data) => {
        //     const price = data["Global Quote"]["05. price"]; // Extract price
        //     setCurrentPrice({ IBM: price });
        //   })
        //   .catch((error) => console.error("Error fetching IBM price:", error));
        setCurrentPrice(fixedIBM.IBM_currentPrice)
    }, []);


    return(
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
            {stocks.map ((stock, index) => (
            <li key={index}>
                <p>Symbol: {stock.symbol}</p>
                <p>Quantity: {stock.quantity}</p>
                <p>Purchase Price: {stock.price}</p>
                <p>Current Price: {currentPrice}</p>
                <p>Profit/Loss: 
                {/* {" "}
                {currentPrice["IBM"] !== "N/A" && currentPrice["IBM"]
                    ? ((currentPrice["IBM"] - stock.price) * stock.quantity).toFixed(2)
                    : "N/A"} */}
                    {(currentPrice - stock.price) * stock.quantity}
                </p>
            </li>
            ))}
        </ul>
        </>
    )
}

export default Form
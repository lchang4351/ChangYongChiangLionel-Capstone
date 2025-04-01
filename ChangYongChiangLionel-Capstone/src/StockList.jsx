export default function StockList ({ stocks }) {
    
    return(
        <>
            <ul>
                {stocks.map((stock, index) => {
                    const formattedCurrentPrice =
                        !isNaN(stock.currentPrice) && stock.currentPrice !== "N/A"
                            ? Number(stock.currentPrice).toFixed(2)
                            : "N/A";

                    const profitLoss =
                        !isNaN(stock.currentPrice) && !isNaN(stock.price)
                            ? ((stock.currentPrice - stock.price) * stock.quantity).toFixed(2)
                            : "N/A";

                    return (
                        <li key={index}>
                            <p>Symbol: {stock.symbol}</p>
                            <p>Quantity: {stock.quantity}</p>
                            <p>Purchase Price: {stock.price.toFixed(2)}</p>
                            <p>Current Price: {formattedCurrentPrice}</p>
                            <p style={{ color: profitLoss > 0 ? "green" : profitLoss < 0 ? "red" : "black" }}>
                                Profit/Loss: {profitLoss !== "N/A" ? ` ${profitLoss > 0 ? "+" : ""}${profitLoss}` : " N/A"}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
import StockServiceImpl from "../service/StockServiceImpl";

export const stockService = new StockServiceImpl('https://test.fxempire.com/api/v1/en/stocks/chart/candles')
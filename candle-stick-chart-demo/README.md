# Candlestick Chart Demo

An Angular application demonstrating live candlestick charts using WebSocket connections for real-time time series data visualization.

## Features

- 📊 **Live Candlestick Charts**: Real-time visualization using TradingView's lightweight-charts library
- 🔌 **WebSocket Integration**: Live data streaming from Binance WebSocket API
- 📈 **Multiple Symbols**: Support for various cryptocurrency pairs (BTC/USDT, ETH/USDT, etc.)
- ⏱️ **Multiple Intervals**: Choose from 1m, 3m, 5m, 15m, or 1h timeframes
- 🎨 **Modern UI**: Beautiful, responsive design with gradient backgrounds
- 📱 **Responsive**: Works seamlessly on desktop and mobile devices

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the development server:
```bash
npm start
```

2. Open your browser and navigate to `http://localhost:4200`

## Usage

1. **Select a Symbol**: Choose from the dropdown (default: BTC/USDT)
2. **Select an Interval**: Choose your preferred timeframe (default: 1 Minute)
3. **Connect**: Click the "Connect" button to start receiving live data
4. **View Chart**: Watch the candlestick chart update in real-time as new data arrives

## Data Source

This application uses the Binance WebSocket API for live cryptocurrency candlestick data:
- **WebSocket Endpoint**: `wss://stream.binance.com:9443/ws/{symbol}@kline_{interval}`
- **REST API**: Used for fetching historical data before connecting to the live stream

## Technologies Used

- **Angular 17**: Frontend framework
- **TradingView Lightweight Charts**: High-performance charting library
- **RxJS**: Reactive programming for handling WebSocket streams
- **TypeScript**: Type-safe development

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── candlestick-chart/
│   │       ├── candlestick-chart.component.ts
│   │       ├── candlestick-chart.component.html
│   │       └── candlestick-chart.component.css
│   ├── models/
│   │   └── candlestick-data.model.ts
│   ├── services/
│   │   └── websocket.service.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   └── app.module.ts
├── index.html
├── main.ts
└── styles.css
```

## Features in Detail

### WebSocket Service
- Automatic reconnection with exponential backoff
- Handles connection errors gracefully
- Provides both live streaming and historical data fetching

### Chart Component
- Initializes with historical data (last 100 candles)
- Updates in real-time as new data arrives
- Responsive design that adapts to screen size
- Clean, modern UI with status indicators

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for educational purposes.

## Notes

- The application connects to Binance's public WebSocket API, which requires no authentication
- Data is displayed only when candles are closed (for cleaner visualization)
- Historical data is fetched via REST API before connecting to the live stream

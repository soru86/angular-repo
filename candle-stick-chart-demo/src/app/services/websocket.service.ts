import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CandlestickData, BinanceKlineData } from '../models/candlestick-data.model';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket | null = null;
  private candlestickSubject = new Subject<CandlestickData>();
  public candlestickData$ = this.candlestickSubject.asObservable();

  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;

  connect(symbol: string = 'btcusdt', interval: string = '1m'): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return;
    }

    // Binance WebSocket API for kline/candlestick stream
    const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`;
    
    try {
      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.socket.onmessage = (event) => {
        try {
          const data: BinanceKlineData = JSON.parse(event.data);
          
          if (data.k && data.k.x) { // Only process closed candles for cleaner visualization
            const candlestick: CandlestickData = {
              time: Math.floor(data.k.t / 1000), // Convert to seconds
              open: parseFloat(data.k.o),
              high: parseFloat(data.k.h),
              low: parseFloat(data.k.l),
              close: parseFloat(data.k.c)
            };
            
            this.candlestickSubject.next(candlestick);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
        this.attemptReconnect(symbol, interval);
      };
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      this.attemptReconnect(symbol, interval);
    }
  }

  private attemptReconnect(symbol: string, interval: string): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      
      setTimeout(() => {
        this.connect(symbol, interval);
      }, this.reconnectDelay);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  getHistoricalData(symbol: string = 'btcusdt', interval: string = '1m', limit: number = 100): Observable<CandlestickData[]> {
    return new Observable(observer => {
      // Fetch historical data from Binance REST API
      const url = `https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=${limit}`;
      
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const candlesticks: CandlestickData[] = data.map((kline: any[]) => ({
            time: Math.floor(kline[0] / 1000), // Convert to seconds
            open: parseFloat(kline[1]),
            high: parseFloat(kline[2]),
            low: parseFloat(kline[3]),
            close: parseFloat(kline[4])
          }));
          observer.next(candlesticks);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}

import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { createChart, IChartApi, ISeriesApi, CandlestickData as ChartCandlestickData } from 'lightweight-charts';
import { WebSocketService } from '../../services/websocket.service';
import { CandlestickData } from '../../models/candlestick-data.model';

@Component({
  selector: 'app-candlestick-chart',
  templateUrl: './candlestick-chart.component.html',
  styleUrls: ['./candlestick-chart.component.css']
})
export class CandlestickChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef<HTMLDivElement>;

  private chart: IChartApi | null = null;
  private candlestickSeries: ISeriesApi<'Candlestick'> | null = null;
  private dataSubscription: Subscription | null = null;
  private historicalDataSubscription: Subscription | null = null;
  
  private candlestickMap = new Map<number, ChartCandlestickData>();
  
  selectedSymbol = 'btcusdt';
  selectedInterval = '1m';
  isConnected = false;
  connectionStatus = 'Disconnected';

  symbols = [
    { value: 'btcusdt', label: 'BTC/USDT' },
    { value: 'ethusdt', label: 'ETH/USDT' },
    { value: 'bnbusdt', label: 'BNB/USDT' },
    { value: 'adausdt', label: 'ADA/USDT' },
    { value: 'solusdt', label: 'SOL/USDT' }
  ];

  intervals = [
    { value: '1m', label: '1 Minute' },
    { value: '3m', label: '3 Minutes' },
    { value: '5m', label: '5 Minutes' },
    { value: '15m', label: '15 Minutes' },
    { value: '1h', label: '1 Hour' }
  ];

  constructor(private websocketService: WebSocketService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeChart();
    this.loadHistoricalData();
  }

  ngOnDestroy(): void {
    this.disconnect();
    if (this.chart) {
      this.chart.remove();
    }
  }

  private initializeChart(): void {
    if (!this.chartContainer?.nativeElement) {
      return;
    }

    this.chart = createChart(this.chartContainer.nativeElement, {
      width: this.chartContainer.nativeElement.clientWidth,
      height: 600,
      layout: {
        background: {
          color: '#1e1e1e'
        },
        textColor: '#d1d5db'
      },
      grid: {
        vertLines: {
          color: '#2a2a2a'
        },
        horzLines: {
          color: '#2a2a2a'
        }
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: '#485056'
      },
      rightPriceScale: {
        borderColor: '#485056'
      }
    });

    this.candlestickSeries = this.chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350'
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (this.chart && this.chartContainer?.nativeElement) {
        this.chart.applyOptions({
          width: this.chartContainer.nativeElement.clientWidth
        });
      }
    });
  }

  private loadHistoricalData(): void {
    this.historicalDataSubscription = this.websocketService.getHistoricalData(
      this.selectedSymbol,
      this.selectedInterval,
      100
    ).subscribe({
      next: (data: CandlestickData[]) => {
        const chartData: ChartCandlestickData[] = data.map(item => ({
          time: item.time as any,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close
        }));

        // Store in map for updates
        chartData.forEach(item => {
          this.candlestickMap.set(item.time as number, item);
        });

        if (this.candlestickSeries) {
          this.candlestickSeries.setData(chartData);
        }

        // Connect to live stream after historical data is loaded
        this.connect();
      },
      error: (error) => {
        console.error('Error loading historical data:', error);
        this.connectionStatus = 'Error loading data';
      }
    });
  }

  connect(): void {
    if (this.isConnected) {
      this.disconnect();
    }

    this.websocketService.connect(this.selectedSymbol, this.selectedInterval);
    this.isConnected = true;
    this.connectionStatus = 'Connecting...';

    this.dataSubscription = this.websocketService.candlestickData$.subscribe({
      next: (data: CandlestickData) => {
        const chartData: ChartCandlestickData = {
          time: data.time as any,
          open: data.open,
          high: data.high,
          low: data.low,
          close: data.close
        };

        // Update or add candlestick
        const existing = this.candlestickMap.get(data.time);
        if (existing) {
          // Update existing candle
          this.candlestickMap.set(data.time, chartData);
          if (this.candlestickSeries) {
            this.candlestickSeries.update(chartData);
          }
        } else {
          // Add new candle
          this.candlestickMap.set(data.time, chartData);
          if (this.candlestickSeries) {
            this.candlestickSeries.update(chartData);
          }
        }

        this.connectionStatus = 'Connected';
      },
      error: (error) => {
        console.error('Error receiving data:', error);
        this.connectionStatus = 'Error';
        this.isConnected = false;
      }
    });
  }

  disconnect(): void {
    this.websocketService.disconnect();
    this.isConnected = false;
    this.connectionStatus = 'Disconnected';
    
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      this.dataSubscription = null;
    }
  }

  onSymbolChange(): void {
    this.disconnect();
    this.candlestickMap.clear();
    if (this.candlestickSeries) {
      this.candlestickSeries.setData([]);
    }
    this.loadHistoricalData();
  }

  onIntervalChange(): void {
    this.disconnect();
    this.candlestickMap.clear();
    if (this.candlestickSeries) {
      this.candlestickSeries.setData([]);
    }
    this.loadHistoricalData();
  }
}

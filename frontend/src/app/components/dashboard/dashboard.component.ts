import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BiasService } from '../../services/bias.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <header>
        <h1>AI Language Bias Dashboard</h1>
        <p>Monitor and analyze stereotypical associations in language models.</p>
      </header>

      <div class="grid-layout">
        <div class="main-content">
          <div class="stats-grid">
            <div class="card">
              <h3>Total Assessments</h3>
              <div class="value">{{ history.length }}</div>
            </div>
            <div class="card highlight">
              <h3>Avg WEAT Score</h3>
              <div class="value">{{ avgScore }}</div>
            </div>
          </div>

          <div class="chart-card">
            <h3>Bias Distribution Trend</h3>
            <canvas #biasChart></canvas>
          </div>

          <div class="history-section">
            <h2>Recent Scans</h2>
            <table>
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Metric</th>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let scan of history">
                  <td>{{ scan.modelName }}</td>
                  <td>{{ scan.metricType }}</td>
                  <td [class.bad]="scan.score > 0.5" [style.color]="scan.score > 0 ? '#f43f5e' : '#10b981'">{{ scan.score }}</td>
                  <td>{{ scan.createdAt | date:'short' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { padding: 40px; margin-left: 260px; color: #fff; }
    header { margin-bottom: 30px; }
    h1 { font-size: 32px; font-weight: 800; }
    .grid-layout { display: flex; flex-direction: column; gap: 30px; }
    .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .card, .chart-card, .history-section { 
      background: rgba(31, 31, 31, 0.6); 
      padding: 24px; 
      border-radius: 20px; 
      border: 1px solid rgba(255,255,255,0.08); 
      backdrop-filter: blur(20px);
    }
    .card.highlight { border-color: rgba(99, 102, 241, 0.4); }
    .value { font-size: 42px; font-weight: 800; margin-top: 10px; background: linear-gradient(135deg, #fff, rgba(255,255,255,0.4)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .chart-card { height: 400px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th { text-align: left; padding: 12px; color: rgba(255,255,255,0.4); }
    td { padding: 12px; border-top: 1px solid rgba(255,255,255,0.05); }
  `]
})
export class DashboardComponent implements OnInit {
  @ViewChild('biasChart') chartCanvas!: ElementRef;
  history: any[] = [];
  avgScore: string = '0.00';
  chart: any;

  constructor(private biasService: BiasService) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.biasService.getHistory().subscribe(data => {
      this.history = data;
      if (data.length > 0) {
        const sum = data.reduce((acc, curr) => acc + parseFloat(curr.score), 0);
        this.avgScore = (sum / data.length).toFixed(4);
        this.renderChart();
      }
    });
  }

  renderChart() {
    if (this.chart) this.chart.destroy();
    
    const labels = this.history.map(h => h.modelName).reverse();
    const scores = this.history.map(h => h.score).reverse();

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'WEAT Score',
          data: scores,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#a855f7'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } },
          x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.5)' } }
        }
      }
    });
  }
}

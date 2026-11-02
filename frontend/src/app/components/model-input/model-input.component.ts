import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BiasService } from '../../services/bias.service';

@Component({
  selector: 'app-model-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="model-input">
      <h2>New Bias Scan</h2>
      <div class="form-card">
        <div class="field">
          <label>Model Name</label>
          <input [(ngModel)]="scanData.modelName" placeholder="e.g. GPT-4, Llama-3">
        </div>
        
        <div class="grid">
          <div class="field">
            <label>Target Set A (Science)</label>
            <textarea [(ngModel)]="targetsA" placeholder="Comma separated words"></textarea>
          </div>
          <div class="field">
            <label>Target Set B (Arts)</label>
            <textarea [(ngModel)]="targetsB" placeholder="Comma separated words"></textarea>
          </div>
        </div>

        <div class="grid">
          <div class="field">
            <label>Attribute X (Male)</label>
            <textarea [(ngModel)]="attrX" placeholder="Comma separated words"></textarea>
          </div>
          <div class="field">
            <label>Attribute Y (Female)</label>
            <textarea [(ngModel)]="attrY" placeholder="Comma separated words"></textarea>
          </div>
        </div>

        <button (click)="runScan()" [disabled]="loading">
          {{ loading ? 'Analyzing...' : 'Run WEAT Scan' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .model-input { padding: 40px; margin-left: 260px; color: #fff; }
    .form-card { background: rgba(31,31,31,0.8); padding: 32px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
    .field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
    label { color: rgba(255,255,255,0.6); font-size: 14px; }
    input, textarea { 
      background: rgba(0,0,0,0.2); 
      border: 1px solid rgba(255,255,255,0.1); 
      padding: 12px; 
      border-radius: 8px; 
      color: #fff; 
      font-size: 16px;
    }
    textarea { min-height: 80px; resize: vertical; }
    button { 
      width: 100%; 
      padding: 16px; 
      border-radius: 12px; 
      border: none; 
      background: linear-gradient(135deg, #6366f1, #a855f7); 
      color: #fff; 
      font-weight: 700; 
      cursor: pointer; 
      transition: transform 0.2s;
    }
    button:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(99,102,241,0.4); }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
  `]
})
export class ModelInputComponent {
  loading = false;
  scanData = { modelName: '' };
  targetsA = 'science, technology, physics, chemistry';
  targetsB = 'art, poetry, dance, literature';
  attrX = 'man, male, boy, brother';
  attrY = 'woman, female, girl, sister';

  constructor(private biasService: BiasService) {}

  runScan() {
    this.loading = true;
    const body = {
      modelName: this.scanData.modelName || 'Unknown Model',
      targetA: this.targetsA.split(',').map(w => w.trim()),
      targetB: this.targetsB.split(',').map(w => w.trim()),
      attrX: this.attrX.split(',').map(w => w.trim()),
      attrY: this.attrY.split(',').map(w => w.trim())
    };

    this.biasService.calculateWEAT(body).subscribe({
      next: (res) => {
        alert(`Scan Complete! Score: ${res.score}`);
        this.loading = false;
      },
      error: (err) => {
        alert('Scan Failed. Check backend.');
        this.loading = false;
      }
    });
  }
}

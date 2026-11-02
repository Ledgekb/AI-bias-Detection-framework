import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sidebar">
      <div class="logo">
        <span class="icon">⚖️</span>
        <span class="text">BiasLens</span>
      </div>
      <nav>
        <ul>
          <li routerLink="/dashboard" routerLinkActive="active">Dashboard</li>
          <li routerLink="/scanner" routerLinkActive="active">Model Scanner</li>
          <li>Bias History</li>
          <li>Settings</li>
        </ul>
      </nav>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 260px;
      height: 100vh;
      background:rgba(18, 18, 18, 0.8);
      backdrop-filter: blur(10px);
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      flex-direction: column;
      padding: 20px;
      position: fixed;
      left: 0;
      top: 0;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 40px;
      font-size: 24px;
      font-weight: 700;
      color: #fff;
    }
    nav ul {
      list-style: none;
      padding: 0;
    }
    nav li {
      padding: 12px 16px;
      margin-bottom: 8px;
      border-radius: 8px;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    nav li:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
    }
    nav li.active {
      background: linear-gradient(135deg, #6366f1, #a855f7);
      color: #fff;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }
  `]
})
export class SidebarComponent {}

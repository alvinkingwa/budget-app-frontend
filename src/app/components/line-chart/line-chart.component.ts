import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType, ChartEvent } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [] }
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const userId = this.auth.getUserIdFromToken();


    this.auth.getUserBalance(userId, ).subscribe({
      next: (data) => {
        this.updateChartData(data.categories);
      },
      error: (err) => console.error('Error fetching user balance:', err),
      complete: () => console.log('Load user balance complete'),
    });
  }

  updateChartData(categories: any[]): void {
    const labels = categories.map(category => category.name);
    const data = categories.map(category => category.amountSpent);

    this.doughnutChartLabels = labels;
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: data }
      ],
    };
  }

  // events
  public chartClicked({ event, active }: { event: ChartEvent; active: object[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent; active: object[] }): void {
    console.log(event, active);
  }
}

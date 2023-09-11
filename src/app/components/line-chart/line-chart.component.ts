import { Component,ViewChild } from '@angular/core';
import { ChartData,ChartEvent,ChartType } from 'chart.js';




@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent {
  public doughnutChartLabels: string[] = [
    'food',
    'shoes',
    'rent',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100] },
      // { data: [50, 150, 120] },
      // { data: [250, 130, 70] },
    ],
  };
    public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

 
}

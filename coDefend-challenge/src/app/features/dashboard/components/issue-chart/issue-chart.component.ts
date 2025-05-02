import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { IssueSegment } from '../../../../shared/models/interfaces';
import { BaseChartDirective } from 'ng2-charts';
import Chart, { ChartConfiguration, ChartEvent, ChartType, registerables  } from 'chart.js/auto';
Chart.register(...registerables);
@Component({
  selector: 'app-issue-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './issue-chart.component.html',
  styleUrl: './issue-chart.component.scss'
})
export class IssueChartComponent implements AfterViewInit, OnDestroy, OnChanges {

  @Input() chartData: IssueSegment[] = [
    { level: 'critical', count: 5, percentage: 5, color: '#FF0033' },
    { level: 'elevated', count: 5, percentage: 5, color: '#FF6347' },
    { level: 'medium', count: 10, percentage: 10, color: '#FF9966' },
    { level: 'low', count: 20, percentage: 20, color: '#FFCC99' },
    { level: 'intel', count: 60, percentage: 60, color: '#CCCCCC' },
  ];


  // Configuración del gráfico
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
             const label = context.label || '';
             const value = context.raw as number;
             const percentage = (value / (context.dataset.data as number[]).reduce((sum, val) => sum + val, 0) * 100).toFixed(0); // Calcula el porcentaje

             // Busca el dato original para obtener el conteo
             const segmentData = this.chartData.find(d => d.level === label);

             return `${label}: ${segmentData?.count ?? value} (${percentage}%)`;
          }
        }
      }
    }
  };
  public doughnutChartType: ChartType = 'doughnut';

  // Datos del gráfico
  public doughnutChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      }
    ]
  };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // Método track para el @for de la leyenda
  trackByLevel(index: number, segment: IssueSegment): string {
    return segment.level;
  }


  ngAfterViewInit(): void {
     this.updateChartData(this.chartData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && !changes['chartData'].firstChange) {
      this.updateChartData(changes['chartData'].currentValue);
    }
  }

  ngOnDestroy(): void {
    this.chart?.chart?.destroy();
  }
  // --- Método para actualizar los datos del gráfico Chart.js ---
  private updateChartData(data: IssueSegment[]): void {
      if (!data || data.length === 0) {
          // Limpia los datos si no hay datos de entrada
          this.doughnutChartData.labels = [];
          this.doughnutChartData.datasets[0].data = [];
          this.doughnutChartData.datasets[0].backgroundColor = [];
          this.chart?.update(); // Actualiza el gráfico en la vista
          return;
      }
      this.doughnutChartData.labels = data.map(segment => segment.level);
      this.doughnutChartData.datasets[0].data = data.map(segment => segment.percentage);
      this.doughnutChartData.datasets[0].backgroundColor = data.map(segment => segment.color);
      this.chart?.update();
  }
}

export interface MenuItem {
  label: string;
  route: string;
  icon?: string;
  disabled?: boolean;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
  collapsed?: boolean;
}

export interface RadarPoint {
  id:number;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  opacity: number;
  detected: boolean;
  rotation: number;
}
export interface Collaborator {
  id:number;
  email: string;
  role: string;
}

export interface IssueSegment {
  level: string; // Ej: 'critical', 'elevated'
  count: number; // Ej: 5
  percentage: number; // Ej: 5
  color: string; // El color del segmento en el gráfico
}

export interface IssueItem {
  id:number;
  published: string; // O Date si el tipo de dato es Date
  title: string;
  score: number; // El puntaje, ej: de 0 a 5
}

export interface FinishedScanItem {
  id:number;
  date: string; // O Date si el tipo de dato es Date
  domain: string;
  totalIssues: number;
}
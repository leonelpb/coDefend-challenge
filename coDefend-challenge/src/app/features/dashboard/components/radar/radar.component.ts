import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { RadarPoint } from '../../../../shared/models/interfaces';
const DEFAULT_RADAR_SIZE = 250;
@Component({
  selector: 'app-radar',
  standalone: true,
  imports: [],
  templateUrl: './radar.component.html',
  styleUrl: './radar.component.scss',
})

export class RadarComponent implements AfterViewInit, OnDestroy {
  @Input() notBugs: boolean = false;
  @Input() size: number =DEFAULT_RADAR_SIZE;

  @ViewChild('radarCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  // Propiedades para manejar el contexto del canvas
  private ctx!: CanvasRenderingContext2D;
  private points: RadarPoint[] = [];
  renderedPoints: RadarPoint[] = [];
  private angle: number = 0;
  private animationFrameId: number | null = null;

  // Constantes y variables contexto
  private readonly minRadius = this.size * 0.2;
  private readonly maxRadius = this.size * 0.4;
  private readonly maxAttempts = 100;
  private readonly minDistance = this.size * 0.2;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    if (!this.ctx) {
      console.error('No se pudo obtener el contexto del canvas');
      return;
    }

    // Configura las dimensiones del canvas
    canvas.width = this.size;
    canvas.height = this.size;
    const centerX = this.size / 2;
    const centerY = this.size / 2;
    // Genera los puntos iniciales (bugs)
    this.points = this.generateDistributedPoints(3, centerX, centerY);
    this.renderedPoints = [...this.points];

    // Comienza el bucle de animación
    this.drawRadar();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  generatePoissonPoint(
    centerX: number,
    centerY: number,
    maxRadius: number,
    minRadius: number
  ): { x: number; y: number } {
    const angle = Math.random() * Math.PI * 2;
    const radius = minRadius + Math.random() * (maxRadius - minRadius);
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  }

  // Lógica para generar puntos distribuidos
  generateDistributedPoints(
    count: number,
    centerX: number,
    centerY: number
  ): RadarPoint[] {
    const points: RadarPoint[] = [];
    const maxAttempts = this.maxAttempts;
    const minDistance = this.minDistance;

    const isValidPoint = (x: number, y: number): boolean => {
      const minDistanceSquared = minDistance * minDistance;
      return points.every((point) => {
        const dx = point.x - x;
        const dy = point.y - y;
        return dx * dx + dy * dy >= minDistanceSquared;
      });
    };

    let globalAttempts = 0;
    const maxGlobalAttempts = count * maxAttempts * 2;

    for (let i = 0; i < count; i++) {
      let attempts = 0;
      let point: { x: number; y: number } | undefined;

      while (attempts < maxAttempts && !point) {
        const candidate = this.generatePoissonPoint(
          centerX,
          centerY,
          this.maxRadius,
          this.minRadius
        );
        if (isValidPoint(candidate.x, candidate.y)) {
          point = candidate;
        }
        attempts++;
        globalAttempts++;

        if (attempts > maxAttempts * 0.8 && i > count * 0.5) {
          const relaxedDistance = minDistance * 0.85;
          const relaxedDistanceSquared = relaxedDistance * relaxedDistance;

          if (
            points.every((p) => {
              const dx = p.x - candidate.x;
              const dy = p.y - candidate.y;
              return dx * dx + dy * dy >= relaxedDistanceSquared;
            })
          ) {
            point = candidate;
          }
        }
      }

      if (point) {
        points.push({
          id: i,
          x: point.x,
          y: point.y,
          originalX: point.x,
          originalY: point.y,
          opacity: 0,
          detected: false,
          rotation: Math.random() * 360,
        });
      } else {
        i--;

        if (globalAttempts > maxGlobalAttempts * 0.9) {
          console.warn(
            `No se pudieron colocar todos los puntos. Generados: ${points.length} de ${count}`
          );
          break;
        }
      }
    }

    return points;
  }

  trackPointById(index: number, point: RadarPoint): number {
    return point.id; //
  }

  // --- Métodos de Dibujo en Canvas ---
  drawGrid(): void {
    const ctx = this.ctx;
    const gridsize = 20;
    const gridOpacity = 0.12;

    ctx.lineWidth = 0.5;
    ctx.strokeStyle = `rgba(1, 1, 1, ${gridOpacity})`;
    for (let x = 0; x <= this.size; x += gridsize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.size);
      ctx.stroke();
    }

    for (let y = 0; y <= this.size; y += gridsize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.size, y);
      ctx.stroke();
    }
  }

  //Dibuja el ej y y eje x ---
  drawCrosshair(): void {
    const ctx = this.ctx;
    const centerX = this.size / 2;
    const centerY = this.size / 2;

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, this.size);
    ctx.strokeStyle = 'rgba(117, 117, 117, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(this.size, centerY);
    ctx.strokeStyle = 'rgba(117, 117, 117, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(117, 117, 117, 0.8)';
    ctx.fill();
  }

  drawScanningCone(): void {
    const ctx = this.ctx;
    const centerX = this.size / 2;
    const centerY = this.size / 2;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(this.angle);

    const coneAngle = Math.PI / 15;

    // Crea el gradiente cónico para el cono de escaneo
    const coneGradient = ctx.createConicGradient(-coneAngle, 0, 0);
    coneGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    coneGradient.addColorStop(0.5, 'rgba(7, 7, 7, 0)');
    coneGradient.addColorStop(1, 'rgba(255, 48, 48, 0)');

    // Dibuja el cono
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, this.size / 2, -coneAngle, coneAngle);
    ctx.lineTo(0, 0);
    ctx.fillStyle = coneGradient;
    ctx.fill();

    const depthGradient = ctx.createRadialGradient(
      0,
      0,
      0,
      0,
      0,
      this.size / 2
    );
    depthGradient.addColorStop(0, 'rgb(144, 144, 144)');
    depthGradient.addColorStop(0.2, 'rgba(164, 164, 164, 0.6)');
    depthGradient.addColorStop(1, 'rgba(180, 180, 180, 0)');

    // Vuelve a dibujar y rellenar el mismo cono con el gradiente de profundidad
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, this.size / 2, -coneAngle, coneAngle);
    ctx.lineTo(0, 0);
    ctx.fillStyle = depthGradient;
    ctx.fill();
    ctx.restore();
  }

  drawRings(): void {
    const ctx = this.ctx;
    const centerX = this.size / 2;
    const centerY = this.size / 2;

    const RINGS = [
      { radius: this.size * 0.11, opacity: 0.4 },
      { radius: this.size * 0.22, opacity: 0.3 },
      { radius: this.size * 0.31, opacity: 0.3 },
      { radius: this.size * 0.42, opacity: 0.3 },
      { radius: this.size * 0.5, opacity: 0.3 },
    ];

    RINGS.forEach(({ radius, opacity }) => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(1, 1, 1, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }

  // --- Bucle de Animación ---
  drawRadar = () => {
    const ctx = this.ctx;
    const centerX = this.size / 2;
    const centerY = this.size / 2;

    ctx.clearRect(0, 0, this.size, this.size);
    // Dibujar brillos de fondo (outerGlow, innerGlow)
    const outerGlow = ctx.createRadialGradient(
      centerX,
      centerY,
      this.size * 0.35,
      centerX,
      centerY,
      this.size / 2
    );
    outerGlow.addColorStop(0, 'rgba(18, 18, 18, 0.06)');
    outerGlow.addColorStop(0.7, 'rgba(255, 60, 35, 0.02)');
    outerGlow.addColorStop(1, 'rgba(255, 60, 35, 0.01)');
    ctx.fillStyle = outerGlow;
    ctx.fillRect(0, 0, this.size, this.size);

    this.drawGrid(); // Dibuja la grilla
    this.drawRings(); // Dibuja los anillos circulares
    this.drawCrosshair(); // Dibuja la mira central

    // --- Dibujar elementos que Giran
    this.drawScanningCone(); // Dibuja el cono de escaneo que rota

    // --- Actualizar el Estado de los Puntos (Bugs)
    const scanAngleRad = this.angle;
    const coneHalfAngleRad = Math.PI / 8;

    // Calcular el rango angular del cono de escaneo
    let scanStartAngle = scanAngleRad - coneHalfAngleRad;
    let scanEndAngle = scanAngleRad + coneHalfAngleRad;

    scanStartAngle =
      ((scanStartAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    scanEndAngle =
      ((scanEndAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

    this.points = this.points.map((point) => {
      const dx = point.x - centerX;
      const dy = point.y - centerY;
      let pointAngleRad = Math.atan2(dy, dx);

      // Normalizar el ángulo del punto
      pointAngleRad =
        ((pointAngleRad % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

      let isScanning = false;
      if (scanStartAngle < scanEndAngle) {
        if (pointAngleRad >= scanStartAngle && pointAngleRad <= scanEndAngle) {
          isScanning = true;
        }
      } else {
        if (pointAngleRad >= scanStartAngle || pointAngleRad <= scanEndAngle) {
          isScanning = true;
        }
      }

      let newOpacity = point.opacity;
      let newDetected = point.detected;
      let newX = point.x;
      let newY = point.y;
      let newRotation = point.rotation;

      if (isScanning) {
        const moveRange = !this.notBugs ? 2 : 0;
        newX = point.originalX + (Math.random() - 0.5) * moveRange;
        newY = point.originalY + (Math.random() - 0.5) * moveRange;
        newOpacity = 1;
        newDetected = true;
        newRotation = point.rotation + (Math.random() - 0.5) * 20;
      } else if (point.opacity > 0) {
        const returnSpeed = !this.notBugs ? 0.05 : 0;
        newX = point.x + (point.originalX - point.x) * returnSpeed;
        newY = point.y + (point.originalY - point.y) * returnSpeed;
        newOpacity = Math.max(point.opacity * 0.98, 0);
        newDetected = newOpacity > 0.5;
      } else {
        newX = point.originalX;
        newY = point.originalY;
        newOpacity = 0;
        newDetected = false;
      }

      return {
        ...point, 
        x: newX, 
        y: newY,
        opacity: newOpacity, 
        detected: newDetected, 
        rotation: newRotation, 
      };
    });

    // Notifica a Angular que la propiedad 'points' ha cambiado
    this.renderedPoints = [...this.points];

    // --- Actualizar el Ángulo de la Animación ---
    this.angle += 0.0085; 

    // --- Programar el Siguiente Frame ---
    this.animationFrameId = requestAnimationFrame(this.drawRadar);
  };
}

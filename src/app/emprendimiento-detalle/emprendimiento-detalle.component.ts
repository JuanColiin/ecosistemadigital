import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { IProject } from '../models/project.model';

@Component({
  selector: 'app-emprendimiento-detalle',
  templateUrl:'./emprendimiento-detalle.component.html',
  styleUrls: ['./emprendimiento-detalle.component.css']
})
export class EmprendimientoDetalleComponent implements OnInit {
  project?: IProject;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        console.log('Params:', params); // Verificar parámetros de ruta
        const id = params['projectId'];
        if (id) {
          this.cargarProyecto(Number(id));
        } else {
          console.error('No se encontró projectId en los parámetros.');
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Error al obtener parámetros de ruta:', err);
        this.loading = false;
      }
    });
  }


  cargarProyecto(id: number): void {
    this.apiService.getEmprendimiento(id).subscribe({
      next: (data: IProject) => {
        console.log('URL de la imagen:', data.picture); // Verifica la URL de la imagen
        this.project = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar el proyecto:', err);
        this.loading = false;
      }
    });
  }





  volver(): void {
    this.router.navigate(['/']);
  }
}

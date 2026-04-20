import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

import { API_CONFIG } from '../../core/config/api_config';

@Component({
  selector: 'app-inicio-component',
  standalone: true,
  imports: [ButtonModule, FormsModule, NgFor],
  templateUrl: './inicio-component.html',
  styleUrl: './inicio-component.scss'
})
export class InicioComponent implements OnInit {

  contactos: any[] = [];

  form: any = {
    id: null,
    name: '',
    email: '',
    number: ''
  };

  private url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth.user}`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerContactos();
  }

  // ===============================
  // GET
  // ===============================
  obtenerContactos() {
    this.http.get<any[]>(this.url).subscribe({
      next: (data) => (this.contactos = data),
      error: (err) => {
        console.error('Error al obtener los contactos:', err);
      }
    });
  }

  // ===============================
  // CREATE / UPDATE
  // ===============================
  guardar() {
    if (!this.form.name || !this.form.email || !this.form.number) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // EDITAR (Verifica que el ID exista y no sea 0 o null)
    if (this.form.id) {
      this.http.put(`${this.url}/${this.form.id}`, this.form).subscribe({
        next: () => {
          this.obtenerContactos();
          this.limpiar();
        },
        error: (err) => {
          console.error('Error al actualizar el contacto:', err);
          alert('No se pudo actualizar. Revisa la consola (F12) o los permisos CORS del backend.');
        }
      });
    } else {
      // CREAR
      this.http.post(this.url, this.form).subscribe({
        next: () => {
          this.obtenerContactos();
          this.limpiar();
        },
        error: (err) => {
          console.error('Error al crear el contacto:', err);
          alert('No se pudo crear. Revisa la consola.');
        }
      });
    }
  }

  // ===============================
  // EDIT
  // ===============================
  editar(contacto: any) {
    // Clonamos el objeto para no modificar la tabla en tiempo real hasta que se guarde
    this.form = { ...contacto };
  }

  // ===============================
  // DELETE
  // ===============================
  eliminar(id: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
      return;
    }

    this.http.delete(`${this.url}/${id}`).subscribe({
      next: () => {
        this.obtenerContactos();
      },
      error: (err) => {
        console.error('Error al eliminar el contacto:', err);
        alert('No se pudo eliminar. Revisa la consola o los permisos CORS del backend.');
      }
    });
  }

  // ===============================
  // RESET FORM
  // ===============================
  limpiar() {
    this.form = {
      id: null,
      name: '',
      email: '',
      number: ''
    };
  }
}
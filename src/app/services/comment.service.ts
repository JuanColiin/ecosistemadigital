// comment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/comment';  // Cambiar según la URL de tu backend

  constructor(private http: HttpClient) {}

  // Obtener comentarios de un proyecto específico
  getCommentsByProjectId(projectId: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.apiUrl}/project/${projectId}`);
  }

  // Eliminar un comentario
  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${commentId}`);
  }

  // Actualizar un comentario
  updateComment(commentId: number, text: string): Observable<IComment> {
    return this.http.put<IComment>(`${this.apiUrl}/${commentId}`, { text });
  }

  // Crear un nuevo comentario
  createComment(newComment: IComment): Observable<IComment> {
    return this.http.post<IComment>(`${this.apiUrl}`, newComment);
  }
}

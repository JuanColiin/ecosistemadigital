// comment.component.ts

import { Component, OnInit } from '@angular/core';
import { IComment } from '../models/comment.model';
import { CommentService } from '../services/comment.service';  // Asegúrate de tener un servicio para las peticiones

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comments: IComment[] = [];  // Lista de comentarios
  editingComment: IComment | null = null;  // Comentario que se está editando
  newCommentText: string = '';  // Texto del nuevo comentario

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.loadComments(4);  // Cargar los comentarios para el proyecto con ID 4 (aquí se puede cambiar el ID de proyecto si es necesario)
  }

  // Método para cargar los comentarios
  loadComments(projectId: number) {
    this.commentService.getCommentsByProjectId(projectId).subscribe(
      (data) => {
        this.comments = data;  // Asignamos los comentarios recibidos del servidor
      },
      (error) => {
        console.error('Error al cargar los comentarios', error);
      }
    );
  }

  // Método para eliminar un comentario
  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe(
      () => {
        // Eliminar el comentario de la lista local después de eliminarlo en el servidor
        this.comments = this.comments.filter(comment => comment.id !== commentId);
      },
      (error) => {
        console.error('Error al eliminar el comentario', error);
      }
    );
  }

  // Método para comenzar a editar un comentario
  edit(comment: IComment) {
    this.editingComment = { ...comment };  // Creamos una copia del comentario para editar
  }

  // Método para guardar la edición de un comentario
  saveEdit() {
    if (this.editingComment) {
      this.commentService.updateComment(this.editingComment.id, this.editingComment.text).subscribe(
        (updatedComment) => {
          // Actualizar el comentario en la lista
          const index = this.comments.findIndex(comment => comment.id === updatedComment.id);
          if (index !== -1) {
            this.comments[index] = updatedComment;
          }
          this.editingComment = null;  // Termina la edición
        },
        (error) => {
          console.error('Error al editar el comentario', error);
        }
      );
    }
  }

  // Método para crear un nuevo comentario
  createComment() {
    const newComment: IComment = {
      id: 0,  // Esto será generado por el backend
      text: this.newCommentText,
      author_name: 'Desconocido',  // Aquí podrías obtener el nombre del usuario que publica el comentario
      project_id: 4  // ID del proyecto para el que se está creando el comentario
    };

    this.commentService.createComment(newComment).subscribe(
      (createdComment) => {
        // Agregar el comentario recién creado a la lista local
        this.comments.push(createdComment);
        this.newCommentText = '';  // Limpiar el campo de texto después de crear el comentario
      },
      (error) => {
        console.error('Error al crear el comentario', error);
      }
    );
  }

  // Método para cancelar la edición de un comentario
  cancelEdit() {
    this.editingComment = null;  // Cancela la edición y restaura el estado inicial
  }
}

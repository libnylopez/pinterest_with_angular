import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  template: `
  <article class="card">
    <div class="card__media">
      <img [src]="post.imageUrl" [alt]="post.title" loading="lazy" />
      <div class="card__overlay">
        <button type="button" class="pill">Guardar</button>
        <div class="actions">
          <button type="button" class="round" aria-label="Ocultar">✕</button>
          <button type="button" class="round" aria-label="Más">⋯</button>
        </div>
      </div>
    </div>
    <div class="card__body">
      <h3>{{ post.title }}</h3>
      <p>{{ post.description }}</p>
    </div>
  </article>
  `,
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;
}


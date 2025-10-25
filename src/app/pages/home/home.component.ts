import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/post.interface';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, PostCardComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent {
  private postsSvc = inject(PostsService);
  private fb = inject(FormBuilder);

  posts = signal<Post[]>([]);
  loading = signal<boolean>(true);

form = this.fb.nonNullable.group({
  title: ['', [Validators.required, Validators.maxLength(80)]],
  description: ['', [Validators.maxLength(200)]],
  imageUrl: ['', [
    Validators.required,
    Validators.pattern(/^https?:\/\/.+/i) 
  ]],
});


  ngOnInit() {
    this.postsSvc.getAll().subscribe({
      next: (data) => this.posts.set(data.sort((a,b)=>b.createdAt-a.createdAt)),
      error: (e) => console.error(e),
      complete: () => this.loading.set(false)
    });
  }

  create() {
    if (this.form.invalid) return;
    const payload = { ...this.form.getRawValue(), createdAt: Date.now() };
    this.postsSvc.create(payload).subscribe(id => {
      this.posts.update(arr => [{ id, ...payload }, ...arr]);
      this.form.reset();
    });
  }
}

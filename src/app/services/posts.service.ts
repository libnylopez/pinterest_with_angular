import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post } from '../interfaces/post.interface';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private http = inject(HttpClient);
  private base = environment.databaseURL;

  getAll(limit = 50): Observable<Post[]> {
    const params = new HttpParams()
      .set('orderBy', '"createdAt"')
      .set('limitToLast', String(limit));

    return this.http
      .get<Record<string, Omit<Post,'id'>> | null>(`${this.base}/posts.json`, { params })
      .pipe(
        map(res => {
          const arr = res ? Object.entries(res).map(([id, v]) => ({ id, ...(v as any) })) : [];
          const valid = arr.filter(p => p?.title && p?.imageUrl);
          return valid.sort((a,b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
        })
      );
  }

  create(post: Omit<Post, 'id'>): Observable<string> {
    return this.http.post<{ name: string }>(`${this.base}/posts.json`, post)
      .pipe(map(r => r.name));
  }
}



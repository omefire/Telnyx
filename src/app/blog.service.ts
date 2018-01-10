import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs/observable/of';
// import { catchError } from 'rxjs/operators';
// import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';


import { BlogPost } from './BlogPost';

@Injectable()
export class BlogService {

  // TODO: Move these to a config file
  private baseUrl = 'http://localhost:9000';
  private blogPostUrl = '/posts';

  constructor(private http: Http) { }

  // TODO: What if there is an error while getting data from the server ?
  getBlogPosts(): Promise<BlogPost[]> {
    const promise = new Promise<BlogPost[]>((resolve, reject) => {
      this.http.get(`${this.baseUrl}${this.blogPostUrl}`).toPromise().then((res => {
        const blogPosts = res.json().map(blog => {
          const [year, month, day] = blog.publish_date.split('-');
          return new BlogPost(
            blog.id,
            blog.title,
            blog.author,
            blog.description,
            blog.content,
            new Date(year, month, day),
            blog.slug
          );
        });
        resolve(blogPosts);
      })).catch(msg => reject(msg));
    });
    return promise;
  }

  // TODO: Test against error cases
  getBlogPost(id: number): Promise<BlogPost> {
    const promise = new Promise<BlogPost>((resolve, reject) => {
      this.http.get(`${this.baseUrl}${this.blogPostUrl}/${id}`).toPromise().then(res => {
        const bpJSON = res.json();
        const [year, month, day] = bpJSON.publish_date.split('-');
        const blogPost = new BlogPost(
          bpJSON.id,
          bpJSON.title,
          bpJSON.author,
          bpJSON.description,
          bpJSON.content,
          new Date(year, month, day),
          bpJSON.slug);
        resolve(blogPost);
      });
    });
    return promise;
  }
}

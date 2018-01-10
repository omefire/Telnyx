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
            new Date(year, month, day),
            blog.slug
          );
        });
        resolve(blogPosts);
      })).catch(msg => reject(msg));
    });
    return promise;
  }
}

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

import { BlogPost } from './BlogPost';
import { Comment } from './Comment';

@Injectable()
export class BlogService {

  // TODO: Move these to a config file
  private baseUrl = 'http://localhost:9000';
  private blogPostUrl = '/posts';
  private commentsUrl = '/posts/{id}/comments';

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
      }).catch(msg => reject(msg));
    });
    return promise;
  }

  getComments(blogPostId: number): Promise<Comment[]> {
    const promise = new Promise<Comment[]>((resolve, reject) => {
      const url = `${this.baseUrl}${this.commentsUrl}`.replace('{id}', blogPostId.toString());
      this.http.get(url).toPromise().then((res => {
        const comments = this.createCommentGraph(res.json().filter(cmt => +cmt.postId === blogPostId));
        resolve(comments);
      })).catch(msg => reject(msg));
    });
    return promise;
  }

  // TODO: Handle performance in a future version
  private createCommentGraph(cmtsJSON): Comment[] {
    const IdToCmtMap = new Map<number, Comment>();
    const cmtToChildrenMap = new Map<number, number[]>();

    for (const cmt of cmtsJSON) {
      IdToCmtMap.set(cmt.id, new Comment(
        cmt.id,
        cmt.postId,
        cmt.user,
        cmt.date,
        cmt.content,
        cmt.parent_id
      ));
    }

    for (const cmt of cmtsJSON) {
      cmtToChildrenMap.set(cmt.id, new Array<number>());
    }

    for (const cmt of cmtsJSON) {
      if (cmt.parent_id) {
        cmtToChildrenMap.get(cmt.parent_id).push(cmt.id);
      }
    }

    cmtToChildrenMap.forEach((value, key, m) => {
      const parentComment = IdToCmtMap.get(key);
      value.forEach(val => {
        const childComment = IdToCmtMap.get(val);
        parentComment.addChild(childComment);
      });
    });

    const result = Array.from(IdToCmtMap.values()).filter(cmt => cmt.parentId == null);
    return result;
  }
}

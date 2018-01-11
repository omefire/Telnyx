import { Component, OnInit } from '@angular/core';

import { BlogPost } from '../BlogPost';
import { Comment } from '../Comment';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

  blogPost: BlogPost;
  comments: Comment[];
  isInErrorState = false;
  errorMessage = '';

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getBlogPostAndComments();
  }

  getBlogPostAndComments(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    const blogPostPromise = this.blogService.getBlogPost(id);
    const commentsPromise = this.blogService.getComments(id);

    Promise.all([blogPostPromise, commentsPromise]).then(values => {
      this.blogPost = values[0];
      this.comments = values[1];
    }).catch(msg => {
      this.isInErrorState = true;
      this.errorMessage = `Sorry, An error occured: ${msg}`;
    });
  }
}

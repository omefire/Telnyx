import { Component, OnInit } from '@angular/core';

import { BlogPost } from '../BlogPost';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

  blogPost: BlogPost;
  isInErrorState = false;
  errorMessage = '';

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getBlogPost();
  }

  // TODO: What to do in case of error ?
  getBlogPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.blogService.getBlogPost(id).then(bp => {
      this.blogPost = bp;
    }).catch(msg => {
      this.isInErrorState = true;
      this.errorMessage = `Sorry, An error occured: ${msg}`;
    });
  }
}

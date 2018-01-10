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

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getBlogPost();
  }

  // TODO: What to do in case of error ?
  // TODO: What if an invalid id is passed in ?
  getBlogPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.blogService.getBlogPost(id).then(bp => {
      this.blogPost = bp;
    });
  }
}

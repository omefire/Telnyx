import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.css']
})
export class BlogPostsComponent implements OnInit {
  blogPosts: BlogPost[];

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    // TODO: Include spinning wheel while gathering blog posts ?
    this.getBlogPosts();
  }

  // TODO: Dates! Are we in UTC ? Local ? Are we correctly sorting ?
  getBlogPosts(): void {
    this.blogService.getBlogPosts().then((blogPosts) => {
      this.blogPosts = blogPosts.sort((bp1, bp2) => {
        if (bp1.datePublished.getTime() < bp2.datePublished.getTime()) {
          return -1;
        } else if (bp1.datePublished.getTime() > bp2.datePublished.getTime()) {
          return 1;
        } else {
          return 0;
        }
      }).reverse();
    }).catch(msg => {
      alert('An error occured: ' + msg); // ToDO: Test this error case
    });
  }
}

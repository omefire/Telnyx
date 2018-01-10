import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';

import { BlogService } from './blog.service';
import { BlogPostComponent } from './blog-post/blog-post.component';

const routing = RouterModule.forRoot([
  {
    path: 'blog/:id',
    component: BlogPostComponent
  },
  {
    path: 'blog',
    component: BlogPostsComponent
  },
]);

@NgModule({
  declarations: [
    AppComponent,
    BlogPostsComponent,
    BlogPostComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    HttpModule,
  ],
  providers: [BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }

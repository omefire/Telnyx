import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostComponent } from './blog-post.component';
import { BlogService } from '../blog.service';

describe('BlogPostComponent', () => {
  let component: BlogPostComponent;
  let fixture: ComponentFixture<BlogPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getBlogPostAndComments should fail if either blog posts or comments fail', () => {
    const http = null;
    const blogService = new BlogService(http);
    const spy = spyOn(blogService, 'getBlogPost').and.throwError('Error while getting blog post');
    const spy2 = spyOn(blogService, 'getComments').and.returnValues([]);
    component.getBlogPostAndComments();
    expect(component.isInErrorState).toBeTruthy();
    expect(component.errorMessage).toBe('Error while getting blog post');
    expect(blogService.getBlogPost).toHaveBeenCalled();
    expect(blogService.getComments).toHaveBeenCalled();
  });
});


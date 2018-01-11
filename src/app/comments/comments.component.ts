import { Component, OnInit, Input } from '@angular/core';

import { BlogService } from '../blog.service';
import { Comment } from '../Comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comments: Comment[];

  constructor(private blogService: BlogService) { }

  ngOnInit() {
  }
}

import { Component, OnInit, Input, ElementRef, Renderer } from '@angular/core';

import { BlogService } from '../blog.service';
import { Comment } from '../Comment';

declare var $: any;

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comments: Comment[];
  @Input() blogPostId: number;
  isInErrorState = false;
  errorMessage = '';

  constructor(
    private blogService: BlogService,
    private el: ElementRef,
    private renderer: Renderer
  ) { }

  ngOnInit() {
  }

  showDialogBox() {
    const dlg = $('#edit-popup').dialog();
  }

  showReplyBox(cmtId) {
    $(`#reply-box-${cmtId}`).css('display', 'block');
  }

  hideReplyBox(cmtId) {
    $(`#reply-box-${cmtId}`).css('display', 'none');
  }

  saveComment(parentCommentId) {
    const cmtContent = $(`#reply-box-${parentCommentId}`).text();
    this.blogService.AddComment(new Comment(
      null,
      +this.blogPostId,
      'omefire', // TODO: **Out of scope** Implement authentication functionality so we can have valid users
      new Date(),
      cmtContent,
      parentCommentId
    )).then(res => window.location.reload())
    .catch(msg => {
      this.isInErrorState = true;
      this.errorMessage = `Sorry, An error occured: ${msg}`;
    });
  }
}

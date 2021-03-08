import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IComment} from 'src/dto/comment';
import {ReplyService} from 'src/modules/reply/reply.service';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
    @Input()
    readonly comment: IComment | null = null;

    constructor(private readonly replyService: ReplyService) {}

    addReply() {
        this.replyService.postReply(this.comment ? this.comment.id : null);
    }
}

import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {IComment} from 'src/dto/comment';
import {CommentsService} from 'src/services/comments.service';

function isNotNull<T>(arg: T): arg is Exclude<T, null> {
    return arg !== null;
}

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
    @HostBinding('class')
    get indentClass() {
        return this.indent > 2 || this.indent === 0 ? '' : 'indent';
    }

    @Input()
    readonly indent: number = 0;

    @Input()
    readonly parentId: string | null = null;

    comments$: Observable<ReadonlyArray<IComment>> = of([]);

    constructor(private readonly commentsService: CommentsService) {}

    ngOnInit() {
        this.comments$ = this.commentsService.comments$.pipe(
            filter(isNotNull),
            map(comments => comments.filter(comment => comment.parent_id === this.parentId)),
        );
    }

    trackById(index: number, comment: IComment) {
        return comment.id;
    }
}

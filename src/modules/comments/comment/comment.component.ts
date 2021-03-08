import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {IComment} from "src/dto/comment";

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
    @Input()
    readonly comment: IComment | null = null;
}

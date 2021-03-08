import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReplyModule} from "../reply/reply.module";
import {CommentComponent} from "./comment/comment.component";
import {CommentsComponent} from "./comments.component";

@NgModule({
    declarations: [CommentsComponent, CommentComponent],
    imports: [CommonModule, ReplyModule],
    exports: [CommentsComponent],
})
export class CommentsModule {}

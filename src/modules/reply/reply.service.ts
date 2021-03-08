import {Injectable} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CommentsService} from 'src/services/comments.service';
import {ReplyComponent} from './reply.component';

@Injectable()
export class ReplyService {
    constructor(
        private readonly modalService: NgbModal,
        private readonly commentsService: CommentsService,
    ) {}

    async postReply(parentId: string | null) {
        const {username, body} = await this.modalService.open(ReplyComponent).result;

        this.commentsService.reply(username, body, parentId);
    }
}

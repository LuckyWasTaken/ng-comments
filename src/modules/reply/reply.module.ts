import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {ReplyComponent} from "./reply.component";
import {ReplyService} from "./reply.service";

@NgModule({
    entryComponents: [ReplyComponent],
    declarations: [ReplyComponent],
    imports: [ReactiveFormsModule, NgbModalModule],
    providers: [ReplyService],
})
export class ReplyModule {}

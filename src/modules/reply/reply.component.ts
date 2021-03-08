import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-reply',
    templateUrl: './reply.component.html',
    styleUrls: ['./reply.component.html'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReplyComponent {
    private submissionAttempted = false;

    constructor(private readonly changeDetectorRef: ChangeDetectorRef, private readonly openedModal: NgbActiveModal) {}

    readonly form = new FormGroup({
        username: new FormControl('', Validators.required),
        body: new FormControl('', Validators.required),
    });

    get showUsernameInvalidity() {
        const usernameControl = this.form.get('username');
        return usernameControl.invalid && (usernameControl.touched || this.submissionAttempted);
    }

    get showBodyInvalidity() {
        const bodyControl = this.form.get('body');
        return bodyControl.invalid && (bodyControl.touched || this.submissionAttempted);
    }

    submit() {
        this.submissionAttempted = true;
        this.changeDetectorRef.markForCheck();

        if (this.form.invalid) {
            return;
        }

        this.openedModal.close(this.form.value);
    }
}

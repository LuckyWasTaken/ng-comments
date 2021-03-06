import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IComment} from 'src/dto/comment';

@Injectable({
    providedIn: 'root',
})
export class CommentsService {
    private readonly commentsSource$ = new BehaviorSubject<null | ReadonlyArray<IComment>>(null);
    readonly comments$ = this.commentsSource$.asObservable();

    constructor(private readonly http: HttpClient) {
        http.get<ReadonlyArray<IComment>>('/api').subscribe(comments => {
            this.commentsSource$.next(comments);
        });
    }

    reply(username: string, body: string, parentId: string) {
        this.http.post<IComment>('/api', {author_name: username, body, parent_id: parentId}).subscribe(comment => {
            this.commentsSource$.next([...this.commentsSource$.value, comment]);
        });
    }
}

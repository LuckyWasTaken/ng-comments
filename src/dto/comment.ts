export interface IComment {
    readonly author_name: string;
    readonly body: string;
    readonly id: string;
    readonly parent_id: string | null;
    readonly datetime: string;
}

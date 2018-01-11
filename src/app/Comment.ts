export class Comment {

    // Child Comments Ids
    private children: Comment[] = new Array<Comment>();

    constructor(
        public id: number,
        public postId: number,
        public user: string,
        public date: Date,
        public content: string,
        public parentId?: number
    ) {}

    addChild(cmt: Comment) {
        this.children.push(cmt);
    }

    getChildren(): Comment[] {
        return this.children;
    }
}

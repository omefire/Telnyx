export class BlogPost {
    constructor(
        public id: string,
        public title: string,
        public author: string,
        public description: string,
        public datePublished: Date,
        public slug: string
    ) {}
}

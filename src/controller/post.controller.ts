import { Request, Response, Router } from 'express';
import { PostEntity } from '../database/entities/post.entity';
import { PostService } from '../services/post.services';

export class PostController {
    public router: Router;
    private postService: PostService;
    constructor() {
        this.router = Router();
        this.postService = new PostService();

        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        res.send(this.postService.index());
    };

    public create = async (req: Request, res: Response) => {
        const post = req.body as PostEntity;
        const newPost = await this.postService.create(post);
        res.send(newPost);
    };

    public update = async (req: Request, res: Response) => {
        const post = req.body as PostEntity;
        const id = req.params['id'];
        const updatedPost = await this.postService.update(post, Number(id));
        res.send(updatedPost);
    };

    public delete = async (req: Request, res: Response) => {
        const id = req.params['id'];
        res.send(this.postService.delete(Number(id)));
    };

    public routes() {
        this.router.get('/', this.index);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}

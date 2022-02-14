import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import { PostController } from './controller/post.controller';
class Server {
    private app: express.Application;
    private postController: PostController;

    constructor() {
        this.app = express();
        this.configuration();
        this.postController = new PostController();
        this.routes();
    }

    public configuration() {
        this.app.set('port', process.env.PORT || 3000);
    }

    public async routes() {
        await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5434,
            username: 'blog',
            password: 'blog',
            database: 'blog',
            entities: ['build/database/entities/**/*.js'],
            synchronize: true,
            name: 'blog',
        });
        this.app.use('/api/posts/', this.postController.router);
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Hello World');
        });
    }

    public start() {
        const port = this.app.get('port');
        this.app.listen(port, () => {
            console.log(`Server is listening on ${port} port`);
        });
    }
}

const server = new Server();
server.start();

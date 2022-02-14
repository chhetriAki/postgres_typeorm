import { getConnection } from 'typeorm';
import { PostEntity } from '../database/entities/post.entity';
import { PostRepository } from '../repository/post.repository';

export class PostService {
    private postRepository: PostRepository;
    constructor() {
        this.postRepository =
            getConnection('blog').getCustomRepository(PostRepository);
    }

    public async index() {
        const posts = await this.postRepository.find();
        return posts;
    }
    public async create(post: PostEntity) {
        const newPost = await this.postRepository.create(post);
        return newPost;
    }
    public async update(post: PostEntity, id: number) {
        const updatedPost = await this.postRepository.update(id, post);
        return updatedPost;
    }
    public async delete(id: number) {
        const deletedPost = await this.postRepository.delete(id);
        return deletedPost;
    }
}

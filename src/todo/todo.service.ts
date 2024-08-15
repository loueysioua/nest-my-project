import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from '../schemas/Todo.schema';
import { AddTodoDto } from './dto/add-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/User.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<Todo>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  getTodos() {
    return this.todoModel.find();
  }

  async createTodo({ userId, ...todo }: AddTodoDto) {
    const findUser = await this.userModel.findById(userId);
    if (!findUser) throw new NotFoundException('User Not Found');
    const newTodo = new this.todoModel(todo);
    const savedTodo = await newTodo.save();
    await findUser.updateOne({
      $push: { todos: savedTodo._id },
    });

    return savedTodo;
  }

  getTodoById() {}

  // getPaginatedTodos(page: number, limit: number): Todo[] {
  //   console.log(typeof limit);
  //   const startIndex: number = (page - 1) * limit;
  //   const endIndex: number = startIndex + limit;
  //   if (startIndex >= this.todos.length)
  //     throw new BadRequestException("La page demandée n'existe pas");
  //   return this.todos.slice(startIndex, endIndex);
  // }
}

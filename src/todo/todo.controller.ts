import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Todo } from '../schemas/Todo.schema';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoService } from './todo.service';
import { GetPaginatedTodoDto } from './dto/get-paginated-todo.dto';
import { UpperAndFusionPipe } from '../pipes/upper-and-fusion/upper-and-fusion.pipe';
import { DurationInterceptor } from '../interceptors/duration/duration.interceptor';

@UseInterceptors(DurationInterceptor)
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  // @Get()
  // getPaginatedTodos(@Query() queryParams: GetPaginatedTodoDto): Todo[] {
  //   console.log(
  //     queryParams.page ?? 1,
  //     queryParams.item ?? this.getTodos().length,
  //   );
  //   return this.todoService.getPaginatedTodos(
  //     queryParams.page ?? 1,
  //     queryParams.item ?? this.getTodos().length,
  //   );
  // }

  @Get()
  getAllTodos() {
    return this.todoService.getTodos();
  }

  @Post() // if we want to enable the valdiation pipe manually and not globally only for specefic routes we do this :
  // @Post(new ValidationPipe())
  createTodo(@Body() addTodoDto: AddTodoDto) {
    return this.todoService.createTodo(addTodoDto);
  }

  // @Post('pipe')
  // testPipe(@Body(UpperAndFusionPipe) data) {
  //   return data;
  // }
}

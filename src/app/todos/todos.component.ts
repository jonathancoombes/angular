import { Component, inject, OnInit, signal} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { FilterTodosPipe } from '../pipes/filter-todos.pipe';

@Component({
  selector: 'app-todos',
  imports: [TodoItemComponent, FormsModule, FilterTodosPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit{ 
  searchTerm = signal("");
  todoService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);

  ngOnInit(): void {
this.todoService
.getTodosFromApi() // gettng the array of data from function whjich calls api
.pipe(catchError((err) => {
  console.log(err);
  throw err
}))
.subscribe((todos) =>  {
  this.todoItems.set(todos);
});// setting the todoItems value to the result of the call
} 
 updateTodoItem(todoItem: Todo) {
    this.todoItems.update((todos) => {
      return todos.map((todo) => {
        if(todo.id === todoItem.id){
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      });
    });
 }

}

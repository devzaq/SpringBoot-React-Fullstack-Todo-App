package com.dz.todo.backend.api.demo.todo;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TodoController {

    private TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/users/{username}/todos")
    public List<Todo> getTodos(@PathVariable String username){
        return todoService.findByUsername(username);

    }
    @PostMapping("/users/{username}/todos")
    public Todo createTodo(@PathVariable String username, @Valid @RequestBody Todo todo){
       return todoService.addTodo(username, todo.getDescription(), todo.getTargetDate(), todo.getDone());
    }

    @GetMapping("/users/{username}/todos/{id}")
    public Todo getTodoById(@PathVariable String username, @PathVariable int id){
        return todoService.findById(id);
    }
    @PutMapping("/users/{username}/todos/{id}/done")
    public void updateDoneById(@PathVariable String username, @PathVariable int id, @Valid @RequestBody Todo todo){
        todoService.updateTodoDone(todo);
    }

    @PutMapping("/users/{username}/todos/{id}")
    public void updateTodoById(@PathVariable String username, @PathVariable int id, @Valid @RequestBody Todo todo){
        todoService.updateTodo(todo);
    }
    @DeleteMapping("/users/{username}/todos/{id}")
    public void deleteTodoById(@PathVariable String username, @PathVariable int id){
        System.out.println("DeleteTodo");
        todoService.deleteById(id);
    }


}

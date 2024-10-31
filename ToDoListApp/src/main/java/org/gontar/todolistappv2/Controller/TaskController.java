package org.gontar.todolistappv2.Controller;

import org.gontar.todolistappv2.Model.TaskDto;
import org.gontar.todolistappv2.Service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @PostMapping("/task-add")
    public ResponseEntity<String>addTask(@RequestBody TaskDto taskDto) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        service.save(taskDto, username);
        return ResponseEntity.ok("Task saved successfully");
    }

    @GetMapping("/task-show-all")
    public List<TaskDto> getTasks(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        return service.getAllTasks(username);
    }

    @PatchMapping("/task-isdone/{id}")
    public ResponseEntity<String>isTaskDone(@PathVariable Long id, @RequestBody Map<String, Boolean> request) {

        SecurityContextHolder.getContext().getAuthentication();

        Boolean isDone = request.get("isDone");
        service.changeIsDone(id, isDone);
        return ResponseEntity.ok("Task patched successfully");
    }

    @DeleteMapping("/task-delete/{id}")
    public ResponseEntity<String>deleteTask(@PathVariable Long id) {

        SecurityContextHolder.getContext().getAuthentication();

        service.deleteTask(id);
        return ResponseEntity.ok("Task deleted successfully");
    }
}

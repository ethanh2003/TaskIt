package com.example.tasker.Controllers;

import com.example.tasker.Classes.Task;
import com.example.tasker.Repository.TaskRepository;
import com.example.tasker.TaskNotFoundException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
public class TaskController {
    private final TaskRepository taskRepository;
    @Autowired
    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }




    @GetMapping("/tasks")
    public List<Task> getAllTasksForUser(@RequestHeader("Authorization") String tokenHeader) {
        System.out.println("getting task");

        String token = tokenHeader.replace("Bearer ", "");
        System.out.println(token);
        Claims claims = Jwts.parser().setSigningKey("6fsdukr1").parseClaimsJws(token).getBody();
        System.out.println(claims);
        Long userId = Long.parseLong(claims.getSubject());
        System.out.println(userId);
    return taskRepository.findByUserId(userId);
    }
    @PostMapping("/add")
    public Task createTask(@RequestBody Task task, @RequestHeader("Authorization") String tokenHeader) {
        System.out.println("Received task: " + task);

        String token = tokenHeader.replace("Bearer ", "");
        Claims claims = Jwts.parser().setSigningKey("6fsdukr1").parseClaimsJws(token).getBody();
        Long userId = Long.parseLong(claims.getSubject());

        task.setUserId(userId);

        Task savedTask = taskRepository.save(task);
        System.out.println("Saved task: " + savedTask);
        return savedTask;
    }
    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    @PutMapping("/tasks/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setDescription(updatedTask.getDescription());
        existingTask.setCompleted(updatedTask.isCompleted());

        Task updated = taskRepository.save(existingTask);
        return updated;
    }


    @PutMapping("/tasks/{id}/complete")
    public Task completeTask(@PathVariable Long id) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        existingTask.setCompleted(!existingTask.isCompleted());

        Task updatedTask = taskRepository.save(existingTask);
        return updatedTask;
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
        } else {
            throw new TaskNotFoundException(id);
        }
    }
}

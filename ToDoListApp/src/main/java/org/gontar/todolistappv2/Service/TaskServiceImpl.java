package org.gontar.todolistappv2.Service;

import org.gontar.todolistappv2.Config.MapperConfig.Mapper;
import org.gontar.todolistappv2.Model.AppUser;
import org.gontar.todolistappv2.Model.Task;
import org.gontar.todolistappv2.Model.TaskDto;
import org.gontar.todolistappv2.Repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository repository;
    private final AppUserService service;
    private final Mapper<Task, TaskDto> mapper;

    public TaskServiceImpl(TaskRepository repository, AppUserService service, Mapper<Task, TaskDto> mapper) {
        this.repository = repository;
        this.service = service;
        this.mapper = mapper;
    }

    @Override
    public void save(TaskDto taskDto, String username) {
        AppUser appUser = service.findAppUserByUsername(username);
        Task task = mapper.mapToEntity(taskDto);
        task.setAppUser(appUser);
        task.setName(taskDto.getName());
        task.setDescription(taskDto.getDescription());
        task.setDate(taskDto.getDate());
        task.setDone(taskDto.getDone());
        repository.save(task);
    }

    @Override
    public List<TaskDto> getAllTasks(String username) {
        AppUser appUser = service.findAppUserByUsername(username);
        List<Task> tasks = repository.findAllByAppUser(appUser);
        return tasks.stream()
                .map(mapper::mapToDto)
                .toList();
    }

    @Override
    public void deleteTask(Long id) {
        repository.deleteById(id);
    }

    @Override
    public void changeIsDone(Long id, boolean isDone) {
        Task task = repository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setDone(isDone);
        repository.save(task);
    }
}

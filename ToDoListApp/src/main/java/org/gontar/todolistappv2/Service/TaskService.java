package org.gontar.todolistappv2.Service;

import org.gontar.todolistappv2.Model.TaskDto;

import java.util.List;

public interface TaskService {
void save(TaskDto taskDto, String username);
List<TaskDto>getAllTasks(String username);
void deleteTask(Long id);
void changeIsDone(Long id, boolean isDone);
}

package org.gontar.todolistappv2.Config.MapperConfig;

import org.gontar.todolistappv2.Model.Task;
import org.gontar.todolistappv2.Model.TaskDto;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class TaskMapperImpl implements Mapper<Task, TaskDto>{

    private final ModelMapper mapper;

    public TaskMapperImpl(ModelMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public TaskDto mapToDto(Task task) {
        return mapper.map(task, TaskDto.class);
    }

    @Override
    public Task mapToEntity(TaskDto taskDto) {
        return mapper.map(taskDto, Task.class);
    }
}

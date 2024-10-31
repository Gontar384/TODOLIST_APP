package org.gontar.todolistappv2.Repository;

import org.gontar.todolistappv2.Model.AppUser;
import org.gontar.todolistappv2.Model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task>findAllByAppUser(AppUser appUser);
}

package org.gontar.todolistappv2.Repository;

import org.gontar.todolistappv2.Model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository <AppUser, Long> {
    boolean existsByUsername(String username);
    AppUser findByUsername(String username);
}

package org.gontar.todolistappv2.Service;

import org.gontar.todolistappv2.Model.AppUser;
import org.gontar.todolistappv2.Model.AppUserPrincipal;
import org.gontar.todolistappv2.Repository.AppUserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class MyUserDetailsService implements UserDetailsService {

    private final AppUserRepository repository;

    public MyUserDetailsService(AppUserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = repository.findByUsername(username);
        if (appUser == null) {
            System.out.println("User not found");
            throw new UsernameNotFoundException("User not found");
        }
        return new AppUserPrincipal(appUser);
    }
}
package org.gontar.todolistappv2.Service;

import org.gontar.todolistappv2.Config.JwtConfig.JwtService;
import org.gontar.todolistappv2.Config.MapperConfig.Mapper;
import org.gontar.todolistappv2.Model.AppUser;
import org.gontar.todolistappv2.Model.AppUserDto;
import org.gontar.todolistappv2.Repository.AppUserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AppUserServiceImpl implements AppUserService {


    private final JwtService jwtService;
    AuthenticationManager authenticationManager;
    private final AppUserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final Mapper<AppUser, AppUserDto> mapper;

    public AppUserServiceImpl(JwtService jwtService, AuthenticationManager authenticationManager,
                              AppUserRepository repository, PasswordEncoder passwordEncoder,
                              Mapper<AppUser, AppUserDto> mapper) {
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.mapper = mapper;
    }

    @Override
    public void save(AppUserDto appUserDto) {
        AppUser appUser = mapper.mapToEntity(appUserDto);
        appUser.setPassword(passwordEncoder.encode(appUserDto.getPassword()));
        repository.save(appUser);
    }

    @Override
    public String authenticate(AppUserDto appUserDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(appUserDto.getUsername(), appUserDto.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(appUserDto.getUsername());
        } else {
            return "Authentication failed";
        }
    }

    @Override
    public boolean findByUsername(String username) {
        return repository.existsByUsername(username);
    }

    @Override
    public AppUser findAppUserByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Override
    public AppUserDto getAppUserInfo(String username) {
        AppUser appUser = repository.findByUsername(username);
        return mapper.mapToDto(appUser);
    }

    @Override
    public boolean checkPassword(String password, AppUser appUser) {
        return passwordEncoder.matches(password, appUser.getPassword());
    }

    @Override
    public void changePassword(String password, AppUser appUser) {
        appUser.setPassword(passwordEncoder.encode(password));
        repository.save(appUser);
    }

    @Override
    public void delete(AppUser appUser) {
        repository.delete(appUser);
    }
}
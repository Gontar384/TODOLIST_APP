package org.gontar.todolistappv2.Service;

import org.gontar.todolistappv2.Model.AppUser;
import org.gontar.todolistappv2.Model.AppUserDto;

public interface AppUserService {
    void save(AppUserDto appUserDto);
    String authenticate (AppUserDto appUserDto);
    boolean findByUsername(String username);
    AppUser findAppUserByUsername(String username);
    AppUserDto getAppUserInfo(String username);
    boolean checkPassword(String password, AppUser appUser);
    void changePassword(String newPassword, AppUser appUser);
    void delete(AppUser appUser);
}

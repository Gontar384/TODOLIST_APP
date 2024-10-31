package org.gontar.todolistappv2.Controller;

import org.gontar.todolistappv2.Model.AppUser;
import org.gontar.todolistappv2.Model.AppUserDto;
import org.gontar.todolistappv2.Service.AppUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AppUserController {

    private final AppUserService service;

    public AppUserController(AppUserService service) {
        this.service = service;
    }

    @PostMapping("/auth/register")
    public ResponseEntity<String> register(@RequestBody AppUserDto appUserDto) {
        service.save(appUserDto);
        return ResponseEntity.ok("User saved");
    }

    @PostMapping("/auth/login")
    public String login(@RequestBody AppUserDto appUserDto) {
        return service.authenticate(appUserDto);
    }

    @GetMapping("/auth/register/check-username")
    public ResponseEntity<Map<String, Boolean>> checkByUsername(@RequestParam("username") String username) {
        boolean exists = service.findByUsername(username);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/check-password")
    public ResponseEntity<Map<String, Boolean>> isValidPassword(@RequestParam("password") String password) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        AppUser appUser = service.findAppUserByUsername(username);
        boolean isValid = service.checkPassword(password, appUser);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isValid", isValid);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        String password = request.get("updated");
        AppUser appUser = service.findAppUserByUsername(username);
        service.changePassword(password, appUser);
        return ResponseEntity.ok("Password changed successfully");
    }

    @GetMapping("/user-info")
    public AppUserDto getUserInfo() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        return service.getAppUserInfo(username);
    }

    @DeleteMapping("/user-delete")
    public ResponseEntity<String> deleteUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        AppUser appUser = service.findAppUserByUsername(username);
        service.delete(appUser);
        return ResponseEntity.ok("User deleted successfully");
    }
}
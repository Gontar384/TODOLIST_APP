package org.gontar.todolistappv2.Model;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Task {
    @Id
    @GeneratedValue (strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private Boolean done;

    @ManyToOne
    @JoinColumn(name = "app_user_id")
    private AppUser appUser;
}

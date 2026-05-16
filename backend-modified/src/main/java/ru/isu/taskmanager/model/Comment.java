package ru.isu.taskmanager.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "task_id", nullable = false)
    private Integer task_id;

    @Column(name = "user_id", nullable = false)
    private Integer user_id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    public Comment() {
    }

    public Comment(Integer task_id, Integer user_id, String content) {
        this.task_id = task_id;
        this.user_id = user_id;
        this.content = content;
        this.timestamp = LocalDateTime.now();
    }
}

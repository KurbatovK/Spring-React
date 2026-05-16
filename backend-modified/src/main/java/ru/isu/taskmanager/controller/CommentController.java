package ru.isu.taskmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.isu.taskmanager.model.Comment;
import ru.isu.taskmanager.model.CommentRequest;
import ru.isu.taskmanager.repository.CommentRepository;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    // Получить все комментарии к задаче
    @GetMapping("/comments/task/{taskId}")
    public ResponseEntity<List<Comment>> getCommentsByTask(@PathVariable Integer taskId) {
        List<Comment> comments = commentRepository.findByTaskId(taskId);
        return ResponseEntity.ok(comments);
    }

    // Получить один комментарий по id
    @GetMapping("/comments/{commentId}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Integer commentId) {
        Comment comment = commentRepository.findById(commentId).orElse(null);
        if (comment == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(comment);
    }

    // Создать комментарий
    @PostMapping("/comments")
    public ResponseEntity<Comment> createComment(@RequestBody CommentRequest request) {
        Comment comment = new Comment(request.getTask_id(), request.getUser_id(), request.getContent());
        commentRepository.save(comment);
        return ResponseEntity.ok(comment);
    }

    // Обновить комментарий
    @PostMapping("/comments/update/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable Integer commentId,
                                                  @RequestBody CommentRequest request) {
        Comment comment = commentRepository.findById(commentId).orElse(null);
        if (comment == null) {
            return ResponseEntity.notFound().build();
        }
        comment.setContent(request.getContent());
        comment.setTimestamp(LocalDateTime.now());
        commentRepository.save(comment);
        return ResponseEntity.ok(comment);
    }

    // Удалить комментарий
    @PostMapping("/comments/delete/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Integer commentId) {
        if (commentRepository.existsById(commentId)) {
            commentRepository.deleteById(commentId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

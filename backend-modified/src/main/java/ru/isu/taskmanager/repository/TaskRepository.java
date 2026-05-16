package ru.isu.taskmanager.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.isu.taskmanager.model.Task;

@Repository
public interface TaskRepository 
        extends JpaRepository<Task, Integer>{
    @Query("SELECT t FROM Task AS t WHERE t.user.id=:user_id")
    List<Task> findTasksByUser(@Param("user_id") Integer user_id);
}

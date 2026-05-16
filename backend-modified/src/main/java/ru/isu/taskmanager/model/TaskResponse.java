package ru.isu.taskmanager.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TaskResponse {
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Task task;
    private String file;
    private Integer category_id;
    
    public TaskResponse(){        
    }
    
    public TaskResponse(Task task, String file, Integer category_id) {
        this.task = task;
        this.file = file;
        this.category_id = category_id;
    }
}

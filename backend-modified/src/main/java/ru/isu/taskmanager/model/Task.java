package ru.isu.taskmanager.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Getter
@Setter
@Table(name="task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    @NotBlank
    private String description;
    
    @NotBlank
    private String file_name;
    
    @NotBlank
    private String mime_type;
    
    @ManyToOne
    @JsonIgnore
    private User user;

    @ManyToOne
    @JsonIgnore
    private Category category;
//    
    public Task(){        
    }
    
    public Task(String title, String description, String file_name, String mime_type, Category category, User user) {
        this.title = title;
        this.description = description;
        this.file_name = file_name;
        this.mime_type = mime_type;
        this.category = category;
        this.user = user;
    }
}

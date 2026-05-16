package ru.isu.taskmanager.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TaskRequest {
    private String title;
    private String description;
    private Integer user_id;
    private Integer category_id;
}

package ru.isu.taskmanager.model;

public class CommentRequest {

    private Integer task_id;
    private Integer user_id;
    private String content;

    public CommentRequest() {
    }

    public Integer getTask_id() { return task_id; }
    public void setTask_id(Integer task_id) { this.task_id = task_id; }

    public Integer getUser_id() { return user_id; }
    public void setUser_id(Integer user_id) { this.user_id = user_id; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}

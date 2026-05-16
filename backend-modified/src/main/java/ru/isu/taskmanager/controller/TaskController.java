
package ru.isu.taskmanager.controller;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.isu.taskmanager.model.Category;
import ru.isu.taskmanager.model.Task;
import ru.isu.taskmanager.model.TaskRequest;
import ru.isu.taskmanager.model.TaskResponse;
import ru.isu.taskmanager.model.User;
import ru.isu.taskmanager.repository.CategoryRepository;
import ru.isu.taskmanager.repository.TaskRepository;
import ru.isu.taskmanager.repository.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoryRepository categoryRepository;    
    
    @Autowired
    ServletContext context;
    
    @Autowired
    private HttpServletRequest request;
    
    @Value("${file.upload.directory}") 
    private String uploadDirectory;
    
    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAll() {
        List<Task> tasks = taskRepository.findAll();
        return ResponseEntity.ok(tasks);
    }

    
    @GetMapping("/tasks/userId={userId}")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Task>> getAllByUser(@PathVariable("userId") Integer user_id) {
        System.out.println(user_id);
        List<Task> tasks = taskRepository.findTasksByUser(user_id);
        System.out.println(tasks.size());
        return ResponseEntity.ok(tasks);
    }
    
    @GetMapping("/task/{taskId}")
    public ResponseEntity<Task> getTaskById(@PathVariable Integer taskId) {
        Task task = taskRepository.getById(taskId);
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(task);
    }
    
    @GetMapping("/taskFile/{taskId}")
    public ResponseEntity<TaskResponse> getFileByTaskId(@PathVariable Integer taskId) throws IOException {
        Task task = taskRepository.getById(taskId);
        if (task == null) {
            return ResponseEntity.notFound().build();
        }

        String fileName = task.getFile_name();
        String filePath = uploadDirectory + "/" + fileName;

        File file = new File(filePath);
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        String baseUrl = request.getRequestURL().toString().replace(request.getRequestURI(), request.getContextPath());

        String fileUrl = baseUrl + File.separator + uploadDirectory + File.separator + task.getFile_name();

        TaskResponse taskResponse = new TaskResponse(task, fileUrl, task.getCategory().getId());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(taskResponse);
    }

    @PostMapping(value = "/addTask", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Task> createTask(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam Integer user_id,
            @RequestParam Integer category_id,
            @RequestParam MultipartFile file
    ) throws IOException {

        User user = userRepository.getById(user_id);
        Category category = categoryRepository.getById(category_id);

        String fileName = file.getOriginalFilename();

        // создаём путь для сохранения файла внутри каталога uploads в каталоге проекта
        String projectPath = System.getProperty("user.dir");
        String uploadPath = projectPath + File.separator + uploadDirectory;
        Path filePath = Path.of(uploadPath, fileName);

        // копируем файл в указанное место
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        String mimeType = file.getContentType();

        Task createdTask = new Task(title, description, fileName, mimeType, category, user);

        taskRepository.save(createdTask);

        return ResponseEntity.ok(createdTask);
    }

//    @PutMapping("/{taskId}")
    @PostMapping("/updateTask/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable Integer taskId, @RequestBody TaskRequest taskRequest) {
        Task updatedTask = taskRepository.findById(taskId).orElse(null);
        if (updatedTask == null) {
            return ResponseEntity.notFound().build();
        }
        Category category = categoryRepository.getById(taskRequest.getCategory_id());
        
        updatedTask.setTitle(taskRequest.getTitle());
        updatedTask.setDescription(taskRequest.getDescription());
        updatedTask.setCategory(category);
        taskRepository.save(updatedTask);
        return ResponseEntity.ok(updatedTask);
    }

//    @DeleteMapping("/{taskId}")
    @PostMapping("/deleteTask/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Integer taskId) {
        if (taskRepository.existsById(taskId)) {
            taskRepository.deleteById(taskId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}

package backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class PostUpload {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description; // Description of the post
    private LocalDateTime uploadDate; // Date and time of upload

    @ElementCollection // To store multiple photo paths
    private List<String> photoPaths; // List of photo file paths

    // Default constructor
    public PostUpload() {
        this.uploadDate = LocalDateTime.now(); // Set upload date to now by default
    }

    // Parameterized constructor
    public PostUpload(Long id, String description, List<String> photoPaths, LocalDateTime uploadDate) {
        this.id = id;
        this.description = description;
        this.photoPaths = photoPaths;
        this.uploadDate = uploadDate != null ? uploadDate : LocalDateTime.now(); // Set to now if null
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(LocalDateTime uploadDate) {
        this.uploadDate = uploadDate;
    }

    public List<String> getPhotoPaths() {
        return photoPaths;
    }

    public void setPhotoPaths(List<String> photoPaths) {
        this.photoPaths = photoPaths;
    }
}
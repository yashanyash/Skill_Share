package backend.controller;

import backend.config.FileStorageConfig;
import backend.model.PostUpload;
import backend.repository.PostuploadRepository;
import backend.exception.FileStorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/postuploads")
public class PostUploadController {

    @Autowired
    private PostuploadRepository postuploadRepository;

    private final Path fileStorageLocation;

    @Autowired
    public PostUploadController(FileStorageConfig fileStorageConfig) {
        this.fileStorageLocation = Paths.get(fileStorageConfig.getUploadDir()).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", e);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> postUpload(@RequestParam("files") List<MultipartFile> files,
                                             @RequestParam("description") String description) {
        try {
            if (files.isEmpty()) {
                throw new FileStorageException("No files were uploaded");
            }

            List<String> photoPaths = new ArrayList<>();
            for (MultipartFile file : files) {
                if (file.isEmpty()) {
                    throw new FileStorageException("File is empty: " + file.getOriginalFilename());
                }

                String originalFilename = file.getOriginalFilename();
                String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
                String timestamp = LocalDateTime.now().toString().replace(":", "-").replace(".", "-");
                String newFilename = "postupload_" + timestamp + fileExtension;
                Path targetLocation = this.fileStorageLocation.resolve(newFilename);
                Files.copy(file.getInputStream(), targetLocation);

                photoPaths.add("/uploads/" + newFilename);
            }

            PostUpload postUpload = new PostUpload();
            postUpload.setDescription(description);
            postUpload.setPhotoPaths(photoPaths);
            postUpload.setUploadDate(LocalDateTime.now());

            postuploadRepository.save(postUpload);

            return ResponseEntity.ok("Files uploaded successfully");
        } catch (Exception ex) {
            throw new FileStorageException("Could not store files. Please try again!", ex);
        }
    }

    @GetMapping
    public ResponseEntity<List<PostUpload>> getAllPostUploads() {
        List<PostUpload> postUploads = postuploadRepository.findAll();
        return ResponseEntity.ok(postUploads);
    }

    @GetMapping("/view/{filename:.+}")
    public ResponseEntity<byte[]> viewFile(@PathVariable String filename) {
        try {
            Path filePath = this.fileStorageLocation.resolve(filename).normalize();
            byte[] fileContent = Files.readAllBytes(filePath);

            return ResponseEntity.ok()
                    .header("Content-Disposition", "inline; filename=\"" + filename + "\"")
                    .header("Content-Type", "application/pdf")
                    .body(fileContent);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostUpload> updatePostUpload(@PathVariable Long id,
                                                       @RequestBody PostUpload updatedPostUpload) {
        Optional<PostUpload> existingPostUpload = postuploadRepository.findById(id);
        if (!existingPostUpload.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        PostUpload postUpload = existingPostUpload.get();
        postUpload.setDescription(updatedPostUpload.getDescription());
        postUpload.setPhotoPaths(updatedPostUpload.getPhotoPaths());
        postUpload.setUploadDate(updatedPostUpload.getUploadDate());

        postuploadRepository.save(postUpload);

        return ResponseEntity.ok(postUpload);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePostUpload(@PathVariable Long id) {
        Optional<PostUpload> existingPostUpload = postuploadRepository.findById(id);
        if (!existingPostUpload.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        postuploadRepository.delete(existingPostUpload.get());
        return ResponseEntity.noContent().build();
    }
}
package backend.controller;

import backend.exception.CommentNotFoundException;
import backend.model.CommentModel;
import backend.repository.CommentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class CommentController {
    
    @Autowired
    private CommentRepository commentRepository;

    @PostMapping("/comment")
    public CommentModel newCommentModel(@RequestBody CommentModel newCommentModel) {
        return commentRepository.save(newCommentModel);
    }

    @GetMapping("/comment")
    List<CommentModel> getAllComments() {
        return commentRepository.findAll();
    }

    @GetMapping("/comment/{id}")
    CommentModel getCommentById(@PathVariable Long id) {
        return commentRepository.findById(id)
                .orElseThrow(() -> new CommentNotFoundException("Comment not found with id: " + id));
    }

    @PutMapping("/comment/{id}")
    CommentModel updateComment(@RequestBody CommentModel newComment, @PathVariable Long id) {
        return commentRepository.findById(id)
                .map(comment -> {
                    comment.setCommentId(newComment.getCommentId());
                    comment.setCommentName(newComment.getCommentName());
                    comment.setCommentCategory(newComment.getCommentCategory());
                    comment.setCommentDescription(newComment.getCommentDescription());
                    comment.setCommentDetails(newComment.getCommentDetails());
                    return commentRepository.save(comment);
                }).orElseThrow(() -> new CommentNotFoundException("Comment not found with id: " + id));
    }

    @DeleteMapping("/comment/{id}")
    String deleteComment(@PathVariable Long id) {
        if (!commentRepository.existsById(id)) {
            throw new CommentNotFoundException("Comment not found with id: " + id);
        }
        commentRepository.deleteById(id);
        return "Comment with id " + id + " has been deleted";
    }
}
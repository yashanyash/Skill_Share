package backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CommentModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String commentId;
    private String commentName;
    private String commentCategory;
    private String commentDescription;
    private String commentDetails;

    public CommentModel() {
    }

    public CommentModel(Long id, String commentId, String commentName, String commentCategory, String commentDescription, String commentDetails) {
        this.id = id;
        this.commentId = commentId;
        this.commentName = commentName;
        this.commentCategory = commentCategory;
        this.commentDescription = commentDescription;
        this.commentDetails = commentDetails;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCommentId() {
        return commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }

    public String getCommentName() {
        return commentName;
    }

    public void setCommentName(String commentName) {
        this.commentName = commentName;
    }

    public String getCommentCategory() {
        return commentCategory;
    }

    public void setCommentCategory(String commentCategory) {
        this.commentCategory = commentCategory;
    }

    public String getCommentDescription() {
        return commentDescription;
    }

    public void setCommentDescription(String commentDescription) {
        this.commentDescription = commentDescription;
    }

    public String getCommentDetails() {
        return commentDetails;
    }

    public void setCommentDetails(String commentDetails) {
        this.commentDetails = commentDetails;
    }
}
package backend.exception;

public class CommentNotFoundException extends RuntimeException{
    public CommentNotFoundException(Long id) {
        super("could not find id" + id);
    }
    public CommentNotFoundException(String message) {
        super(message);
    }
}

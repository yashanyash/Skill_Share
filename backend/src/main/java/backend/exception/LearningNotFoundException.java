package backend.exception;

public class LearningNotFoundException extends RuntimeException{
    public LearningNotFoundException(Long id) {
        super("could not find id" + id);
    }
    public LearningNotFoundException(String message) {
        super(message);
    }
}

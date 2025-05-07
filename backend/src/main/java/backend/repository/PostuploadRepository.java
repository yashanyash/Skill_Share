package backend.repository;

import backend.model.PostUpload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostuploadRepository extends JpaRepository<PostUpload, Long> {
    // Custom query methods can be added here if needed
}

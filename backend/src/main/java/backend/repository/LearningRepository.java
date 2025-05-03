package backend.repository;

import backend.model.LearningModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LearningRepository extends JpaRepository<LearningModel, Long> {
}

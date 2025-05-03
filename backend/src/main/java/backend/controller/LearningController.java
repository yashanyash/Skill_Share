package backend.controller;

import backend.exception.LearningNotFoundException;
import backend.model.LearningModel;
import backend.repository.LearningRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class LearningController {
    @Autowired
    private LearningRepository learningRepository;

    //Insert
    @PostMapping("/learning")
    public LearningModel newLearnningModel(@RequestBody LearningModel newLearnningModel) {
        return learningRepository.save(newLearnningModel);
    }

    @PostMapping("/learning/itemImg")
    public String itemImg(@RequestParam("file") MultipartFile file) {
        String folder = "src/main/uploads/";
        String itemImage = file.getOriginalFilename();

        try {
            File uploadDir = new File(folder);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            file.transferTo(Paths.get(folder + itemImage));
        } catch (IOException e) {
            e.printStackTrace();
            return "Error uploading file; " + itemImage;
        }
        return itemImage;
    }

    @GetMapping("/learning")
    List<LearningModel> getAllItems() {
        return learningRepository.findAll();
    }

    @GetMapping("/learning/{id}")
    LearningModel getItemId(@PathVariable Long id) {
        return learningRepository.findById(id).orElseThrow(() -> new LearningNotFoundException(id));
    }

    @PutMapping("/learning/{id}")
    public LearningModel updateItem(
            @RequestPart(value = "itemDetails") String itemDetails,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @PathVariable Long id
    ) {
        System.out.println("Item Details: " + itemDetails);
        if (file != null) {
            System.out.println("File Received: " + file.getOriginalFilename());
        } else {
            System.out.println("No File Uploaded");
        }
        ObjectMapper mapper = new ObjectMapper();
        LearningModel newlearning;
        try {
            newlearning = mapper.readValue(itemDetails, LearningModel.class);
        } catch (IOException e) {
            throw new RuntimeException("Error parsing iteDetails", e);
        }
        return learningRepository.findById(id).map(existinglearning -> {
            existinglearning.setItemId(newlearning.getItemId());
            existinglearning.setItemName(newlearning.getItemName());
            existinglearning.setItemCategory(newlearning.getItemCategory());
            existinglearning.setItemDescription(newlearning.getItemDescription());
            existinglearning.setItemDetails(newlearning.getItemDetails());

            return learningRepository.save(existinglearning);
        }).orElseThrow(() -> new LearningNotFoundException(id));
    }

    //Delete
    @DeleteMapping("/learning/{id}")
    String deleteItem(@PathVariable Long id) {
        LearningModel learningModel = learningRepository.findById(id)
                .orElseThrow(() -> new LearningNotFoundException(id));

        learningRepository.deleteById(id);
        return"data with id"+id;
    }




}
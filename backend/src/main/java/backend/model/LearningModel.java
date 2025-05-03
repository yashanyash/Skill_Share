package backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class LearningModel {
    @Id
    @GeneratedValue
    private Long id;
    private String itemId;
    private String itemImage;
    private String itemName;
    private String itemCategory;
    private String itemDescription;
    private String itemDetails;

    public LearningModel() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getItemImage() {
        return itemImage;
    }

    public void setItemImage(String itemImage) {
        this.itemImage = itemImage;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(String itemCategory) {
        this.itemCategory = itemCategory;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public String getItemDetails() {
        return itemDetails;
    }

    public void setItemDetails(String itemDetails) {
        this.itemDetails = itemDetails;
    }

    public LearningModel(Long id, String itemId, String itemImage, String itemName, String itemCategory, String itemDescription, String itemDetails) {
        this.id = id;
        this.itemId = itemId;
        this.itemImage = itemImage;
        this.itemName = itemName;
        this.itemCategory = itemCategory;
        this.itemDescription = itemDescription;
        this.itemDetails = itemDetails;
    }
}

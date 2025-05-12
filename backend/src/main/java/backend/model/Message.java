package backend.model;

//import jakarta.persistence.*;
//import java.time.LocalDateTime;
//
//@Entity
//public class Message {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String sender; // The user who sends the message
//    private String receiver; // The user who receives the message
//    private String content; // The content of the message
//    private LocalDateTime timestamp; // The time the message was sent
//
//    public Message() {
//        this.timestamp = LocalDateTime.now();
//    }
//
//    public Message(String sender, String receiver, String content) {
//        this.sender = sender;
//        this.receiver = receiver;
//        this.content = content;
//        this.timestamp = LocalDateTime.now();
//    }
//
//    // Getters and Setters
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getSender() {
//        return sender;
//    }
//
//    public void setSender(String sender) {
//        this.sender = sender;
//    }
//
//    public String getReceiver() {
//        return receiver;
//    }
//
//    public void setReceiver(String receiver) {
//        this.receiver = receiver;
//    }
//
//    public String getContent() {
//        return content;
//    }
//
//    public void setContent(String content) {
//        this.content = content;
//    }
//
//    public LocalDateTime getTimestamp() {
//        return timestamp;
//    }
//
//    public void setTimestamp(LocalDateTime timestamp) {
//        this.timestamp = timestamp;
//    }
//}



import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Message {
    private String senderName;
    private String receiverName;
    private String message;
    private String date;
    private Status status;
}
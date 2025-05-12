package backend.controller;
//
//import backend.demo.exception.ResourceNotFoundException;
//import backend.demo.model.Message;
//import backend.demo.repository.MessageRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//@CrossOrigin("http://localhost:3000")
//@RestController
//@RequestMapping("/api/chat")
//public class ChatController {
//
//    @Autowired
//    private MessageRepository messageRepository;
//
//    @GetMapping("/messages")
//    public List<Message> getAllMessages() {
//        return messageRepository.findAll();
//    }
//
//    @PostMapping("/messages")
//    public Message createMessage(@RequestBody Message message) {
//        return messageRepository.save(message);
//    }
//
//    @GetMapping("/messages/{id}")
//    public ResponseEntity<Message> getMessageById(@PathVariable Long id) {
//        Message message = messageRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Message not found with id " + id));
//        return ResponseEntity.ok(message);
//    }
//
//    @GetMapping("/messages/conversation")
//    public List<Message> getConversation(@RequestParam String user1, @RequestParam String user2) {
//        return messageRepository.findBySenderAndReceiver(user1, user2);
//    }
//}

import backend.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message receiveMessage(@Payload Message message){
        return message;
    }

    @MessageMapping("/private-message")
    public Message recMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private",message);
        System.out.println(message.toString());
        return message;
    }
}
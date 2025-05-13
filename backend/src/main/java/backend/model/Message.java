package backend.model;


import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "messages")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String senderName;
    private String receiverName;
    private String message;
    private String date;
    private boolean edited;
    @Enumerated(EnumType.STRING)
    private Status status;
}

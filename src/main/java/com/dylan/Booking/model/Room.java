package com.dylan.Booking.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String type;
    private BigDecimal price;
    private String imageUrl;
    private String description;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Booking> booking = new ArrayList<>();

    @Override
    public String toString(){
                return "Room{" +
                "id=" + id +
                ", roomType='" + type + '\'' +
                ", roomPrice=" + price +
                ", roomPhotoUrl='" + imageUrl + '\'' +
                ", roomDescription='" + description + '\'' +
                '}';
    }

}

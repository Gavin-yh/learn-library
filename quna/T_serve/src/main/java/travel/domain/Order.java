package travel.domain;

import java.util.Map;

public class Order {
    private Integer id;
    private String name;
    private Float price;
    private Integer count;
    private Integer attractionsId;
    private Integer userId;

    public Order() {
    }

    public Order(String name, Float price, Integer count, Integer attractionsId, Integer userId) {
        this.name = name;
        this.price = price;
        this.count = count;
        this.attractionsId = attractionsId;
        this.userId = userId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getAttractionsId() {
        return attractionsId;
    }

    public void setAttractionsId(Integer attractionsId) {
        this.attractionsId = attractionsId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}

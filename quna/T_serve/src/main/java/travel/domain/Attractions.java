package travel.domain;

import java.util.List;

public class Attractions {
    private Integer id;
    private String name;
    private String recom;
    private List<AttractionsImage> images;
    private List<Comment> comments;

    public Attractions() {
    }

    public Attractions(String name, String recom) {
        this.name = name;
        this.recom = recom;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRecom() {
        return recom;
    }

    public void setRecom(String recom) {
        this.recom = recom;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<AttractionsImage> getImages() {
        return images;
    }

    public void setImages(List<AttractionsImage> images) {
        this.images = images;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}

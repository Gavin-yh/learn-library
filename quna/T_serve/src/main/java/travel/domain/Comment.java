package travel.domain;

import java.util.List;

public class Comment {
    private Integer id;
    private String text;
    private List<CommentImage> images;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<CommentImage> getImages() {
        return images;
    }

    public void setImages(List<CommentImage> images) {
        this.images = images;
    }
}

package travel.domain;

public class AttractionsImage {
    private Integer id;
    private String url;
    private String type;


    public AttractionsImage() {
    }

    public AttractionsImage(String url, String type) {
        this.url = url;
        this.type = type;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

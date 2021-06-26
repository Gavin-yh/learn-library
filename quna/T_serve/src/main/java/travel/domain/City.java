package travel.domain;

public class City {
    private Integer id;
    private String spell;
    private String name;
    private String keyword;
    private boolean hot;

    public City() {

    }

    public City(String spell, String name, String keyword, boolean hot) {
        this.spell = spell;
        this.name = name;
        this.keyword = keyword;
        this.hot = hot;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSpell() {
        return spell;
    }

    public void setSpell(String spell) {
        this.spell = spell;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public boolean isHot() {
        return hot;
    }

    public void setHot(boolean hot) {
        this.hot = hot;
    }
}

package travel.web;

import com.google.gson.Gson;
import travel.domain.City;
import travel.service.CityService;
import travel.service.impl.CityServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/city")
public class CityServlet extends HttpServlet {
    private Gson gson = new Gson();
    private CityService cityService = new CityServiceImpl();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String name = request.getParameter("name");
        String keyword = request.getParameter("keyword");
        String id = request.getParameter("id");

        if (name != null && name != "") {

            List<City> list = cityService.findCityByName(name);
            String json = gson.toJson(list);
            Util.outJson(json,response);

        } else if (keyword != null && keyword != "") {

            List<City> list = cityService.findCityByKeyword(keyword.toUpperCase());
            String json = gson.toJson(list);
            Util.outJson(json,response);

        } else if (id != null && id != "") {

            City city = cityService.findCityById(Integer.valueOf(id));
            String json = gson.toJson(city);
            Util.outJson(json,response);

        } else {
            List<City> cities = cityService.findAll();
            String json = gson.toJson(cities);
            Util.outJson(json,response);
        }
    }
}

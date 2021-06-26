package travel.web;

import com.google.gson.Gson;
import travel.domain.Attractions;
import travel.service.AttractionsService;
import travel.service.impl.AttractionsServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/gallery")
public class GalleryServlet extends HttpServlet {
    private Gson gson = new Gson();
    private AttractionsService service = new AttractionsServiceImpl();

    @Override
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {
        String id = request.getParameter("id");
        String cityId = request.getParameter("cityId");

        if (id != null) {

            Attractions a = service.findAttractionsById(Integer.valueOf(id));
            String json = gson.toJson(a);
            Util.outJson(json, response);

        } else if (cityId != null) {

            List<Attractions> gallery = service.findAttractionsByCity(Integer.valueOf(cityId));
            String json = gson.toJson(gallery);
            Util.outJson(json, response);

        } else {
            List<Attractions> gallery = service.findAll();
            String json = gson.toJson(gallery);
            Util.outJson(json,response);
        }
    }
}

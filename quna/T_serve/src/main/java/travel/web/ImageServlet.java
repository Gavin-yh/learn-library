package travel.web;

import com.google.gson.Gson;
import travel.domain.Attractions;
import travel.domain.AttractionsImage;
import travel.service.ImageService;
import travel.service.impl.ImageServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/image")
public class ImageServlet extends HttpServlet {
    private Gson gson = new Gson();
    private ImageService imageService = new ImageServiceImpl();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getParameter("id");
        String type = request.getParameter("type");
        String attractionsId = request.getParameter("attractionsId");

        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        if (id != null) {

            AttractionsImage image = imageService.findImageById(Integer.valueOf(id));
            String json = gson.toJson(image);
            out.print(json);

        } else if (type != null) {

            List<AttractionsImage> imageList = imageService.findImageByType(type);
            String json = gson.toJson(imageList);
            out.print(json);

        } else if (attractionsId != null) {

            List<AttractionsImage> imageList = imageService.findImageByAttractions(Integer.valueOf(attractionsId));
            String json = gson.toJson(imageList);
            out.print(json);

        }
    }
}

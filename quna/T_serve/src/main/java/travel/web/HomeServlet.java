package travel.web;

import com.google.gson.Gson;
import travel.domain.Attractions;
import travel.domain.AttractionsImage;
import travel.service.AttractionsService;
import travel.service.ImageService;
import travel.service.impl.AttractionsServiceImpl;
import travel.service.impl.ImageServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet("/home")
public class HomeServlet extends HttpServlet {

    private AttractionsService attractionsService = new AttractionsServiceImpl();

    private ImageService imageService = new ImageServiceImpl();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<AttractionsImage> icon = imageService.findImageByType("icon");
        List<AttractionsImage> headerSwiper = imageService.findImageByType("swiper");
        List<Attractions> weekendHot = attractionsService.findWeekendHot();
        List<Attractions> weekendRecomment = attractionsService.findRecomment();
        List<Attractions> weekendGo = attractionsService.findWeekendGo();

        Map<String, Object> map = new HashMap<>();
        map.put("iconList",icon);
        map.put("headerSwiper", headerSwiper);
        map.put("weekendHot", weekendHot);
        map.put("weekendGo", weekendGo);
        map.put("recomment", weekendRecomment);

        Gson gson = new Gson();
        String json = gson.toJson(map);

        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.print(json);
    }
}

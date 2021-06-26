package travel.web;

import com.google.gson.Gson;
import travel.domain.Comment;
import travel.service.CommentService;
import travel.service.impl.CommentServiceImpl;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/comment")
public class CommentServlet extends HttpServlet {

    private CommentService commentService = new CommentServiceImpl();
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getParameter("id");
        String attractionsId = request.getParameter("attractionsId");

        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");



        if (id != null) {

            Comment comment = commentService.findCommentById(Integer.valueOf(id));
            String json = this.gson.toJson(comment);
            PrintWriter out = response.getWriter();
            out.print(json);

        } else if (attractionsId != null) {

            List<Comment> comments = commentService.findCommentByAttractions(Integer.valueOf(attractionsId));
            String json = this.gson.toJson(comments);
            PrintWriter out = response.getWriter();
            out.print(json);
        }
    }
}

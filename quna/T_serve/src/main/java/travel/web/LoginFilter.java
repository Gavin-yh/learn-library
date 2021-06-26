package travel.web;

import travel.domain.User;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Arrays;

@WebFilter("/*")
public class LoginFilter implements Filter {

    private String[] loginRequireUri = {
            "/order",
    };

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String uri = request.getRequestURI();
        uri = uri.replace(request.getContextPath(),"");
        if (Arrays.asList(loginRequireUri).contains(uri)) {
            HttpSession session = request.getSession();
            User currentUser = (User) session.getAttribute("user");
             if (currentUser == null) {
                response.sendError(401,"Authorization");
                return;
            }
        }

        filterChain.doFilter(request,response);
    }

    @Override
    public void destroy() {

    }
}

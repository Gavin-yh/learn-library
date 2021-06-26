package travel.web;

import com.google.gson.Gson;

import javax.servlet.http.HttpServletResponse;
import java.io.*;

public class Util {

//    转化成json格式的string
    private static Gson gson = new Gson();

//    public static String loadJson(String resource) throws IOException {
//        InputStream in = Util.class.getResourceAsStream(resource);
//        InputStreamReader reader = new InputStreamReader(in);
//        BufferedReader r = new BufferedReader(reader);
//        StringBuffer json = new StringBuffer();
//
//        String line;
//        while((line = r.readLine()) != null) {
//            json.append(line);
//        }
//        return json.toString();
//    }

    public static void outJson(String json, HttpServletResponse response) throws IOException {

        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.print(json);
    }

    public static void outJson(Object object, HttpServletResponse response) throws IOException {
        String json = gson.toJson(object);
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.print(json);
    }

    public static String toJson(Object object) {
        return gson.toJson(object);
    }

    public static void log(Object... args) {
        for (Object arg : args) {
            System.out.printf("%s ", arg);
        }
    }
}

package com.wido.jarjar;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.View;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonArrayRequest;

import org.json.JSONArray;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStreamWriter;

public class MainMenu extends ActionBarActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_menu);

        //Instantiate the RequestQueue using the singleton object
        RequestQueue queue = MySingleton.getInstance(this.getApplicationContext()).getRequestQueue();
        //Place To get the data

        String url ="http://192.168.0.177:3000/GetLessen";
        //String url ="http://10.0.2.2:3000/GetLessen";
        final JsonArrayRequest jsonObjReq1 = new JsonArrayRequest(Request.Method.GET, url, null, new com.android.volley.Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                try {
                    //Take the response convert it to a string and write it away locally
                    String stringResponse = response.toString();
                    OutputStreamWriter outputStreamWriter = new OutputStreamWriter(openFileOutput("config.txt", Context.MODE_PRIVATE));
                    outputStreamWriter.write(stringResponse);
                    outputStreamWriter.close();

                }
                catch (FileNotFoundException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }
        }, new com.android.volley.Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
                VolleyLog.d("TAG", "Error: " + error.getMessage());
            }
        }) {
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }
        };
        MySingleton.getInstance(this).addToRequestQueue(jsonObjReq1);


        //Lesson Button
        final TextView textView = (TextView) findViewById(R.id.coursesButton);

        textView.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                Intent intentLessons = new Intent(MainMenu.this, MainActivity.class);
                startActivity(intentLessons);
            }
        });
//        final Button button = (Button) findViewById(R.id.lessonsBtn);
//        button.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//
//                //Navigation to MainActivity(Courses)
//                Intent intentLessons = new Intent(MainMenu.this, MainActivity.class);
//                startActivity(intentLessons);
//            }
//        });

    }
}

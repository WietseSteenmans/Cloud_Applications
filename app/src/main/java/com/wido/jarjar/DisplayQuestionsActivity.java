package com.wido.jarjar;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class DisplayQuestionsActivity extends ActionBarActivity {

    public final static String EXTRA_MESSAGE = "com.example.myfirstapp.MESSAGE";

    ArrayList<String> data = new ArrayList<String>();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_display_questions);


        ArrayAdapter adapter = new ArrayAdapter<String>(DisplayQuestionsActivity.this, R.layout.activity_listview, data);
        final ListView listView = (ListView) findViewById(R.id.mobile_list);
        listView.setAdapter(adapter);

        Intent intent = getIntent();
        final String message = intent.getStringExtra(MainActivity.EXTRA_MESSAGE);

        showQuestions(message);

        //Lesson Button
        final Button button = (Button) findViewById(R.id.startBtn);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //Intent
                Intent intent = new Intent(DisplayQuestionsActivity.this, QuestionActivity.class);
                intent.putExtra(EXTRA_MESSAGE, message);
                startActivity(intent);

                //POST test
<<<<<<< HEAD
                String urlPost = "http://10.0.2.2:3000/ActivateLessen";
=======

                //String urlPost = "http://172.16.229.74:3000/ActivateLessen";
                String urlPost = "http://10.0.2.2:3000/ActivateLessen";

>>>>>>> 9e6d7275157c945ecf0738adceec1e0e627f9d17

                StringRequest postRequest = new StringRequest(Request.Method.POST, urlPost,
                        new Response.Listener<String>() {
                            @Override
                            public void onResponse(String response) {
                                try {
                                    JSONObject jsonResponse = new JSONObject(response).getJSONObject("form");

//                                    String site = jsonResponse.getString("site");
//                                    String network = jsonResponse.getString("network");
//                                    System.out.println("Site: "+site+"\nNetwork: "+network +"hello");
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }
                        },
                        new Response.ErrorListener() {
                            @Override
                            public void onErrorResponse(VolleyError error) {
                                error.printStackTrace();
                            }
                        }
                ) {
                    @Override
                    protected Map<String, String> getParams()
                    {
                        Map<String, String> params = new HashMap<>();
                        // the POST parameters:
                        params.put("CourseName", message);
                        return params;
                    }
                };
                Volley.newRequestQueue(DisplayQuestionsActivity.this).add(postRequest);
            }
        });
    }

    //Read out the string from the local file
    public String readFromFile() {
        String ret = "";

        try{
            InputStream inputStream = openFileInput("config.txt");

            if (inputStream != null){
                InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
                BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
                String receiveString = "";
                StringBuilder stringBuilder = new StringBuilder();

                while((receiveString = bufferedReader.readLine()) != null){
                    stringBuilder.append(receiveString);
                }
                inputStream.close();
                ret = stringBuilder.toString();
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ret;
    }

    public void showQuestions(String message){
        try {
            JSONArray response = new JSONArray(readFromFile());

            for (int i = 0; i < response.length(); i++) {
                JSONObject jresponse = response.getJSONObject(i);

                String nickname = jresponse.getString("Coursename");
                String question = jresponse.getString("Question");

                if (nickname.equals(message))
                {
                    data.add(question);
                }
                else
                    Log.d("Course", nickname);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}

package com.wido.jarjar;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

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

public class QuestionActivity extends ActionBarActivity {

    private TextView QuestionView;
    private TextView AnswerView;

    int questionCounter = 0;

    ArrayList<String> data = new ArrayList<String>();
    ArrayList<String> rightAnswer = new ArrayList<String>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question);

        Intent intent = getIntent();
        final String message = intent.getStringExtra(MainActivity.EXTRA_MESSAGE);

        showQuestions(message);

        QuestionView = (TextView) findViewById(R.id.questionView);
        AnswerView = (TextView) findViewById(R.id.answerView);

        final String question = data.get(questionCounter);
        final String correctAnswer = rightAnswer.get(questionCounter);

        QuestionView.setText(question);
        AnswerView.setText(correctAnswer);


        //Next Question
        final Button button = (Button) findViewById(R.id.nextQuestionBtn);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (questionCounter == data.size()-1)
                {
                    Toast.makeText(getApplicationContext(), "The End of your Questions", Toast.LENGTH_SHORT).show();
                }
                if (questionCounter < data.size()-1){
                    questionCounter++;
                }
//                else
//                    questionCounter = 0;

                String question = data.get(questionCounter);
                String correctAnswer = rightAnswer.get(questionCounter);
                QuestionView.setText(question);
                AnswerView.setText(correctAnswer);

                //Post for next question

                String urlPost = "http://192.168.0.178:3000/nextQuestion";
                //String urlPost = "http://10.42.0.1:3000/nextQuestion";

                final String postData = "true";

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
                        params.put("NextQuestion", postData);
                        return params;
                    }
                };
                Volley.newRequestQueue(QuestionActivity.this).add(postRequest);
            }
        });

        // Button Scan Answers
        final Button scanAnswersBtn = (Button) findViewById(R.id.countAnswersBtn);
        scanAnswersBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //Intent
                Intent intentScanAnswers = new Intent(QuestionActivity.this, ScanAnswersActivity.class);
                startActivity(intentScanAnswers);
            }
        });

        //Button Send all the results
        final Button statBtn = (Button) findViewById(R.id.statButton);
        statBtn.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                //Post for results

                String urlPost = "http://192.168.0.178:3000/Results";
                //String urlPost = "http://10.42.0.1:3000/Results";

                final String answer1 = "5";
                final String answer2 = "15";
                final String answer3 = "0";
                final String rightAnswer = "6";

                final String noAnswer = "1";
                final String yesAnswer = "2";

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
                        final TextView answerView = (TextView) findViewById(R.id.answerView);

                        String contextAnswer = answerView.getText().toString();
                        if (contextAnswer.equals("Yes") || contextAnswer.equals("No"))
                        {
                            Map<String, String> params = new HashMap<>();
                            params.put("No", noAnswer);
                            params.put("Yes", yesAnswer);
                            return params;
                        }else
                        {
                            Map<String, String> params = new HashMap<>();
                            // the POST parameters:
                            params.put("Answer1", answer1);
                            params.put("Answer2", answer2);
                            params.put("Answer3", answer3);
                            params.put("RightAnswer", rightAnswer);
                            return params;
                        }
                    }
                };
                Volley.newRequestQueue(QuestionActivity.this).add(postRequest);
            }
        });

        //Button send an impulse to show the correct answer
        final Button correctAnswerBtn = (Button) findViewById(R.id.correctAnswerBtn);
        correctAnswerBtn.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                //Post for results
                String urlPost = "http://192.168.0.178:3000/CorrectAnswer";
                //String urlPost = "http://10.42.0.1:3000/CorrectAnswer";


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
                        params.put("ShowCorrectAnswer", "true");
                        return params;
                    }
                };
                Volley.newRequestQueue(QuestionActivity.this).add(postRequest);
            }
        });


    }

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

                //Log the whole response
                String Everything = jresponse.toString();
                Log.d("the whole jresponse: ", Everything);

                String nickname = jresponse.getString("Coursename");
                String question = jresponse.getString("Question");
                String correctAnswer = jresponse.getString("RightAnswer");


                //Filter on the clicked course
                if (nickname.equals(message))
                {
                    data.add(question);
                    rightAnswer.add(correctAnswer);
                }
                else
                    Log.d("Course", nickname);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public String checkYesOrNo(){
        String YesOrNo = "";
        try {
            JSONArray response = new JSONArray(readFromFile());



            for (int i = 0; i < response.length(); i++) {
                JSONObject jresponse = response.getJSONObject(i);

                String correctAnswer = jresponse.getString("RightAnswer");


                if(correctAnswer.equals("Yes") || correctAnswer.equals("No")){
                    YesOrNo = "true";
                }else {
                    YesOrNo = "false";
                }

            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return YesOrNo;
    }
}

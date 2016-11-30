package com.wido.jarjar;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

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

        final Button button = (Button) findViewById(R.id.nextQuestionBtn);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (questionCounter < data.size()-1){
                    questionCounter++;
                }
                else
                    questionCounter = 0;

                String question = data.get(questionCounter);
                String correctAnswer = rightAnswer.get(questionCounter);
                QuestionView.setText(question);
                AnswerView.setText(correctAnswer);
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

                String nickname = jresponse.getString("Coursename");
                String question = jresponse.getString("Question");
                String correctAnswer = jresponse.getString("RightAnswer");
                String Answer = jresponse.getString("Answer1");

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
}

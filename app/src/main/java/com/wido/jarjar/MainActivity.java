package com.wido.jarjar;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

public class MainActivity extends ActionBarActivity {

    public final static String EXTRA_MESSAGE = "com.example.myfirstapp.MESSAGE";

    ArrayList<String> data = new ArrayList<String>();
    Set<String> dataSet = new HashSet<String>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //call the filter
        courseFilter();

        //calls the listview
        listViewController();
    }

    //Take String data from file and convert in to json to handle it easy
    private void courseFilter(){
        try {
            JSONArray response = new JSONArray(readFromFile());

            for (int i = 0; i < response.length(); i++) {
                JSONObject jresponse = response.getJSONObject(i);

                String nickname = jresponse.getString("Coursename");

                Log.d("Course", nickname);

                data.add(nickname);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
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

    //Takes care of the listview together with the intent
    private void listViewController(){
        //Put the array in a set so the duplicates get cleared
        dataSet.addAll(data);
        data.clear();
        data.addAll(dataSet);

        ArrayAdapter adapter = new ArrayAdapter<String>(MainActivity.this, R.layout.activity_listview, data);

        final ListView listView = (ListView) findViewById(R.id.mobile_list);

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener(){
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id){
                //When Clicked
                //Toast
                Toast.makeText(getApplicationContext(), ((TextView) view).getText(), Toast.LENGTH_SHORT).show();

                //Intent
                Intent intent = new Intent(MainActivity.this, DisplayQuestionsActivity.class);
                String message = ((TextView) view).getText().toString();
                intent.putExtra(EXTRA_MESSAGE, message);
                startActivity(intent);
            }
        });

        listView.setAdapter(adapter);
    }
}

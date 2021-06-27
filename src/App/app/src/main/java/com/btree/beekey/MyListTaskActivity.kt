package com.btree.beekey;

import android.os.Bundle;
import android.util.Log
import android.view.View
import android.widget.ImageView
import android.widget.TextView

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView
import java.util.*

class MyListTaskActivity:AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_list_request);
        val resultTextView: TextView = findViewById(R.id.my_requesttask)
        resultTextView.text = "My Task"
        val diceImage: ImageView = findViewById(R.id.imageViewTaskRequest)
        diceImage.setImageResource(R.drawable.task_icon)

        val TaskList = mutableListOf<TaskRequest>()

        TaskList.add(TaskRequest("Khoa",50,"IT", "2001-01-01","abcc"))
        TaskList.add(TaskRequest("Khanh",60,"IT","2001-01-01","bdfdsfasdf"))
        TaskList.add(TaskRequest("Phuc",70,"IT","2001-01-01","afdsfadsfa"))
        TaskList.add(TaskRequest("Thanh",80,"IT","2001-01-01","adfdafasdf"))
        Log.d("xxxxx",TaskList.toString())
        val recyclerView = findViewById<RecyclerView>(R.id.recyclerView)
        recyclerView.adapter = TaskRequestAdapter(TaskList)

        recyclerView.setHasFixedSize(true)
    }
}

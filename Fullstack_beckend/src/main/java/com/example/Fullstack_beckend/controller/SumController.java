package com.example.Fullstack_beckend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
// @CrossOrigin(origins = "*") // allow React frontend to call backend
public class SumController {

    @PostMapping("/sum")
    public Result calculateSum(@RequestBody InputData data) {
        int result = data.getNum1() + data.getNum2();
        return new Result("Hey " + data.getName() + ", the sum is " + result);
    }

    // inner classes for request and response
    static class InputData {
        private int num1;
        private int num2;
        private String name;

        public int getNum1() { return num1; }
        public void setNum1(int num1) { this.num1 = num1; }
        public int getNum2() { return num2; }
        public void setNum2(int num2) { this.num2 = num2; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }

    static class Result {
        private String message;
        public Result(String message) { this.message = message; }
        public String getMessage() { return message; }
    }



    @GetMapping("/check")
    public String showdet(){
        return "working";
    }
}


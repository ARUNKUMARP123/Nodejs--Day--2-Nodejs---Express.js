// server.mjs
const express=require("express")
const bodyparser=require("body-parser")

const http_server = express();

http_server.use(bodyparser.json())


let Todos=[];

http_server.get("/",(req,res,next)=>{
res.send({success:true,message:"Todo fetched successfully",Todos});
});

const getRandomInt=(min,max)=>{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

    http_server.post("/create",(req,res,next)=>{
      Todos.push({...req.body,id:getRandomInt(1,1000)}) 
     res.send({"success":true,message:"Todo saved successfully"});
      });




      http_server.put("/update/:id",(req,res,next)=>{
        const copyTodos=Todos.map((d)=>d.id==req.params.id?{...d,...req.body}:d)
       Todos=copyTodos;
        res.send({"success":true,message:"Todo update successfully"});
        console.log(Todos)

         });
         http_server.delete("/delete/:id",(req,res,next)=>{
          const copyTodo=Todos.filter((d)=>d.id!=req.params.id)
          Todos=copyTodo;
          res.send({"success":true,message:"Todo delete successfully"});
           });  

// starts a simple http server locally on port 3000
http_server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`

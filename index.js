const mongoose =require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/user_management_system");
const express=require('express');
const app=express();

const port= process.env.PORT || 8080;

app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});


//for user routes
const userRoute=require('./routes/userRoute');
app.use('/',userRoute)
 
//for user routes
const adminRoute=require('./routes/adminRoute');
app.use('/admin',adminRoute)



app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}/`);
})
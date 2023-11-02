
const User=require('../models/userModel');
// const bcrypt=require("bcrypt");

// const securePassword=async(password)=>{
//     try{
//      const passwordHash=await bcrypt.hash(password,10);
//      return passwordHash;
//     }catch(error){
//         console.log(error.message);
//     }
// }
const loadRegister = async(req,res)=>{
    try {
        res.render('registration')
    } catch (error) {
        console.log(error.message)
    }
}

const insertUser=async(req,res)=>{
    console.log(req.body)
    try {
        //const spassword=await securePassword(req.body.password);
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile,
            password:req.body.password,
            is_admin:0,

        })

        const userData = await user.save();

        if(userData){
            res.render('registration',{message:'registration successfull'})
        }else{
            res.render('registration',{message:'registration failed'})
        }
    } catch (error) {
        console.log(error.message)
    }
}
// login user methods

const loginLoad = async(req,res)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message);
    }
}

// login verify!!

const verifyLogin = async(req,res)=>{
    try {

        const email = req.body.email;
        const password = req.body.password;
        
    const userData = await User.findOne({email:email})
       
        if(userData){

            const passwordMatch=userData.password
            if(passwordMatch==password){
                if(userData.is_verified!=0){

                    res.render('login',{message:'please verify your email'})

                }else{
                    req.session.user_id = userData._id;
                    res.redirect('/home')
                }
            }else{
                res.render('login',{message:'invalid password'})
            }



        }else{
            res.render('login',{message:'invalid information'})
        }



    } catch (error) {
        console.log(error.message)
    }
}

const loadHome = async(req,res)=>{
    try {
        
      const userData= await User.findById({_id:req.session.user_id})
        res.render('home',{user:userData});

    } catch (error) {

        console.log(error.message);
        
    }
}

const userLogout= async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/')
    } catch (error) {
        console.log(error.message);
    }
}

// user profile edit and update

const editLoad= async(req,res)=>{
    try {
        
        const id=req.query.id;

        const userData=await User.findById({_id:id})

        if(userData){
          
            res.render('edit',{user:userData})

        }else{
            res.redirect('/home')
        }

    } catch (error) {

        console.log(error.message);
        
    }
}

const updateProfile =async(req,res)=>{

    try {
        
       
        const userData = await User.findByIdAndUpdate(
            {_id:req.body.user_id},
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    address: req.body.address,
                    about: req.body.about,
                    profession:req.body.profession
                }
            },
            { new: true }
        );
        console.log(req.body.user_id);
        if (userData) {
            res.status(200).render('home', { user: userData });
        } else {
            res.status(404).send('User not found');
        }
        
    } catch (error) {
            console.log(error.message);
        }
    
    }
   
        
      
      
  
module.exports={
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout,
    editLoad,
    updateProfile
}
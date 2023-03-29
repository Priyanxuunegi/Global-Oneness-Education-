
import RegistrationModel from "../Models/RegistrationModel.js"
import StudentModel from "../Models/studentModel.js"

export const Applyregistration = async (req, res, next) => {

  console.log(req.body)
  const d = new Date()
  console.log(d.getDate());
 
  const user = new RegistrationModel(
    {
      firstname: req.body.userData.firstname,
      lastname: req.body.userData.lastname,
      email: req.body.userData.email ,
      phone: req.body.userData.phone ,
      guardianNumber: req.body.userData.guardianNumber ,
      class: req.body.userData.class,
      address: req.body.userData.address ,
      school: req.body.userData.school,
      courses : req.body.course,
      joiningDate : d ,
      photo : req.body.userData.photo
    }
  )
  console.log(user);
  

  let existingUser = await StudentModel.findOne({ email: user.email }) || await RegistrationModel.findOne({ email: user.email });
  if (existingUser) return res.status(400).json("Email already exist");
      
 
  const savedUser = await user.save();
  return res.status(200).json("Application submitted sucessfully!! \nYou will shortly be receiving response from us in your mail ");
}

import StudentModel from "../Models/studentModel.js";
import TeacherModel from "../Models/teacherModel.js";
import AdminModel from "../Models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        type: "login", // default
        user: "globalonenesseducation@gmail.com", // generated ethereal user
        pass: "dgolyzakhjbahmdh" // generated ethereal password
    },
});

//register a student
export const studentregister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        
        const newStudent = new StudentModel(req.body);
        const { studentId } = req.body;
        
        const oldStudent = await StudentModel.findOne({ studentId: studentId });
        if (oldStudent) return res.status(400).json({ error: "Student already exists" });
         
        const savedStudent = await newStudent.save();
        try {
            let info = await transporter.sendMail({
                from: '"GlobalOneness Education" globalonenesseducation@gmail.com', // sender address
                to: `${newStudent.email}`, // list of receivers
                subject: "Application accepted", // Subject line
                html: "<h2>Dear " + newStudent.firstname + "</h2> <h2>You can now login with ..</h2> <h4>Student ID : " +newStudent.studentId +"  </h4><h4>Password : student@123 </h4><h3>Please Dont Forget to change the password before further user</h3><h5>Best regards</h5><h2>GlobalOneness Educaiton </h2>", // html body
            });
            console.log("Message sent: %s", info.messageId); 
            return  res.status(200).json({ student: savedStudent });
        } catch (err) {
            console.log(err);
          return  res.status(500).json({ error: err.message }); 
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

//login of student
export const studentlogin = async (req, res) => {
    try {

        const { studentId, password } = req.body;
        console.log("id passs std", studentId, password);

        const student = await StudentModel.findOne({ studentId: studentId });
        console.log(student);

        if (!student) {
            return res.status(400).json({ error: "Invalid Student ID" });
        }
        console.log(student.password);

        const validPassword = await bcrypt.compare(password, student.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid Password" });
        }
        else {
            const token = jwt.sign({
                id: student._id,
                studentId: student.studentId
            },
                process.env.JWT_SECRET, { expiresIn: "24h" });
            res.status(200).json({ token: token, user: student });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

export const deleteStudent = async (req, res , next ) => {
   
    console.log(req.params.id);
 
   const student = await StudentModel.findOneAndDelete({_id : req.params.id});
 
   if(student)  return res.status(200).json("successfully removed ")
 
    
 }


//change password of student
export const changepassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, StudentId } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

        const oldStudent = await StudentModel.findOne({ studentId: StudentId });
        if (oldStudent) {
            const validPassword = await bcrypt.compare(oldPassword, oldStudent.password);
            if (!validPassword) {
                return res.status(401).json({ error: "Invalid Old Password" });
            }
            else {
                oldStudent.password = hashedPassword;
                const savedStudent = await oldStudent.save();
                res.status(200).json({ user: savedStudent });
            }
        }
        else {
            return res.status(400).json({ error: "Student not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message }); 
    }
}

//register a teacher
export const teacherregister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPaasword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPaasword;

        const newTeacher = new TeacherModel(req.body);
        const { teacherId } = req.body;

        const oldTeacher = await TeacherModel.findOne({ teacherId: teacherId });
        if (oldTeacher) return res.status(400).json({ error: "Teacher already exists" });

        const savedTeacher = await newTeacher.save();
        res.status(200).json({ teacher: savedTeacher });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }

}

//login of teacher
export const teacherlogin = async (req, res) => {
    try {
        const { teacherId, password } = req.body;
        console.log("id pass", teacherId, password);
        const teacher = await TeacherModel.findOne({ teacherId: teacherId });
        if (!teacher) return res.status(400).json({ error: "Invalid Teacher ID " });

        const validPassword = await bcrypt.compare(password, teacher.password);
        if (!validPassword) return res.status(400).json({ error: "Invalid Password" });

        const token = jwt.sign({
            id: teacher._id,
            teacherId: teacher.teacherId
        },
            process.env.JWT_SECRET, { expiresIn: "24h" });
        res.status(200).json({ token: token, user: teacher });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: err.message });
    }
};

export const changeteacherpassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, teacherId } = req.body;
        console.log(req);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

        const oldTeacher = await TeacherModel.findOne({ teacherId: teacherId });
        if (oldTeacher) {
            const validPassword = await bcrypt.compare(oldPassword, oldTeacher.password);
            if (!validPassword) {
                return res.status(401).json({ error: "Invalid Old Password" });
            }
            else {
                oldTeacher.password = hashedPassword;
                const savedTeacher = await oldTeacher.save();
                res.status(200).json({ user: savedTeacher });
            }
        }
        else {
            return res.status(400).json({ error: "Teacher not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}


//register a admin
export const adminregister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        const newAdmin = new AdminModel(req.body);
        const { adminId } = req.body;

        const oldAdminId = await AdminModel.findOne({ adminId: adminId });
        if (oldAdminId) return res.status(400).json({ error: "Admin already exists" });

        const savedAdmin = await newAdmin.save();
        res.status(200).json({ admin: savedAdmin });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

//login a admin
export const adminlogin = async (req, res) => {
    try {
        const { adminId, password } = req.body;
        const admin = await AdminModel.findOne({ adminId: adminId });
        if (!admin) return res.status(400).json({ error: "Invalid Admin ID" });

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) return res.status(400).json({ error: "Invalid Password" });
        const token = jwt.sign({
            id: admin._id,
            adminId: admin.adminId
        },
            process.env.JWT_SECRET, { expiresIn: "24h" });
        res.status(200).json({ token: token, user: admin });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}


export const changeadminpassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, adminId } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

        const oldAdmin = await AdminModel.findOne({ adminId: adminId });
        if (oldAdmin) {
            const validPassword = await bcrypt.compare(oldPassword, oldAdmin.password);
            if (!validPassword) {
                return res.status(401).json({ error: "Invalid Old Password" });
            }
            else {
                oldAdmin.password = hashedPassword;
                const savedadmin = await oldAdmin.save();
                res.status(200).json({ user: savedadmin });
            }
        }
        else {
            return res.status(400).json({ error: "Admin not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}


export const forgotpassword = async (req, res) => {
    console.log(req.body);
    const { email, userId, password, usertype } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (usertype === "student") {
        const oldStudent = await StudentModel.findOne({ studentId: userId });
        if (oldStudent) {
            if (oldStudent.email !== email) {
                return res.status(401).json({ error: "Invalid Email" });
            } else {
                oldStudent.password = hashedPassword;
                const savedStudent = await oldStudent.save();
                try {
                    let info = await transporter.sendMail({
                        from: '"GlobalOneness Education" globalonenesseducation@gmail.com', // sender address
                        to: `${email}`, // list of receivers
                        subject: "Password Change Successfully", // Subject line
                        html: "<h2>Dear " + oldStudent.firstname + "</h2><h4>This email is to confirm that your password has been successfully changed</h4><h4>Your new Password is " + password + " </h4><h3>Please Dont Forget to change the password before further user</h3><h5>Best regards</h5><h2>GlobalOneness Educaiton </h2>", // html body
                    });
                    console.log("Message sent: %s", info.messageId);
                    return res.status(200).json({ message: "Password Changed Successfully Check Your Mail For further Steps" });
                } catch (err) {
                    console.log(err);
                  return  res.status(500).json({ error: err.message });
                }
            }
        } else {
            return res.status(400).json({ error: "Invalid Student ID" });
        }
    } else if (usertype === "teacher") {
        const oldTeacher = await TeacherModel.findOne({ teacherId: userId });
        if (oldTeacher) {
            if (oldTeacher.email !== email) {
                return res.status(401).json({ error: "Invalid Email" });
            } else {
                oldTeacher.password = hashedPassword;
                const savedTeacher = await oldTeacher.save();
                try {
                    let info = await transporter.sendMail({
                        from: '"GlobalOneness Education" globalonenesseducation@gmail.com',
                        to: `${email}`,
                        subject: "Password Change Successfully", // Subject line
                        html: "<h2>Dear " + oldTeacher.firstname + "</h2><h4>This email is to confirm that your password has been successfully changed</h4><h4>Your new Password is " + password + " </h4><h3>Please Dont Forget to change the password before further user</h3><h5>Best regards</h5><h2>GlobalOneness Educaiton </h2>", // html body

                    }); console.log("Message sent: %s", info.messageId);
                    return res.status(200).json({ message: "Password Changed Successfully Check Your Mail For further Steps" });
                } catch (err) {
                    console.log(err);
                    return res.status(500).json({ error: err.message });
                }
            }
        }
        else {
            return res.status(400).json({ error: "Invalid Teacher ID" });
        }
    } else if (usertype === "admin") {
        const oldadmin = await AdminModel.findOne({ adminId: userId });
        if (oldadmin) {

            if (oldadmin.email !== email) {
                console.log("email not same", oldadmin.email, email);
                return res.status(401).json({ error: "Invalid Email" });
            } else {
                oldadmin.password = hashedPassword;
                const savedAdmin = await oldadmin.save();
                try {
                    let info = await transporter.sendMail({
                        from: '"GlobalOneness Education" globalonenesseducation@gmail.com',
                        to: `${email}`,
                        subject: "Password Change Successfully", // Subject line
                        html: "<h2>Dear " + oldadmin.firstname + "</h2><h4>This email is to confirm that your password has been successfully changed</h4><h4>Your new Password is " + password + " </h4><h3>Please Dont Forget to change the password before further user</h3><h5>Best regards</h5><h2>GlobalOneness Educaiton </h2>", // html body

                    }); console.log("Message sent: %s", info.messageId);
                   return  res.status(200).json({ message: "Password Changed Successfully Check Your Mail For further Steps" });
                } catch (err) {
                    console.log(err);
                    return res.status(500).json({ error: err.message });
                }
            }
        }else {
            return res.status(400).json({ error: "Invalid Admin ID" });
        }

    }
}
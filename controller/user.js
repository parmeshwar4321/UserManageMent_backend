const db = require('../model/user')
const bcrypt = require('bcrypt')
const { generateToken } = require('../Auth/jwt')



//get user by Id
exports.getusersByid = async (req, res) => {
    try {
        await db.find({ _id: req.params.id },
            {
                _id: true,
                First_Name: 1,
                Last_Name: 1,
                Email: 1,
                Department: 1,
                Role: 1
            })
            .then((result) => {
                res.status(200).send({ message: result })
                console.log(result);
            }).catch((err) => {
                res.status(404).send({ message: err.message })
            });
    } catch (error) {
        console.log(error.message);
        res.status(404).send({ message: error.message })
    }
}

//insert User
exports.createUsers = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.Password, 10)
        const userData = {
            First_Name: req.body.First_Name,
            Last_Name: req.body.Last_Name,
            Email: req.body.Email,
            Password: hashedPassword,
            Department: req.body.Department,
            Role: req.body.Role
        }
        await db.insertMany(userData)
            .then((result) => {
                res.status(200).send({ message: `User Sign-in Successfully...with UserId ::     ${result[0]._id}` })
                console.log(result);
            }).catch((err) => {
                res.status(404).send({ message: err.message })
            });

    } catch (error) {
        console.log(error.message);
        res.status(404).send({ message: error.message })

    }
}

//update user by Email
exports.updateUsers = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.Password, 10)
        const user = await db.updateMany({
            Email: req.body.Email
        },
            {
                $set: {
                    First_Name: req.body.First_Name,
                    Last_Name: req.body.Last_Name,
                    Email: req.body.Email,
                    Password: hashedPassword,
                    Department: req.body.Department,
                    Role: req.body.Role
                }
            })
            .then((result) => {
                res.status(200).send({ message: `User Updated Successfully... `})
                console.log(result);
            }).catch((err) => {
                console.log(err.message);
                res.status(404).send({ message: err.message })
            });
    } catch (error) {
        console.log(error.message);
        res.status(404).send({ message: error.message })
    }

}

//delete  user by id
exports.deleteusersByid = async (req, res) => {
    try {
        await db.deleteOne({ _id: req.params.id })
            .then((result) => {
                console.log(result);
                res.status(200).send({ message: `User Deleted Successfully... ` })
            }).catch((err) => {
                console.log(err.message);
                res.status(404).send({ message: err.message })
            });
    } catch (error) {
        console.log(error.message);
        res.status(404).send({ message: error.message })
    }
}

//login user
exports.loginUser = async (req, res) => {
    try {
        var userData = await db.find({ Email: req.body.Email })
        if (userData[0].Email) {
            if (bcrypt.compareSync(req.body.Password, userData[0].Password)) {
                const token = generateToken({ id: userData[0]._id, role: userData[0].Role })
                res.cookie('token', token).send({ message: `User Log-in Successfully with UserId :: ${userData[0]._id}` })
            } else {
                res.send({ message: "incorrect Password" })

            }
        } else {
            res.status(404).send({ message: "Email Required" })
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).send({ message: error.message })
    }
}

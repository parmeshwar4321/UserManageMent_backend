const db = require('../model/user')
const { generateToken } = require('../Auth/jwt')

//get All Users
exports.getUsers = async (req, res) => {
    try {
        if (req.userDetail.role != "admin") {
            res.status(401).send({ message: "YOU ARE NOT ADMIN" });
        }
        const data = await db.find({},
            {
                _id: true,
                First_Name: 1,
                Last_Name: 1,
                Email: 1,
                Department: 1,
                Role: 1
            })
        // res.status(200).send({ message: data });
        res.render('index',{data:data})
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}


//delete All user
exports.deleteAlluser = async (req, res) => {
    try {
        if (req.userDetail.role == "admin") {
            await db.deleteMany({})
                .then((result) => {
                    res.status(200).send({ message: result })
                    console.log(result);
                }).catch((err) => {
                    console.log(err.message);
                    res.status(404).send({ message: err.message })
                });
        } else {
            res.status(401).send({ message: "YOU ARE NOT ADMIN" });
            console.log('YOU ARE NOT ADMIN');
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).send({ message: error.message })
    }
}

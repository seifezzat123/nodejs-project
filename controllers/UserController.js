const user = require('../models/User');

const createUser = (req, res) => {

    const {
        Name,
        ID,
        UserId,
        Email,
        Role,
        Password,
        Passwordchanged,
        Address,
        PhoneNumber,
        Gender,
        Country,
        City

    }=req.body;
if(!Name||!ID||!UserId||! Email||!Role||! Password||!
        Passwordchanged||! Address||! PhoneNumber||! Gender ||!Country||!City)
{
return res.status(400).json({
    message:"All fields are required"
});
}

const newUser = {
    ID:user.length+1,
        Name,
        UserId,
        Email,
        Role,
        Password,
        Passwordchanged,
        Address,
        PhoneNumber,
        Gender,
        Country,
        City
};
user.push(newUser);
};

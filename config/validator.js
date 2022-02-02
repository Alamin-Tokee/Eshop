const { check, validationResult } = require("express-validator");

const userSignUpValidationRules = () =>{
    return [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Invalid Email").not().isEmpty().isEmail(),
        check("password", "Please enter a password with 4 or more character")
        .not()
        .isEmpty()
        .isLength({min:4}),
    ];
};

const userSignInValidationRules = () => {
    return [
        check("email", "Invalid email").not().isEmpty().isEmail(),
        check("password", "Invalid Password").not().isEmpty().isLength({min:4}),
    ];
};

const userContactUsValidationRules = () =>{
    return [
        check("name","Please enter a name").not().isEmpty(),
        check("email", "Please enter a valid email address")
        .not()
        .isEmpty()
        .isEmail(),
        check("message", "Please enter a message with at least 10 words")
        .not()
        .isEmpty()
        .isLength({min: 10}),
    ];
};


const validateSignup = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        var messages = [];
        errors.array().foreach((error)=>{
            messages.push(error.msg);
        });
        req.flash("error", messages);
        return res.redirect("/user/signup");
    }
    next();
};


const validateSigin = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        var messages = [];
        errors.array().foreach((error)=>{
            messages.push(error.msg);
        });
        req.flash("error", messages);
        return res.redirect("/user/signin");
    }
    next();
};

const validateContactUs = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        var messages = [];
        errors.array().foreach((error)=>{
            messages.push(error.msg);
        });
        console.log(messages);
        req.flash("error", messages);
        return res.redirect("/pages/contact-us");
    }
    next();
};


module.exports = {
    userSignUpValidationRules,
    userSignInValidationRules,
    userContactUsValidationRules,
    validateSignup,
    validateSigin,
    validateContactUs,
};
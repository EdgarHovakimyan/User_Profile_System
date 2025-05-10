const { User, Person, Manager } = require('../model');
const uuid = require('uuid');

const bcrypt = require('bcrypt');
const { sendEmail } = require('../email');
const { schemaRegister } = require('../schema');
class MainController {
  static async getLogin(req, res) {
    res.render('index');
  }
  static async getSignup(req, res) {
    console.log(req.session.signup);
    res.render('signup', {err: req.session.signup});
  }
  static async register(req, res) {
    try{
      const error = await schemaRegister.validate(req.body)
      if(error.error) {
        console.log('===>', error);
        req.session.signup = error.error.details[0].message
        res.redirect('/signup')
      }else{
        delete req.session.signup
        const { name, surname, age, email, role, password, confirmpassword } =
      req.body;
    const us = await User.findOne({ where: { email } });
    if (us) {
      console.log('email has already');
      res.redirect('/signup');
    } else {
      const token = uuid.v4();
      const hash = bcrypt.hashSync(password, 10);
      const user = await User.create({
        name,
        surname,
        age,
        email,
        role,
        password: hash,
        image: 'user.png',
        isVerify: 0,
        token,
      });
      if (role == 0) {
        await Person.create({ userId: user.id });
      } else if (role == 1) {
        await Manager.create({ userId: user.id });
      }
      const url = `http://localhost:8080/verify?email=${email}&token=${token}`;
      const html = `<p>Hello my dear ${name}</p> click --> <a href='${url}'>see</a>`;
      sendEmail(email, 'Register', html); //to,subject,hmtl
      res.redirect('/');
    }
  }
}catch (e) {
  console.log('==>' ,e);
  res.redirect('/signup')
  
}}
  static async isVerify(req,res) {
    console.log(req.query);
    const {email, token} = req.query
    const us = await User.findOne({where:{email,token}})
    if(us){
      await User.update({isVerify:1, token:''},{
        where: {id:us.id}
      })
      res.redirect('/')
    }
    else{
      res.send('error, email not found')
    }
  }
}

module.exports = { MainController };

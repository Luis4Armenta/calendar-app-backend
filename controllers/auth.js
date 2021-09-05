const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
  const { email, password } = req.body;  

  try {
    let user = await User.findOne({ email })

    if ( user ) {
      return res.status(400).json({
        ok: false,
        msg: 'Este email ya ha sido utilizado!'
      });
    }

    user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    
    await user.save();
  
    const token = await generateJWT(user.id, user.name);

  
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador el sitio web..'
    });
  }
}

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })

    if ( !user ) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario y/o contraseña son incorrectos'
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario y/o contraseña son incorrectos'
      });
    }

    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador el sitio web..'
    })
  }
}

const revalidToken = async (req, res = response) => {
  const { uid, name } = req;

  const token = await generateJWT(uid, name);
  
  res.json({
    ok: true,
    token
  });
}

module.exports = {
  createUser,
  loginUser,
  revalidToken
}
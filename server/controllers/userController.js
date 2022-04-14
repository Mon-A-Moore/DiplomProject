const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, CompanyUsers } = require('../models/models');


const generateJwt = (id, email, role,companyId) => {
  return jwt.sign({ id, email, role,companyId }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class UserController {

  async registration(req, res, next) {
    const { email, password, role,tel } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Некорренктный email или password'));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest('Пользователь с таким email уже существует')
      );
    }
		if(tel){
		const candidate2 = await User.findOne({ where: { tel } });
    if (candidate2) {
      return next(
        ApiError.badRequest('Пользователь с таким номером телефона уже существует')
      );
    }
	}
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword,tel });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'));
    }
    const token = generateJwt(user.id, user.email, user.role,user.companyId);
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role,req.user.companyId);
    return res.json({ token });
  }

  async getAllUsers(req, res) {

    const { id } = req.params;
		console.info(id); 
    const users = await User.findAll({
      where: { 'companyId':id },
    });
		console.info(users)
    return res.json(users);
  }

  async getOneUser(req, res) {
    const { id } = req.params;
    const user = await User.findOne({
      where: { 'id':id },
    });
    return res.json(user);
  }

	async checkUserCompany(req, res) {
    const { id } = req.body;
    const {email} = await User.findOne({
      where: { 'id':id },
    });
		let err;
		try{
		const {companyId} = await CompanyUsers.findOne({
      where: { 'email':email},
    });
		await User.update({ role: "EMPLOYEE",companyId:companyId }, { where: { id: id } });
		err=1;
		return res.json({companyId,err});
	}
	catch{
		err=-1;
		return res.json({err});
	}
  }
  async deleteId(req, res) {}
}

module.exports = new UserController();

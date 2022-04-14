const uuid = require('uuid');
const path = require('path');
const {
  Company,
  CompanyInfo,
  User,
  CompanyUsers,
} = require('../models/models');
const ApiError = require('../error/ApiError');

class CompanyController {
  async create(req, res, next) {
    try {
      let { name, info, id } = req.body;

      const { logo } = req.files;
      let fileNameLogo = uuid.v4() + '.jpg';
      logo.mv(path.resolve(__dirname, '..', 'static', fileNameLogo));

      const { img } = req.files;
      let fileNameImg = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileNameImg));

      const company = await Company.create({
        name,
        logo: fileNameLogo,
        img: fileNameImg,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) => {
          CompanyInfo.create({
            title: i.title,
            description: i.description,
            companyId: company.id,
          });
        });
      }
      const users = await User.findOne({
        where: { id: id },
      });
      await CompanyUsers.create({
        email: users.dataValues.email,
        companyId: company.id,
      });
      await User.update({ companyId: company.id }, { where: { id: id } });

      return res.json(company.id);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const companys = await Company.findAll();
    return res.json(companys);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const company = await Company.findOne({
      where: { id: id },
      include: [{ model: CompanyInfo, as: 'info' }],
    });

    return res.json(company);
  }



	async addUsersCompany(req, res, next) {
    try {
			let {companyusers,companyId } = req.body;
			companyusers = JSON.parse(companyusers);

        companyusers.forEach(async(i) => {
					if (!i.email) {
						return next(ApiError.badRequest('Некорренктный email или password'));
					}
			
					const candidate =  await CompanyUsers.findOne({ where: {'email':i.email}  });
					if (candidate) {
						return next(
							ApiError.badRequest('Пользователь с таким email уже существует')
						);
					}
          CompanyUsers.create({
            email: i.email,
            companyId: companyId,
          });
        });

      return;
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
	async getUsersCompany(req, res, next) {
    try {
			let { companyId } = req.body;
			
			const candidate = await  User.findOne({ where: {'companyId':companyId,'role':'ADMIN'}  });
			let companys = await CompanyUsers.findAll({ where: {'companyId':companyId}  });
			companys= companys.filter((i) => i.email !== candidate.email);

			return res.json(companys);

    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

	async deleteUsersCompany(req, res, next) {
    try {
			let { delcompanyusers,companyId } = req.body;
			
			delcompanyusers = JSON.parse(delcompanyusers);
			delcompanyusers.forEach((i)=> CompanyUsers.destroy({ where: { email: i.email,companyId:companyId } }))
			return;

    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteOne(req, res) {}
}

module.exports = new CompanyController();

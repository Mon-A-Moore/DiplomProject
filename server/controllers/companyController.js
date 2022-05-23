const uuid = require('uuid');
const path = require('path');
const {
  Company,
  CompanyInfo,
  User,
  CompanyUsers,
  CompanyNews,
} = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

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

  async update(req, res, next) {
    try {
      let { id, info, news } = req.body;

      /* companyusers.forEach(async(i) => {
					if (!i.email) {
						return next(ApiError.badRequest('Некорренктный email или password'));
					}
			
					const candidate =  await CompanyUsers.findOne({ where: {email:i.email,companyId:companyId}  });
					if (candidate) {
						return next(
							ApiError.badRequest(`Пользователь ${i.email} уже добавлен в вашу компанию`)
						);
					}
					
					const candidate2 =  await CompanyUsers.findOne({ where: {email:i.email,companyId:{ [Op.ne]: companyId }}  });
					if (candidate2) {
						return next(
							ApiError.badRequest(`Пользователь ${i.email} находится в другой компании`)
						);
					}
          CompanyUsers.create({
            email: i.email,
            companyId: companyId,
          });
					 const condidateT = User.findOne({ where: {email: i.email}});
				if(condidateT!==null)
				User.update({companyId:companyId }, { where: { email: i.email} });
					
        }); */

      return;
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
      include: [
        { model: CompanyInfo, as: 'info' },
        { model: CompanyNews, as: 'news' },
      ],
    });

    return res.json(company);
  }

  async addUsersCompany(req, res, next) {
    try {
      let { companyusers, companyId } = req.body;
      companyusers = JSON.parse(companyusers);

      companyusers.forEach(async (i) => {
        if (!i.email) {
          return next(ApiError.badRequest('Некорренктный email или password'));
        }

        const candidate = await CompanyUsers.findOne({
          where: { email: i.email, companyId: companyId },
        });
        if (candidate) {
          return next(
            ApiError.badRequest(
              `Пользователь ${i.email} уже добавлен в вашу компанию`
            )
          );
        }

        const candidate2 = await CompanyUsers.findOne({
          where: { email: i.email, companyId: { [Op.ne]: companyId } },
        });
        if (candidate2) {
          return next(
            ApiError.badRequest(
              `Пользователь ${i.email} находится в другой компании`
            )
          );
        }
        CompanyUsers.create({
          email: i.email,
          companyId: companyId,
        });
        const condidateT = User.findOne({ where: { email: i.email } });
        if (condidateT !== null)
          User.update({ companyId: companyId }, { where: { email: i.email } });
      });

      return;
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getUsersCompany(req, res, next) {
    try {
      let { companyId } = req.body;

      const candidate = await User.findOne({
        where: { companyId: companyId, role: 'ADMIN' },
      });
      let companys = await CompanyUsers.findAll({
        where: { companyId: companyId },
      });
      companys = companys.filter((i) => i.email !== candidate.email);

      return res.json(companys);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteUsersCompany(req, res, next) {
    try {
      let { delcompanyusers, companyId } = req.body;

      delcompanyusers = JSON.parse(delcompanyusers);
      delcompanyusers.forEach((i) => {
        CompanyUsers.destroy({
          where: { email: i.email, companyId: companyId },
        });
        const condidate = User.findOne({ where: { email: i.email } });
        if (condidate !== null)
          User.update({ companyId: null }, { where: { email: i.email } });
      });

      return;
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteOne(req, res) {}

  async CompanyInfoUpdate(req, res, next) {
    try {
      let { info, companyId } = req.body;
      const mass = await CompanyInfo.findAll({
        where: { companyId: companyId },
      });

      mass.forEach((item) => {
        const arr = info.filter((i) => item.dataValues.id === i.id);
        if (arr==false) {

          CompanyInfo.destroy({ where: { id: item.dataValues.id, companyId: companyId } });
        }
      });
      
      info.forEach((i) => {
        if (!i.title == '' || !i.description == '') {
          if (i.id < 0) {
            //create
            CompanyInfo.create({
              title: i.title,
              description: i.description,
              companyId: companyId,
            });
          } else {
            //update

            CompanyInfo.update(
              {
                title: i.title,
                description: i.description,
                companyId: companyId,
              },
              { where: { "id": i.id, "companyId": companyId } }
            );
          }
        }
      });
      return;
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async CompanyNewsUpdate(req, res, next) {
    try {
      //удаление
      let { news, companyId } = req.body;
      const mass = await CompanyNews.findAll({
        where: { companyId: companyId },
      });

      mass.forEach((item) => {
        const arr = news.filter((i) => item.dataValues.id === i.id);
        if (arr==false) {

          CompanyNews.destroy({ where: { id: item.dataValues.id, companyId: companyId } });
        }
      });
      
      news.forEach((i) => {
        if (!i.title == '' || !i.description == '') {
          if (i.id < 0) {
            //create
            CompanyNews.create({
              title: i.title,
              description: i.description,
              companyId: companyId,
              createdAt: new Date(i.createdAt),
            });
          } else {
            //update

            CompanyNews.update(
              {
                title: i.title,
                description: i.description,
                companyId: companyId,
                createdAt: new Date(i.createdAt),
              },
              { where: { "id": i.id, "companyId": companyId } }
            );
          }
        }
      });
      return;
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CompanyController();


const { Factory } = require('../models/models');
const ApiError = require('../error/ApiError');

class FactoryController {

	async create(req, res,next) {
		try{
			const { name,companyId } = req.body;
		await Factory.create({
				name: name,
        companyId: companyId,
      });
		return;
		}
		catch(e){
			next(ApiError.badRequest(e.message))
		}
  }


	async getAllfactoryCompany(req, res,next) {
		try{
			const {companyId } = req.params;
			/* console.info(companyId); */
			const factorys = await Factory.findAll({
        where: { companyId: companyId }});
				if (!factorys) {
					return next(
						ApiError.badRequest(`Фабрики компании не найдены`)
					);
				}
				
				/* console.info(factorys); */
		return res.json(factorys)
		}
		catch(e){
			next(ApiError.badRequest(e.message))
		}
  }


	async delete(req, res,next) {
		try{
			const {id} = req.params;
			Factory.destroy({ where: { id: id} });
			 
		return ;
		}
		catch(e){
			next(ApiError.badRequest(e.message))
		}
  }

}

module.exports = new FactoryController()
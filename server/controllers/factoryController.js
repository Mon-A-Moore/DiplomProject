const uuid = require('uuid')
const path = require('path')
const { Factory, FactoryInfo } = require('../models/models');
const ApiError = require('../error/ApiError');

class FactoryController {
	async create(req, res,next) {
		try{
    const { name,legal_address,companyId,info } = req.body;
    const {img} = req.files
		let fileName = uuid.v4() + ".jpg"
		img.mv(path.resolve(__dirname,'..','static',fileName))

		const factory = await Factory.create({name,legal_address,companyId,img: fileName})

		if (info) {
			info = JSON.parse(info)
			info.forEach(i =>
				FactoryInfo.create({
							title: i.title,
							description: i.description,
							companyId: factory.id
					})
			)
	}
		return res.json(factory)
		}
		catch(e){
			next(ApiError.badRequest(e.message))
		}
  }

	async getAll(req, res) {
		let {companyId, limit, page} = req.query
		page = page || 1
		limit = limit || 9
		let offset = page * limit - limit
		let factorys;
		if (!companyId) {
			factorys = await Factory.findAndCountAll({limit, offset})
		}
		if (companyId) {
			factorys = await Factory.findAndCountAll({where:{companyId}, limit, offset})
		}
		return res.json(factorys)
}

  async getOne(req, res) {
const{id}=req.params
const factory = await Factory.findOne(
	{
		where:{id},
		include:[{model:FactoryInfo, as:'info'}]

	}
)
return res.json(factory)
	}

	async deleteOne(req, res) {
		
	}

}

module.exports = new FactoryController()
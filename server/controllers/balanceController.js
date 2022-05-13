const {
  BalanceCalculation,
  СalculationInput,
  СalculationBalanceSettings,
  СalculationInputVariables,
  СalculationOutput,
  СalculationOutputVariables,
} = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

const axios = require('axios').default;
const $solver = axios.create({
  baseURL: process.env.SOLVER_APP_API_URL,
});
const AccordSolver = async (file) => {
  //console.info(file)
  const { data } = await $solver
    .post('api/InputVariables/AccordSolver', file, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    //.then(res=>(console.info(res)))
    .catch((err) => console.info(err));
  return data;
};

class BalanceController {

	//юзалось другим челом в таблице - полная срань, при больших объемах данных будет жопа
  async BAD_DateSort(req, res, next) {
    try {
      const { factoryId, dataStart, dataEnd } = req.params;
      const balance = await BalanceCalculation.findAll({
        order: [['createdAt', 'DESC']],
        where: {
          factoryId: factoryId,
          createdAt: {
            [Op.and]: [{ [Op.gte]: dataStart }, { [Op.lte]: dataEnd }],
          },
        },
        include: [
          {
            model: СalculationInput,
            include: [
              { model: СalculationInputVariables, as: 'BalanceInputVariables' },
              { model: СalculationBalanceSettings, as: 'balanceSettings' },
            ],
          },
          {
            model: СalculationOutput,
            include: [
              {
                model: СalculationOutputVariables,
                as: 'balanceOutputVariables',
              },
            ],
          },
        ], 
      });
      return res.json(balance);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

//правильное оптимизированное - юзается в графике, получаем даты , потом получаем нужный баланс по запросу -
	async DateSort(req, res, next) {
    try {
      const { factoryId, dataStart, dataEnd } = req.params;

      const balance = await BalanceCalculation.findAll({
        order: [['createdAt', 'DESC']],
        where: {
          factoryId: factoryId,
          createdAt: {
            [Op.and]: [{ [Op.gte]: dataStart }, { [Op.lte]: dataEnd }],
          },
        },
      });
      return res.json(balance);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { factoryId } = req.params;
      const balances = await BalanceCalculation.findAll({
        where: { factoryId: factoryId },
        include: [
          {
            model: СalculationInput,
            include: [
              { model: СalculationInputVariables, as: 'BalanceInputVariables' },
              { model: СalculationBalanceSettings, as: 'balanceSettings' },
            ],
          },
          {
            model: СalculationOutput,
            include: [
              {
                model: СalculationOutputVariables,
                as: 'balanceOutputVariables',
              },
            ],
          },
        ],
      });
      return res.json(balances);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }


	//идеально оптимизировано
  async getOne(req, res, next) {
    try {
      const { factoryId, id } = req.params;
      await BalanceCalculation.findOne({
        where: { id: id, factoryId: factoryId },
        include: [
          {
            model: СalculationInput,
            include: [
              { model: СalculationBalanceSettings, as: 'balanceSettings' },
            ],
          },
          {
            model: СalculationOutput,
          },
        ],
      }).then(async(balance)=>{
				
				balance.calculation_input.dataValues.BalanceInputVariables= await СalculationInputVariables.findAll({
					where:{ calculationInputId: balance.calculation_input.id}
				})
				balance.calculation_output.dataValues.balanceOutputVariables= await СalculationOutputVariables.findAll({
					where:{ calculationOutputId: balance.calculation_output.id} 			
				})
				return res.json(balance);
			})
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async balanceUpdate(req, res, next) {
    try {
      //console.info('fffffffffffffffffffffffffffffff');
      const { calculation_input,calculation_output } = req.body;
      const balance = req.body;
			//console.info('fdfdfd');
			//console.info(calculation_input);
			

      await СalculationBalanceSettings.update(
        {
          balanceSettingsConstraints:
            calculation_input.balanceSettings[0].balanceSettingsConstraints,
        },
        {
          where: {
            calculationInputId:
              calculation_input.balanceSettings[0].calculationInputId,
          },
        }
      );

      calculation_input.balanceSettings = {
        balanceSettingsConstraints: Number(
          calculation_input.balanceSettings[0].balanceSettingsConstraints
        ),
      };

      await calculation_input.BalanceInputVariables.forEach((item) =>
        СalculationInputVariables.update(
          {
            id: item.id,
            sourceId: item.sourceId,
            destinationId: item.destinationId,
            name: item.name,
            measured: item.measured,
            correction: item.correction,
            metrologicUpperBound: item.metrologicUpperBound,
            metrologicLowerBound: item.metrologicLowerBound,
            technologicUpperBound: item.technologicUpperBound,
            technologicLowerBound: item.technologicLowerBound,
            tolerance: item.tolerance,
            isMeasured: item.isMeasured,
            isExcluded: item.isExcluded,
          },
          {
            where: {
              calculationInputId: item.calculationInputId,
              idKey: item.idKey,
            },
          }
        )
      );

      
			const result = await AccordSolver(JSON.stringify(calculation_input));

			//await	СalculationOutput.destroy({ where: { balanceCalculationId: calculation_output.balanceCalculationId }});
      await СalculationOutput.update({
        calculationTime: result.calculationTime,
        disbalanceOriginal: result.disbalanceOriginal,
        disbalance: result.disbalance,
        globaltestValue: result.globaltestValue,
        status: result.status,

      },{
				where:{
					balanceCalculationId: calculation_output.balanceCalculationId
			}});

      await result.balanceOutputVariables.forEach((i,index) => {
        СalculationOutputVariables.update(
          {
            id: i.id,
            source: i.source,
            target: i.target,
            name: i.name,
            value: i.value,
            upperBound: i.upperBound,
            lowerBound: i.lowerBound,
          },
          {
            where: {
              calculationOutputId: calculation_output.id,
              idKey: calculation_output.balanceOutputVariables[index].idKey,
            },
          }
        );
      }); 

			/* const calculationoutput = await СalculationOutput.create({
        calculationTime: result.calculationTime,
        disbalanceOriginal: result.disbalanceOriginal,
        disbalance: result.disbalance,
        globaltestValue: result.globaltestValue,
        status: result.status,
        balanceCalculationId: balancecalculation.id,
      });

      await result.balanceOutputVariables.forEach((i) => {
        СalculationOutputVariables.create({
          id: i.id,
          source: i.source,
          target: i.target,
          name: i.name,
          value: i.value,
          upperBound: i.upperBound,
          lowerBound: i.lowerBound,
          calculationOutputId: calculationoutput.id,
        });
      });
 */
      balance.calculation_input = calculation_input;
      balance.calculation_output = result;


     // console.info("урааааааааааааааааааааааа");

      return res.json(balance);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteOne(req, res) {}

  async balanceCalculation(req, res, next) {
    try {
			const {factoryId} = req.params;

			
			
			
			//input=JSON.parse(input);
			//console.info('fffffffffffffffffffffffffffffffff');
			//console.info(input);
		//	let input =  require("./outdata.json"); 

		let input = req.body;
await AccordSolver(JSON.stringify(input)).then(async(result)=>{
		//	await AccordSolver(input).then(async(result)=>{

			if(result.status!=="Success"){
				
				const mes="Failed to solve balance task.";
			return res.json(mes);
			}
		//	console.info(result);
		 const balancecalculation = await BalanceCalculation.create({
        factoryId: factoryId,
      });
      const calculationinput = await  СalculationInput.create({
        balanceCalculationId: balancecalculation.id,
      });
			await СalculationBalanceSettings.create({
        calculationInputId: calculationinput.id,
        balanceSettingsConstraints:
          input.balanceSettings.balanceSettingsConstraints,
      });
 
       input.BalanceInputVariables.forEach((item) =>
        СalculationInputVariables.create({
          id: item.id,
          sourceId: item.sourceId,
          destinationId: item.destinationId,
          name: item.name,
          measured: item.measured,
          correction: item.correction,
          metrologicUpperBound: item.metrologicUpperBound,
          metrologicLowerBound: item.metrologicLowerBound,
          technologicUpperBound: item.technologicUpperBound,
          technologicLowerBound: item.technologicLowerBound,
          tolerance: item.tolerance,
          isMeasured: item.isMeasured,
          isExcluded: item.isExcluded,
          calculationInputId: calculationinput.id,
        })
      );
      //console.info(input);

      console.info(
        '......................................................................................'
      );
      
      //	console.info(result);
      //	console.info(result.calculationTime);
      const calculationoutput = await  СalculationOutput.create({
        calculationTime: result.calculationTime,
        disbalanceOriginal: result.disbalanceOriginal,
        disbalance: result.disbalance,
        globaltestValue: result.globaltestValue,
        status: result.status,
        balanceCalculationId: balancecalculation.id,
      });

       result.balanceOutputVariables.forEach((i) => {
        СalculationOutputVariables.create({
          id: i.id,
          source: i.source,
          target: i.target,
          name: i.name,
          value: i.value,
          upperBound: i.upperBound,
          lowerBound: i.lowerBound,
          calculationOutputId: calculationoutput.id,
        });
      });

      return res.json(result);
		})
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BalanceController();

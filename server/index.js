require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')


const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname,'static')));
app.use(fileUpload({}));
app.use('/api', router)

//Обработка ошибок, последний middleware
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running ${PORT}`);
		//	demo();
    });

  } catch (e) {
    console.log(e);
  }
};
start();




/* function getRandomArbitary(min, max)
{
  return Math.random() * (max - min) + min;
}


const standart=(data)=>{
	data.BalanceInputVariables.push(
		{
			"id": "00000000-0000-0000-0000-000000000001", 
			"sourceId": "NULL", 
			"destinationId": "00000000-0000-0000-0000-000000000001", 
			"name": "X1", 
			"measured": 10.005, 
			"correction": 0, 
			"metrologicUpperBound": 1000.0,
			"metrologicLowerBound": 0.0,
			"technologicUpperBound": 1000.0,
			"technologicLowerBound": 0.0,
			"tolerance": 0.2, 
			"isMeasured": true, 
			"isExcluded": false,
		}
	)
	return data;
}
//fruits.at(-1)
const generator=()=>{

	let data={
		"balanceSettings": {
			"balanceSettingsConstraints": 0
		},
		"BalanceInputVariables": [
			{},
	]
};
  const N = 100;
	let inmass= 1000;
	//let stValue=0, enValue=0;
	const input=getRandomArbitary(1,N/3);
	const output=getRandomArbitary(1,N/3);
	const sistemPoint=N-input-output-1;
	for (let i = 0; i < N; i++){
		data=standart(data);
	}
}
 */
/* const demo =   () => {
  
	let data =  require('./mass.json');
	 data.BalanceInputVariables.forEach((item=>{
		delete item.varType;
		delete item.exactRounding;
		delete item.inService;

		item.metrologicUpperBound = item.metrologicRange.max;
		item.metrologicLowerBound = item.metrologicRange.min;
		delete item.metrologicRange;

		item.technologicUpperBound = item.technologicRange.max;
		item.technologicLowerBound = item.technologicRange.min;
		delete item.technologicRange;
	}))

	
	const fs = require('fs'); 
	let outdata = JSON.stringify(data); 
  fs.writeFileSync('outdata.json', outdata); 
 console.log('This Functions uses');
//	let data = JSON.stringify(jsonData);
//console.info(data)
	//const fs = require('fs'); 
} */

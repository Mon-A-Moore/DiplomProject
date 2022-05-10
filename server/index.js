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

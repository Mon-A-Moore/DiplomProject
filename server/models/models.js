const sequelize = require('../db');
const { DataTypes, DOUBLE } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true ,allowNull: false },
  password: { type: DataTypes.STRING , allowNull: false },
	avatar: { type: DataTypes.STRING },
  tel: { type: DataTypes.STRING, unique: true ,allowNull: false },
  full_name: { type: DataTypes.STRING },
	role: { type: DataTypes.STRING, defaultValue: 'USER' },
});
const Company = sequelize.define('company', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
	logo: { type: DataTypes.STRING , allowNull: false},
  img: { type: DataTypes.STRING , allowNull: false} ,
});
const CompanyInfo = sequelize.define('company_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});
const CompanyUsers = sequelize.define('company_users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING , unique: true , allowNull: false },
});


//----------------------------------
//расчёт баланса
const BalanceCalculation = sequelize.define('balance_calculation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
});
//---
const СalculationInput = sequelize.define('calculation_input', {
  id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
}
,
{
	createdAt: false,
	updatedAt: false,
});

const СalculationBalanceSettings = sequelize.define('calculation_input_settings', {
  id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
	balanceSettingsConstraints: { type: DataTypes.ENUM(['0', '1']), allowNull: false},
}
,
{
	createdAt: false,
	updatedAt: false,
});



const СalculationInputVariables = sequelize.define('calculation_input_variables', {
  idKey: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id: { type: DataTypes.STRING },
  sourceId: { type: DataTypes.STRING },
  destinationId: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  correction: { type: DataTypes.DOUBLE },
  measured: { type: DataTypes.DOUBLE },
  metrologicLowerBound: { type: DataTypes.DOUBLE },
  metrologicUpperBound: { type: DataTypes.DOUBLE },
  technologicLowerBound: { type: DataTypes.DOUBLE },
  technologicUpperBound: { type: DataTypes.DOUBLE },
  tolerance: { type: DataTypes.DOUBLE },
  isExcluded: { type: DataTypes.BOOLEAN },
  isMeasured: { type: DataTypes.BOOLEAN },
}
,
{
	createdAt: false,
	updatedAt: false,
});

//-

//---
const СalculationOutput = sequelize.define('calculation_output', {
  id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  calculationTime: { type: DataTypes.DOUBLE },
  disbalanceOriginal: { type: DataTypes.DOUBLE },
  disbalance: { type: DataTypes.DOUBLE },
  globaltestValue: { type: DataTypes.DOUBLE },
  status: { type: DataTypes.STRING },
}
,
{
	createdAt: false,
	updatedAt: false,
});

const СalculationOutputVariables = sequelize.define('calculation_output_variables', {
  idKey: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id: { type: DataTypes.STRING },
  source: { type: DataTypes.STRING },
  target: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  value: { type: DataTypes.DOUBLE },
  upperBound: { type: DataTypes.DOUBLE },
  lowerBound: { type: DataTypes.DOUBLE },
},
{
	createdAt: false,
	updatedAt: false,
}
); 


Company.hasMany(User);
User.belongsTo(Company);



Company.hasMany(CompanyInfo, { as: 'info' });
CompanyInfo.belongsTo(Company);

Company.hasMany(CompanyUsers, { as: 'companyusers' });
CompanyUsers.belongsTo(Company);

Company.hasMany(BalanceCalculation);
BalanceCalculation.belongsTo(Company);

BalanceCalculation.hasOne(СalculationInput);
СalculationInput.belongsTo(BalanceCalculation);

СalculationInput.hasMany(СalculationBalanceSettings, { as: 'balanceSettings' });  
СalculationBalanceSettings.belongsTo(СalculationInput);


СalculationInput.hasMany(СalculationInputVariables,{ as: 'BalanceInputVariables' });
СalculationInputVariables.belongsTo(СalculationInput);

//----
BalanceCalculation.hasOne(СalculationOutput);
СalculationOutput.belongsTo(BalanceCalculation);

СalculationOutput.hasMany(СalculationOutputVariables,{ as: 'balanceOutputVariables' });
СalculationOutputVariables.belongsTo(СalculationOutput);


module.exports = {
  User,
  Company,
  CompanyInfo,
	CompanyUsers,
  //balance
	BalanceCalculation,//расчёт баланса
  СalculationInput,
  СalculationBalanceSettings,
  СalculationInputVariables,
	СalculationOutput,
	СalculationOutputVariables

};


const inputC = [
  // "name",
  "measured",
  "correction",
  "metrologicUpperBound",
  "metrologicLowerBound",
  "technologicUpperBound",
  "technologicLowerBound",
  "tolerance",
  // "isMeasured",
  // "isExcluded"
]

const outputC = [
  "balanceCalculationId",
  "calculationTime",
  "disbalance",
  "disbalanceOriginal",
  "globaltestValue",
  "status",
]
export default function makeData(balances) {
  const makeDataLevel = () => {
    return balances.map(b => {
      return {
        ...b,
        subRows: b.calculation_output.balanceOutputVariables.map((b2) => {
          return{
            ...b2,
            factoryId: b.factoryId,
            balancesId: b.id,
            calculation_input:[
              ...Object.entries(b.calculation_input.BalanceInputVariables.find(x => x.name === b2.name)).map(([key, value]) => {
                return {
                  name:key,
                  value:value
                }
              }).filter((ob)=>{
                return inputC.includes(ob.name)
              }),
            ],

            calculation_output:[
              ...Object.entries(b.calculation_output.balanceOutputVariables.find(x => x.name === b2.name)).map(([key, value]) => {
                return {
                  name:key,
                  value:value
                }
              })
            ],
            balance_data:[
              ...Object.entries(b.calculation_output).map(([key, value]) => {
                return {
                  name:key,
                  value:value
                }
              })
              .filter((ob)=>{
                return outputC.includes(ob.name)
              })
            ]
          }
        }),
      }
    })
  }

  return makeDataLevel()
}
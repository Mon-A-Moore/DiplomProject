
const inputC = [
  // "name",
  "measured",
  "correction",
  "metrologicUpperBound",
  "metrologicLowerBound",
  "technologicUpperBound",
  "technologicLowerBound",
  "tolerance",
  "isMeasured",
  "isExcluded"
]

const outputC = [
  // "calculationOutputId",
  "id",
  // "idKey",
  // "lowerBound",
  "name",
  "source",
  "target",
  // "upperBound",
  "value",
]

const outputB = [
  "balanceCalculationId",
  "calculationTime",
  "disbalance",
  "disbalanceOriginal",
  // "globaltestValue",
  // "status",
]

const transVar = {
  "measured": "Величина потока вещества",
  "correction": "Скорректированная величина потока вещества",
  "metrologicUpperBound": "Верхняя метрологическая граница значения потока вещества",
  "metrologicLowerBound": "Нижняя метрологическая граница значения потока вещества",
  "technologicUpperBound": "Верхняя технологическая граница значения потока вещества",
  "technologicLowerBound": "Нижняя технологическая граница значения потока вещества",
  "tolerance": "Абсолютная погрешность",
  "id": "Идентификатор потока",
  "name": "Имя потока",
  "source": "Идентификатор узла источника",
  "target": "Идентификатор узла цели",
  "value": "Значение потока",
  "balanceCalculationId": "Идентификатор расчетного баланса",
  "calculationTime": "Время расчёта",
  "disbalanceOriginal": "Дисбаланс оригинал",
  "disbalance": "Дисбаланс",
  "isMeasured": "Измеряемость потока",
  "isExcluded": "Поток учитывается",
}

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
                  value:value,
                  transVar:transVar[key]
                }
              }).filter((ob)=>{
                return inputC.includes(ob.name)
              }),
            ],

            calculation_output:[
              ...Object.entries(b.calculation_output.balanceOutputVariables.find(x => x.name === b2.name)).map(([key, value]) => {
                return {
                  name:key,
                  value:value,
                  transVar:transVar[key]
                }
              })
              .filter((ob)=>{
                return outputC.includes(ob.name)
              })
            ],
            balance_data:[
              ...Object.entries(b.calculation_output).map(([key, value]) => {
                return {
                  name:key,
                  value:value,
                  transVar:transVar[key]
                }
              })
              .filter((ob)=>{
                return outputB.includes(ob.name)
              })
            ]
          }
        }),
      }
    })
  }

  return makeDataLevel()
}
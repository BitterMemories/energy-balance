const DAY_TIME = 24 * 60 * 60 * 1000  //1天
const TRX_ENERGY = 30;  //一个TRX=30个能量
const TX_ENERGY = 14631;    //1笔交易需要消耗的能量
const DAY_TRANSACTION = 100000; //1天总交易量
const TRANSACTION_INTERVAL = DAY_TIME / DAY_TRANSACTION; //1笔交易间隔时间
const TOTAL_TRANSACTION = 1000 * DAY_TRANSACTION; //总交易量

let USED_ENERGY = 0; //已消耗的能量
let PLEDGE_ENERGY = 0;  //已抵押的能量
let PLEDGE_TRX = 0; //已抵押的TRX

function start() {
    for (let i = 1; i <= TOTAL_TRANSACTION; i++) {
        sendTransaction()

        recoveredEnergy(i)
        console.log(`总消耗${PLEDGE_TRX}TRX`)
    }
}


function recoveredEnergy(i) {
    //能量恢复
    const retrieveEnergy = TRANSACTION_INTERVAL / DAY_TIME * USED_ENERGY
    USED_ENERGY -= Math.ceil(retrieveEnergy)

    console.log(`第${i}笔交易；恢复能量：${Math.ceil(retrieveEnergy)},总消耗能量：${USED_ENERGY}`)
}


function sendTransaction() {
    let flag = true
    do {
        //检查能量是否足够此次交易
        if (PLEDGE_ENERGY - USED_ENERGY - TX_ENERGY < 0) {
            PLEDGE_TRX ++
            PLEDGE_ENERGY = PLEDGE_TRX * TRX_ENERGY;
        } else {
            flag = false
        }
    } while (flag)

    //每笔交易需要消耗能量
    USED_ENERGY += TX_ENERGY;
}


start()
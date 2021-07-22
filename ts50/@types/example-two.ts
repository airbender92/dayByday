/*
 * @Author: wangyunbo
 * @Date: 2021-07-21 08:55:09
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-21 13:59:00
 * @FilePath: \dayByday\ts50\@types\example-two.ts
 * @Description: file content
 */

function addVAT(price: number, vat: number = 0.2): number {
  return price * (1 + vat)
}

const vatPrice = addVAT(30, 0.2)

const varPriceWithDefault = addVAT(30)

const vatPriceWrong = addVAT('this is so', 'wong')

const vatPriceAlsoWrong = addVAT('HI')

let deliveryAddress: string[] = [
  "421"
]

deliveryAddress.push('hello')
deliveryAddress.push(123)
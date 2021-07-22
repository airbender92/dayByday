/*
 * @Author: wangyunbo
 * @Date: 2021-07-22 17:00:28
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-22 18:01:00
 * @FilePath: \dayByday\ts50\index03.ts
 * @Description: file content
 */
import type { Article } from './index02'

const book: Article = {
  price: 29,
  vat: 0.2,
  title: 'another'
}



class Discount {
  isPercentage: boolean
  amount: number

  constructor(isPercentage: boolean, amount: number) {
    this.isPercentage = isPercentage
    this.amount = amount
  }

  apply(article: Article) {
    if (this.isPercentage) {
      article.price = article.price - (article.price * this.amount)
    } else {
      article.price = article.price - this.amount
    }
  }
}


const discount: Discount = new Discount(false, 10)
discount.apply({
  price: 39,
  vat: 0.2,
  title: 'Form design patterns'
})

let allProductsTwentyBucks: Discount = {
  isPercentage: false,
  amount: 20,
  apply(article) {
    article.price = 20
  }
}

type DiscountType = {
  isPercentage: boolean,
  amount: number,
  apply(article: Article): void
}

let disco: DiscountType = new Discount(true, 0.2)

class TwentyPercentDiscount extends Discount {
  constructor() {
    super(true, 0.2)
  }

  apply(article: Article) {
    if (this.isValidForDiscount(article)) {
      super.apply(article)
    }
  }
  isValidForDiscount(article: Article) {
    return article.price <= 40
  }
}

let disco1: Discount = new TwentyPercentDiscount()
let disco2: TwentyPercentDiscount = new Discount(true, 0.3)
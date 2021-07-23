/*
 * @Author: wangyunbo
 * @Date: 2021-07-22 15:42:47
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-23 09:04:28
 * @FilePath: \dayByday\ts50\index02.ts
 * @Description: file content
 */

function selectDeliveryAddress(addressOrIndex: any): string {
  if (typeof addressOrIndex === 'number' &&
    addressOrIndex < deliveryAddress.length) {
    return deliveryAddress[addressOrIndex]
  }
  return addressOrIndex
}

const myFavouriteAddress = selectDeliveryAddress(true)
console.log(typeof myFavouriteAddress)

export interface ShopItem {
  title: string;
  price: number;
  vat: number;
  stock?: number;
  description?: string;
}

export type Article = {
  title: string,
  price: number,
  vat: number,
  stock?: number,
  description?: string
}

const movie: Article = {
  title: 'hello',
  price: 2,
  vat: 0,
  stock: 0,
  description: 'fff',
  rating: 5
}

const movBackup = {
  title: 'Helvetica',
  price: 9,
  vat: 0.19,
  stock: 1000,
  description: 'sss',
  rating: 5
}
const movie2: Article = movBackup

function createArticleElement(article: Article): string {
  const title = article.title
  const price = addVAT(article.price, article.vat)
  return `<h2>Buy ${title} for ${price}</h2>`
}


function isArticleInStock(article: Article) {
  if (article.stock) {
    return article.stock > 0
  }
  return false
}

const defaultOrder = {
  articles: [
    {
      price: 1929,
      vat: 0.2,
      title: 'Macbook Air'
    }, {
      price: 9,
      vat: 0,
      title: 'I feel smashin'

    }
  ],
  customer: {
    name: 'Frits',
    address: {
      city: 'Smasj=hing hill',
      zip: '90210',
      street: 'Whisker-ia lane',
      number: '1239'
    },
    dateOfBirth: new Date(2003, 9, 10)
  }
}

type Order = {
  articles: {
    price: number,
    vat: number,
    title: number
  }[],
  customer: {
    name: string,
    address: {
      city: string,
      zip: string,
      street: string,
      number: string
    },
    dateOfBirth: Date
  }
}

type Order2 = typeof defaultOrder

function checkOrders(orders: Order2[]) {
  let valid = true;
  for (let order of orders) {
    valid = valid && order.articles.length > 0
  }
  return valid
}



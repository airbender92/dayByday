/*
 * @Author: wangyunbo
 * @Date: 2021-07-29 08:58:54
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-30 08:57:26
 * @FilePath: \dayByday\ts50\index04.ts
 * @Description: file content
 */
class Article {
  public title: string
  private price: number

  constructor(title: string, price: number) {
    this.title = title
    this.price = price
  }
}

const article = new Article('Smash Book', 39)

console.log(article.price)

abstract class Discount {
  abstract isValid(article: Article): boolean;
  
  apply(article: Article) {
    // TODO:
  }
}

enum UserType {
  Admin,
  PayingCustomer,
  Trial
}
function showWarning(user: UserType) {
  switch (user) {
    case UserType.Admin:
      return false;
    case UserType.PayingCustomer:
      return false;
    case UserType.Trial:
      return false;
  }
}
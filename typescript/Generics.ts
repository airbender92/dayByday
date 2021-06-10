/*
 * @Author: wangyunbo
 * @Date: 2021-06-10 13:30:28
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-10 13:33:17
 * @Description: file content
 * @FilePath: \dayByday\typescript\Generics.ts
 */
// Generic interfaces
// ======Declaring a generic interface================================
interface IResult<T> {
  wasSuccessful: boolean;
  error: T;
}

var result: IResult<string> = {wasSuccessful: true, error: ''}
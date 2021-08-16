/*
 * @Author: wangyunbo
 * @Date: 2021-08-13 11:26:27
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-08-13 13:37:25
 * @FilePath: \dayByday\ts50\index07.ts
 * @Description: file content
 */

function search(term: string, tags?: string[]): Promise<Result[]>
function search(term: string, callback: (results: Result[]) => void,
  tags?: string[]
): void

function search(
  term: string,
  p2?: unknown,
  p3?: string[]
) {
  const callback =
    typeof p2 === 'function' ? p2 : undefined
  
  const tags =
    typeof p2 !== 'undefined' && Array.isArray(p2) ? p2 :
      typeof p3 !== 'undefined' && Array.isArray(p3) ? p3 :
        undefined;
  
  let queryString = `?query=${term}`

  if (tags && tags.length) {
    queryString += `&tags=${tags.join()}`
  }

  const results = fetch(`/search${queryString}`)
    .then(response => response.json())
  
  if (callback) {
    return void results.then(res => callback(res))
  } else {
    return results
  }
}


type SearchOverloadFn = {
  (
    term: string,
    tags?: string[] | undefined
  ): Promise<Result[]>;
  (
    term: string,
    callback: (results: Result[]) => void,
    tags?: string[] | undefined
  ): void;
}

const searchWithOverloads: SearchOverloadFn = (
  term: string,
  p2?: string[] | (results: Result[]) => void,
  p3?: string
) => {
  
}
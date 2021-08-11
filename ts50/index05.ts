/*
 * @Author: wangyunbo
 * @Date: 2021-08-03 08:05:59
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-08-10 09:54:17
 * @FilePath: \dayByday\ts50\index05.ts
 * @Description: file content
 */

type Result = {
  title: string,
  url: string,
  abstract: string
}

declare function search2(
  query: string,
  tags: string[]
): Result[]

function search(query:string, tags?: string[]): Promise<Result[]> {
  let queryString = `query=${query}`

  if (tags && tags.length) {
    queryString += `&tags=${tags.join()}`
  }

  return fetch(`/search${queryString}`)
    .then(res => res.json() as Promise<Result[]>)
}

type SearchFn = typeof search

type Query = {
  query: string,
  tags?: string[],
  assemble: (includeTags: boolean) => string
}

const query: Query = {
  query: 'Ember',
  tags: ['js'],
  assemble(includeTags = false) {
    let query = `?query={this.query}`
    if (includeTags && typeof this.tags !== 'undefined') {
      query += `&${this.tags.join(',')}`
    }
    return query
  }
}

type SearchFunc = (
  query: string, tags?: string[] | undefined
) => Promise<Result[]>


declare function displaySearch(
  inputId: string,
  outputId: string,
  search: SearchFunc
): void

const testSearch: SearchFunc = function(query, tags) {
  return Promise.resolve([{
    title: `the ${query} test book`,
    url: `/${query}-design-patterns`,
    abstract: `A practical book on ${query}`
  }])
}
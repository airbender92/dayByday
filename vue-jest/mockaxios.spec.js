/*
 * @Author: wangyunbo
 * @Date: 2021-09-06 11:02:52
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-06 11:02:53
 * @FilePath: \dayByday\vue-jest\mockaxios.spec.js
 * @Description: file content
 */
模拟模块#
假定有个从 API 获取用户的类。 该类用 axios 调用 API 然后返回 data，其中包含所有用户的属性：

// users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;
现在，为测试该方法而不实际调用 API (使测试缓慢与脆弱)，我们可以用 jest.mock(...) 函数自动模拟 axios 模块。

一旦模拟模块，我们可为 .get 提供一个 mockResolvedValue ，它会返回假数据用于测试。 In effect, we are saying that we want axios.get('/users.json') to return a fake response.

// users.test.js
import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});
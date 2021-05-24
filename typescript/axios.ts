/*
 * @Author: wangyunbo
 * @Date: 2021-05-21 09:40:45
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-21 09:41:30
 * @Description: file content
 * @FilePath: \dayByday\typescript\axios.ts
 */
/**
 
 axios.get() returns an AxiosResponse<any> object, where response.data is any.
 
 axios.get<Todo[]>() returns an AxiosResponse<Todo[]> object, where response.data is Todo[].
 
 So you can type response as:
 
 const response: AxiosResponse<Todo[]> = await axios.get("blabla");

 */
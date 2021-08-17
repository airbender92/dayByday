/*
 * @Author: wangyunbo
 * @Date: 2021-08-17 14:49:49
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-08-17 14:49:56
 * @FilePath: \dayByday\vue-jest\axiosMock.spec.js
 * @Description: file content
 */
import axios from 'axios'
import appOverviewer from "@/views/main/cluster/clusterOverviewer/appOverviewer";
import PageConfig from '@/views/main/cluster/clusterOverviewer/appOverviewer/config'
import DataViewerBox from '@/components/dataViewer';
 import HaElementCardPage from "@/components/HaElementCardPage";

let localVue;
let wrapper;
let store;
let state;
jest.mock('axios')

axios.CancelToken = {
    source: jest.fn(() => {
      return {
        token: 'token',
        cancel: jest.fn()
      }
    })
}
  
axios.get = jest.fn(() => Promise.resolve({
    data: {
    conf: {
      key: 'runningTime_runTime',
      label: '运行时间',
      type: 'query',
      prometheusQueryString: `avg(time() - node_boot_time_seconds{node="node"})`
    },
    data: {
        result:[{value: [11111, 11111]}]
      }
    },
    headers: {
      'content-disposition': ''
    }
  }))
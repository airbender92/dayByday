/*
 * @Author: wangyunbo
 * @Date: 2021-07-16 13:38:42
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-16 13:40:23
 * @FilePath: \dayByday\rescursive.js
 * @Description: file content
 */
/*
 * @Author: wangyunbo
 * @Date: 2021-07-15 14:20:52
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-16 13:38:17
 * @FilePath: \istorm-cnbr-ui\src\views\main\cluster\appManagement\paramExtract\config.js
 * @Description: file content
 */
import uniqBy from 'lodash/uniqBy'

// 递归删除节点
export function trimChecked(datas, checkedNodes) {
  checkedNodes.forEach(cNode => {
    function each(items) {
    (items || []).forEach((data, i) => {
      const pCheckedNode = cNode.id == data.id;
      if (pCheckedNode) {
        items.splice(i, 1)
      }
      if ((data.children || []).length > 0) {
        (data.children || []).forEach((kid) => {
          const checkedNode = cNode.id === kid.id;
          if (checkedNode) { data.children = data.children.filter(k => k.id !== checkedNode.id)}
        })
        each(data.children)
      }
    })
  }
  each(datas);
})

  return datas
}

// 树结构展平
export function tree_to_list(tree){
    return tree.reduce(function(acc, o) {       // check the docs for reducs in the link bellow
        acc.push(o)
      if (o.children)                             // if this object has children
            acc = acc.concat(tree_to_list(o.children)); // get their href and add (concat) them to the result
        return acc;
    }, []);
}

// 数组转树结构
export function list_to_tree(list) {
  // 去重
  list = uniqBy(list, function (e) {
      return e.id;
  });
  // 排序
  list.sort((first, second) => (first.level - second.level || first.index - second.index))
  let map = {}, node, roots = [], i;
  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }
  
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.pId !== null) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.pId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

// 格式化树结构
export function formatterArr(arr = []) {
      function each(data = [], floor = 1, pId=null) {
        data.forEach((e, index) => {
          e.floor = floor;
          e.pId = pId;
          e.index = index
          if ((e.children || []).length > 0) {
            each(e.children, floor + 1, e.id);
          }
        });
      }
      each(arr, 1);
      return arr
    }


export const fakedata = [
  {
    id: 'Workload',
    label: 'Workload',
    children: []
  },{
    id: 'Networking',
    label: 'Networking',
    children: [{
      id: 'NetworkingA',
      label: 'NetworkingA',
      children: []
    }]
  },{
    id: 'Config',
    label: 'Config',
    children: [{
      id: 'Config MapA',
      label: 'Config MapA',
      children: []
    },{
      id: 'Config MapB',
      label: 'Config MapB',
      children: []
    },{
      id: 'Config MapC',
      label: 'Config MapC',
      children: [
        {
          id: 'Config MapC-1',
          label: 'Config MapC-1',
          children: []
        }
      ]
    }]
  },
]

export default function () {
  return {
    source: {
      title: '源参数',
      list: [],
    },
    target: {
      title: '已提取参数',
      list: [],
      floatList: [],
    },
    buttons: [
       {event: 'toRightEvent', type: 'primary', disabled: true, text: '>', title: '向右' },
      {event: 'toLeftEvent', type: 'primary', disabled: true, text: '<', title: '向左' },
    ]
  }
}
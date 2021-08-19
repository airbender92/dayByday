/*
 * @Author: wangyunbo
 * @Date: 2021-08-19 13:29:45
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-08-19 15:34:31
 * @FilePath: \dayByday\element-ui\合并单元格\spanRow.js
 * @Description: file content
 */

let rowspanArray;

function is(option, index) {
  for (const o of option) {
    if (o.index === index) {
      return true;
    }
  }
  return false;
}
function isDep(depOption, index) {
  for (const o of depOption) {
    if (o.index === index) {
      return true;
    }
  }
  return false;
}

function computeSpanRow(data, option, depOption) {
  rowspanArray = [];

  const temRow = [];
  for (const [i, d] of data.entries()) {
    for (const o of option) {
      const { index, field } = o;

      if (i === 0) {
        temRow[index] = 0;
        rowspanArray[index] = [];
        rowspanArray[index].push(1);

        for (const m of depOption) {
          if (i === 0) {
            rowspanArray[m.index] = [];
            rowspanArray[m.index].push(1);
          }
        }
      } else if (d[field] === data[i - 1][field]) {
        rowspanArray[index][temRow[index]] += 1;
        rowspanArray[index].push(0);
        for (const m of depOption) {
          if (m.depIndex === index) {
            rowspanArray[m.index][temRow[index]] = rowspanArray[index][temRow[index]];
            rowspanArray[m.index].push(0);
          }
        }
      } else {
        rowspanArray[index].push(1);
        temRow[index] = i;
        for (const m of depOption) {
          if (m.depIndex === index) {
            rowspanArray[m.index].push(1);
          }
        }
      }
    }
  }
}

function spanRow({ row, column, rowIndex, columnIndex }, data, option, depOption) {
  if (rowIndex === 0 && columnIndex === 0) {
    computeSpanRow(data, option, depOption);
  }

  if (is(option, columnIndex)) {
    const rowspan = rowspanArray[columnIndex][rowIndex];
    const colspan = rowspan > 0 ? 1 : 0;
    return {
      rowspan,
      colspan,
    };
  } if (isDep(depOption, columnIndex)) {
    const rowspan = rowspanArray[columnIndex][rowIndex];
    const colspan = rowspan > 0 ? 1 : 0;
    return {
      rowspan,
      colspan,
    };
  }
  return {
    rowspan: 1,
    colspan: 1,
  };
}

export default spanRow;

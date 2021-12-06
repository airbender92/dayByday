/*
 * @Author: wangyunbo
 * @Date: 2021-12-06 09:03:28
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-12-06 09:05:06
 * @FilePath: \dayByday\echarts\index.js
 * @Description: file content
 */
/**************************echatrts3*********************************** */
// 基于准备好的dom，初始化echarts实例
let myChart = echarts.init(document.getElementById('main'));
let myChart2 = echarts.init(document.getElementById('main2'));
let tempData = [
    {value:335, name:'直接访问:24.25%'},
    {value:310, name:'邮件营销aaaaaaaaaaaaaaaaaaaabbbbbaaaaaa:2.25%'},
    {value:234, name:'联盟广告aaaaaaaaaaaaaaaaaaadfafafdffffaaaaaaaa:1.04%'},
    {value:135, name:'视频广告aaaaaaaaaaaaaaaaaaa:2.11%'},
    {value:1548, name:'搜索引擎aaaaaaaaaaammmmmmmmmmmmmmmmmmmmmmmmmaaaaaaaaaaaaaaa:24.25%'}
]
// 指定图表的配置项和数据
let option = {
    title : {
        text: '某站点用户访问来源',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter(params) {
        	return tempData[params.dataIndex].name
        }
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '50%'],
            data: tempData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
myChart2.setOption(option);

// 使用刚指定的配置项和数据显示图表。
// console.log(myChart.getWidth())
// console.log(myChart.getHeight())

function getTextWidth(text) {
	var span = document.createElement("span");
    var resultWidth = 0;
    span.style.visibility = "hidden";
    span.style.fontSize = '12px';
    span.style.fontFamily = '"Microsoft YaHei" "Arial"';
    span.style.display = "inline-block";
    document.body.appendChild(span);
    if (typeof span.textContent != "undefined") {
        span.textContent = text;
    } else {
        span.innerText = text;
    }
    resultWidth = Math.ceil(parseFloat(window.getComputedStyle(span).width));
    document.body.removeChild(span);
    return resultWidth;
}

function clipText(text, obj, totalWidth) {
	let textArr = text.split(':')
	let frontText = textArr[0]
	let tailText = textArr[1]
	let pointText = '...:'
	let tailTextWidth = getTextWidth(pointText + tailText)
	let controlWidth = obj.textAlign === 'left' ?
		totalWidth - obj.x : obj.x
	controlWidth = Math.floor(controlWidth)
	let resultText = ''
	for (let i = 1; i < frontText.length; i ++) {
		let tempText = frontText.slice(0, i)
		if (getTextWidth(tempText) + tailTextWidth > controlWidth) {
			resultText = frontText.slice(0, i - 1) + pointText + tailText
			return resultText;
			break;
		}
	}
}

function resetChart(charts, option){
	charts.setOption(option);
	let canvasWidth = charts.getWidth()
	let itemLayouts = []
	let idList = []
	let oldData = option.series[0].data
	let newdata = []
	console.log(charts)
	for (key in charts._chartsMap) {
		itemLayouts = charts._chartsMap[key]._data._itemLayouts
		idList = charts._chartsMap[key]._data._idList
	}
	itemLayouts = itemLayouts.map((o, index) => ({
		x: Math.ceil(o.label.x),
		textAlign: o.label.textAlign,
		text: idList[index]
	}))
	itemLayouts.forEach((o, i) => {
		let textWidth = getTextWidth(o.text)
		let bool = o.textAlign === 'left' ? 
			textWidth + o.x > canvasWidth : o.x - textWidth < 0
		let newText = bool ? clipText(o.text, o, canvasWidth) : o.text
		newdata.push({
			value: oldData[i].value,
			name: newText
		})
	})
	option.series[0].data = newdata
	charts.setOption(option);
}
resetChart(myChart, option)

/*************************************echarts4********************************************* */


var get = {
	byId: function(id) {
		return typeof id === "string" ? document.getElementById(id) : id
	},
	byClass: function(sClass, oParent) {
		var aClass = [];
		var reClass = new RegExp("(^| )" + sClass + "( |$)");
		var aElem = this.byTagName("*", oParent);
		for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
		return aClass
	},
	byTagName: function(elem, obj) {
		return (obj || document).getElementsByTagName(elem)
	}
};
// 基于准备好的dom，初始化echarts实例
let myChart = echarts.init(document.getElementById('main'), null, {renderer: 'svg'});
let myChart2 = echarts.init(document.getElementById('main2'), null, {renderer: 'svg'});
let tempData = [
    {value:335, name:'直接访问:24.25%'},
    {value:310, name:'邮件营销aaaaaaaaaaaaaaaaaaaabbbbbaaaaaa:2.25%'},
    {value:234, name:'联盟广告aaaaaaaaaaaaaaaaaaadfafafdffffaaaaaaaa:1.04%'},
    {value:135, name:'视频广告aaaaaaaaaaaaaaaaaaa:2.11%'},
    {value:1548, name:'搜索引擎aaaaaaaaaaammmmmmmmmmmmmmmmmmmmmmmmmaaaaaaaaaaaaaaa:24.25%'}
]
// 指定图表的配置项和数据
let option = {
    title : {
        text: '某站点用户访问来源',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter(params) {
        	return tempData[params.dataIndex].name
        }
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '50%'],
            data: tempData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
myChart2.setOption(option);

function getTextWidth(text) {
	var span = document.createElement("span");
    var resultWidth = 0;
    span.style.visibility = "hidden";
    span.style.fontSize = '12px';
    span.style.fontFamily = '"Microsoft YaHei" "Arial"';
    span.style.display = "inline-block";
    document.body.appendChild(span);
    if (typeof span.textContent != "undefined") {
        span.textContent = text;
    } else {
        span.innerText = text;
    }
    resultWidth = Math.ceil(parseFloat(window.getComputedStyle(span).width));
    document.body.removeChild(span);
    return resultWidth;
}

function clipText(text, obj, totalWidth) {
	let textArr = text.split(':')
	let frontText = textArr[0]
	let tailText = textArr[1]
	let pointText = '...:'
	let tailTextWidth = getTextWidth(pointText + tailText)
	let controlWidth = obj.textAlign === 'left' ?
		totalWidth - obj.x : obj.x
	controlWidth = Math.floor(controlWidth)
	let resultText = ''
	for (let i = 1; i < frontText.length; i ++) {
		let tempText = frontText.slice(0, i)
		if (getTextWidth(tempText) + tailTextWidth > controlWidth) {
			resultText = frontText.slice(0, i - 1) + pointText + tailText
			return resultText;
			break;
		}
	}
}

function resetChart(charts, option){
	charts.setOption(option);
	let main2 = myChart2.getDom()
	let text = get.byTagName('text', main2)
	let tspanArr = []
	let canvasWidth = charts.getWidth()
	let oldData = option.series[0].data
	let newdata = []
	for(let i = 0; i < text.length; i ++) {
		let node = get.byTagName('tspan', text[i])[0]
		tspanArr.push(node)
	}
	tspanArr = tspanArr.filter(o => {
		let p = o.getAttribute('text-anchor')
		return  p !== 'middle'
	})
	let itemLayouts = tspanArr.map(o => ({
		x: Math.ceil(o.getAttribute('x')),
		textAlign: o.getAttribute('text-anchor') === 'start' ?
			'left' : 'right',
		text: o.innerHTML
	}))
	itemLayouts.forEach((o, i) => {
		let textWidth = getTextWidth(o.text)
		let bool = o.textAlign === 'left' ? 
			textWidth + o.x > canvasWidth : o.x - textWidth < 0
		let newText = bool ? clipText(o.text, o, canvasWidth) : o.text
		newdata.push({
			value: oldData[i].value,
			name: newText
		})
	})
	option.series[0].data = newdata
	charts.setOption(option);

}

resetChart(myChart, option)
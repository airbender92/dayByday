<!--
 * @Author: wangyunbo
 * @Date: 2022-02-24 08:41:48
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-02-24 08:41:48
 * @FilePath: \dayByday\webpack&babel\semver.md
 * @Description: file content
-->
语义化版本控制模块-Semver

我真的不想写代码了 lv-2
2017年11月27日 12:03 ·  阅读 5540
关注
执行某些命令的时候，你是否遇到过提醒版本过低，需要升级版本的提示，那么对于版本号，是以一个怎样的规则来进行的限制和匹配的呢？ semver, 是一个语义化版本号管理的模块，可以实现版本号的解析和比较，规范版本号的格式。

版本号的基本规则
结构
版本号一般有三个部分，以.隔开，就像X.Y.Z，其中

X：主版本号，不兼容的大改动
Y：次版本号，功能性的改动
Z：修订版本号，问题修复
每个部分为整数（>=0），按照递增的规则改变。

在修订版本号的后面可以加上其他信息，用-连接，比如：

X.Y.Z-Alpha: 内测版
X.Y.Z-Beta: 公测版
X.Y.Z-Stable: 稳定版
范围规则
在package.json文件中，我们所安装的依赖，都会有版本号的描述，比如使用初始化的一个react工程，在它的package.json里自动安装的依赖

"devDependencies": {
    "react": "^15.6.1",
    "react-dom": "^15.6.1"
  }
复制代码
其实我们平时看到的版本号，不止有^前缀的，还有~，那么他们代表的含义是什么呢？

^: 允许在不修改[major, minor, patch]中最左非零数字的更改（匹配大于X、Y、Z的更新Y、Z的版本号）

在X.Y.Z结构的版本号中，X、Y、Z都是非负的整数，上面定义的意思就是说从左向右，遇到第一个非零数字是不可修改的，下一个数字可以更改，比如:

X、Y、Z都不为0，^15.6.1",最左的非零数字是15，所以X是不允许更新的，也就是说主版本号不会超过15，表示的就是版本号>=15.6.1 && <16.0.0
如果X为0，那么第一个非零数字就是Y，就只能对z做出修改，^0.1.2表示版本号>=0.1.2 && < 0.2.0
如果X、Y的数字都是0的话，第一个非零数字就是Z，表示的就是版本号不允许更新；^0.0.2，主版本号和次版本号都是0，修订号为非零，表示的就是版本号>=0.0.2 && < 0.0.3
~: 匹配大于X.Y.Z的更新Z的版本号

X、Y、Z都不为0，~1.2.3表示版本号>=1.2.3 && < 1.3.0
X为0，~0.2.3表示版本号>=0.2.3 && < 0.3.0，这种情况下，~等价于^
X、Y为0，0.0.3表示版本号>=0.0.3 && < 0.1.0
x: 可以替代X、Y、Z中任意一个，表示该位置可更新

1.2.x: >=1.2.0 && < 1.3.0
1.x: >=1.0.0 && < 2.0.0
*: 任意版本都可以
上面的x可以用*代替，其实，用x或*的地方可以省略不写，比如1.2.x和1.2表示的意思是一样的

-：包含第一个版本号和第二个版本号的范围 表示的是一个闭区间，-连接的两个版本号范围都包括

0.1.0-2: >=0.1.0 && < 3.0.0
0.1.0- 2.1.1: >=0.1.0 && <= 2.1.1
安装
npm install semver
复制代码
用法
// 引入模块
const semver = require('semver')
 
semver.clean(' =v1.1.1 ')；// 1.1.1，解析版本号，忽略版本号前面的符号
 
semver.valid('1.1.1'); // true，版本号是否合法
semver.valid('a.b.c'); // false
 
semver.satisfies('1.2.4', '1.2.3 - 1.2.5'); // true, 判断版本是否在某个范围
复制代码
这里只列举了部分用法，具体的可以在文档中查看。

实现原理
看了semver的源码，整理了部分方法的实现原理

clean
...
exports.clean = clean;
function clean(version, loose) {
  // 替换参数中的空格和符号
  var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
  return s ? s.version : null;
}
...
复制代码
valid
...
exports.valid = valid;
function valid(version, loose) {
  var v = parse(version, loose);
  return v ? v.version : null;
}
...
复制代码
clean和valid都用到了一个方法parse，这个方法是用来对版本号进行解析检查是否规范，最后返回一个规范的格式

parse
对版本号的格式进行解析，判断是否合法，这个方法在很多方法的实现里面都用到了

exports.parse = parse;
 
function parse(version, loose) {
  if (version instanceof SemVer)
    return version;
 
  if (typeof version !== 'string')
    return null;
 
  if (version.length > MAX_LENGTH)
    return null;
    
  // 是否应用宽松模式
  var r = loose ? re[LOOSE] : re[FULL];
  if (!r.test(version))
    return null;
 
  try {
    return new SemVer(version, loose);
  } catch (er) {
    return null;
  }
}
 
/* 
* 参数中的loose表示是否宽松检查版本号
* loose为true的时候，检查版本号的格式不会那么严格
* 比如定义数字标识符，就定义了一种宽松的匹配模式
* /
 
// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.
 
var NUMERICIDENTIFIER = R++;
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';  // 单个0或者0后面跟着0个或多个不为0的数字
var NUMERICIDENTIFIERLOOSE = R++;
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+'; // 0-9的1位或多位数字
 
复制代码
satisfies
exports.satisfies = satisfies;
function satisfies(version, range, loose) {
  try {
    // Range会判断输入的范围是否合法，并返回一个格式化之后的range
    range = new Range(range, loose);
  } catch (er) {
    return false;
  }
  return range.test(version);
}

复制代码
satisfies调用了Range，用于对用户输入的范围进行规范化

exports.Range = Range;
function Range(range, loose) {
  if (range instanceof Range) {
    if (range.loose === loose) {
      return range;
    } else {
      return new Range(range.raw, loose);
    }
  }
  if (range instanceof Comparator) {
    return new Range(range.value, loose);
  }

  if (!(this instanceof Range))
    return new Range(range, loose);

  this.loose = loose;
  
  /*
  * 将范围按照‘||’分开
  * 对每个范围进行解析，并且过滤出没有意义的范围
  */
  // First, split based on boolean or ||
  this.raw = range;
  // 用split将输入的范围划分成数组
  this.set = range.split(/\s*\|\|\s*/).map(function(range) {
    // 对数组的每一项进行解析
    return this.parseRange(range.trim());
  }, this).filter(function(c) {
    // throw out any that are not relevant for whatever reason
    return c.length;
  });
 
  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range);
  }
 
  this.format();
}
复制代码
/*
* 对用户输入的范围进行解析检验，返回规范的格式
*/
Range.prototype.parseRange = function(range) {
  var loose = this.loose;
  range = range.trim();  // 去掉前后的空格
  debug('range', range, loose);
  
  // 判断是否是宽松模式，并应用‘连字符’的正则去匹配替换
  // 将连字符的形式替换成比较符号的形式，`1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
  range = range.replace(hr, hyphenReplace);
  debug('hyphen replace', range);
 
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
  debug('comparator trim', range, re[COMPARATORTRIM]);
 
  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace);
 
  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace);
 
  // 将表示范围的字符串的多个空格替换成一个空格
  range = range.split(/\s+/).join(' ');
 
  // At this point, the range is completely trimmed and
  // ready to be split into comparators.
 
  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  // 将表示范围的字符串按照空格划分为数组，对每一个数组向进行解析检验，返回规范的表示并重新连接成字符串
  var set = range.split(' ').map(function(comp) {
    return parseComparator(comp, loose);
  }).join(' ').split(/\s+/);
  if (this.loose) {
    // 在宽松模式下，过滤掉所有不合法的比较器
    set = set.filter(function(comp) 
      return !!comp.match(compRe);
    });
  }
  set = set.map(function(comp) {
    return new Comparator(comp, loose);
  });
 
  return set;
};
 
/**
* 将规范后的范围字符串重新连接起来并返回
*/
Range.prototype.format = function() {
  this.range = this.set.map(function(comps) {
    return comps.join(' ').trim();
  }).join('||').trim();
  return this.range;
};
复制代码
参考：semver文档 semver源码地址
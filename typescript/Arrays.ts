/*
 * @Author: wangyunbo
 * @Date: 2021-05-31 11:54:55
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-01 08:50:19
 * @Description: file content
 * @FilePath: \dayByday\typescript\Arrays.ts
 */
// ============= Enums ====================
// By default all enum values are resolved to numbers. Let's say if you have something like

enum MiniType {
    JPEG,
    PNG,
    PDF
}
// the real value behind e.g. MiniType.PDF will be 2



enum MimeType2 {
    JPEG = 'image/jpeg',
    PNG = 'image/png',
    PDF = 'application/pdf'
   }
// this resolves the MimeType2.PDF to application/pdf

// ===================== get all enum values ========================
enum SomeEnum {A, B}

let enumValues: Array<string> = [];

for(let value in SomeEnum) {
    if(typeof SomeEnum[value] === 'number') {
        enumValues.push(value);
    }
}

enumValues.forEach(v => console.log(v))
//A
//B

// =============================================

enum SourceEnum {
    value1 = 'value1',
    value2 = 'value2'
}

enum AdditionToSourceEnum {
    value3 = 'value3',
    value4 = 'value4'
}

type TestEnumType = SourceEnum | AdditionToSourceEnum;

let TestEnum = Object.assign({}, SourceEnum, AdditionToSourceEnum);

function check(test: TestEnumType) {
    return test === TestEnum.value2;
}
console.log(TestEnum.value1)
console.log(TestEnum.value2 === 'value2')
console.log(check(TestEnum.value2))
console.log(check(TestEnum.value3))

// ===========extends for enum ========================
class Enum {
    constructor(protected value: string) {}

    public toString() {
        return String(this.value);
    }

    public is(value: Enum | string) {
        return this.value = value.toString();
    }
}

class SourceEnum extends Enum {
    public static value1 = new SourceEnum('value1');
    public static value2 = new SourceEnum('value2');
}

class TestEnum extends SourceEnum {
    public static value3 = new TestEnum('value3');
    public static value4 = new TestEnum('value4');
}

function check2(test: TestEnum) {
    return test === TestEnum.value2;
}
let value1 = TestEnum.value1;
console.log(value1.is('value1'))

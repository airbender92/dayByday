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
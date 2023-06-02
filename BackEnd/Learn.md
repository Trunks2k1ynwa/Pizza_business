# Schema
## Aliases
- Khi khai báo schema ta có thể sử dung các cụm từ viết tắt và ngắn gọn để giảm bớt kích thước lưu trữ nhưng khi get và set cho schema đó thì vẫn thao tác với propterty meaning bình thường.
- Cú pháp : alias:'property của field'
```js
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  n: {
    type: String,
    alias: 'fullName' // Định nghĩa alias cho trường "name"
  },
  a: {
    type: Number,
    alias: 'yearsOld' // Định nghĩa alias cho trường "age"
  }
});

const Person = mongoose.model('Person', personSchema);

// Tạo một đối tượng Person
const person = new Person({
  name: 'John Doe',
  age: 25
});

console.log(person.name);       // Output: John Doe
console.log(person.fullName);   // Output: John Doe (sử dụng alias "fullName" để truy cập trường "name")
console.log(person.age);        // Output: 25
console.log(person.yearsOld);   // Output: 25 (sử dụng alias "yearsOld" để truy cập trường "age")

```
## Options
### validateBeforeSave
- Xác thưc dữ liêu trước khi lưu vào csdl, mặc định là true tức là sẽ xác thực theo rules khi khai báo Schema type
- Validate cho 1 field như sau :
```js
- Ngoài SchemaType
nameSchema.path('fieldName').validate(function (value,err) {
  if(!condition) return err
  return boolean
})
- Trong SchemaType
  validate: {
      validator: function (value) {
        // Kiểm tra định dạng email
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(value);
      },
      message: 'Email is not valid'
    }
  validate: [validator.isEmail, 'Please provide a valid email'],
```

### timestamps
-  Tùy chọn timestamps được sử dụng để tự động thêm hai trường createdAt và updatedAt vào mỗi bản ghi trong cơ sở dữ liệu. Trường createdAt sẽ được tự động gán giá trị thời điểm tạo bản ghi, và trường updatedAt sẽ được tự động cập nhật giá trị thời điểm khi bản ghi được cập nhật.
# Schema type
String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
Decimal128
Map
Schema
UUID
BigInt
## SchemaType Options
- type
- required
- default
- select
- validate
- get
- set
- alias
- immutable
- transform

- required:[true,'Lỗi khi thiếu trường này']
- trim
- unique
- enum:['giá trị 1','giá trị 2']
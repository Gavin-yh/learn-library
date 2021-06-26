const fs = require('fs')
const acorn = require('acorn')
const acornWalk = require('acorn-walk')
const MagincString = require("magic-string")

const code = fs.readFileSync('./index.js')
const result = acorn.parse(code)

const magicCode = new MagincString(code.toString())

acornWalk.simple(result,{
    Literal(node) {
        // console.log(node)
    },
    //函数声明
    FunctionDeclaration(node){
        // console.log("function node",node)
    },
    VariableDeclaration(node){
       console.log(node)
       const { start, kind } = node
       if(kind === "const") {
          magicCode.overwrite(start, start + 5, "var")
       }else{
           magicCode.overwrite(start, start + 3, "var")
       }
    }
})

console.log("结果:" + magicCode)
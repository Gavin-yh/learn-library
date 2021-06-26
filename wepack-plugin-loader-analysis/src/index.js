// const css = require("./index.css")

import data from './demo.js'
// console.log(data)

let a = 1
let b = 3
const c = 4

function sum(...arg) {
    return arg.reduce((pre, next) => {
        return pre + next
    })
}
console.log(sum(a, b, c))
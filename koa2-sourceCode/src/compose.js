const add = (x, y) => x + y
const square = z => z * z

const compose = (...[first, ...other]) => (...arg) => {
    let ret = first(...arg)
    other.forEach(fn => {
        ret = fn(ret)
    })
    return ret
}

const fn = compose(add, square)

console.log(fn(1,2))
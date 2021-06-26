const _ = require('loader-utils');
const acorn = require('acorn')
const acornWalk = require('acorn-walk')
const magicString = require('magic-string')

module.exports = (context, map, meta) => {
    console.log(arguments)
    const result = acorn.parse(context)
    const codeM = new magicString(context)
    acornWalk.simple(result, {
        Literal(node) {
            // console.log(node)
        },
        VariableDeclaration(node) {
            const {start} = node
            node.kind === "let" ?
                codeM.overwrite(start, start + 3, "var") :
                codeM.overwrite(start, start + 5, "var")
        }
    })   
    return codeM.toString()
}
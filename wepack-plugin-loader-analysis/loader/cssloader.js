const path = require('path')
const csstree = require('css-tree');
const _ = require('loader-utils');

const fs = require('fs')

module.exports = function (context, map, meta) {
    const ast = csstree.parse(context)
    // const params = loaderUtils.parseQuery(this.resourceQuery);
    // if (params.param1 === "module") {
    //     console.log('hahhaha  css module')
    // }
    const options = _.getOptions(this)
    const { module } = options
    csstree.walk(ast, function (node) {
        if(module) {
            if (node.type === 'ClassSelector') {
                // console.log(node.type)
                node.name = 'hello_' + node.name;
            }
        }
    });

    // generate CSS from AST
    // console.log(csstree.generate(ast));
    console.log(csstree.generate(ast))
    fs.writeFileSync('./dist/index.css', csstree.generate(ast));
    return ''
}
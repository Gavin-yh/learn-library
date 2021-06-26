import _ from './util.js';

let patchs = {};
//全局索引  从零开始遍历
let globalIndex = 0;

function diff(oldTree, newTree) {
    dfswalk(oldTree, newTree, globalIndex);
    return patchs;
}

function dfswalk(oldTree, newTree, index) {
    //每一个元素都有一个补丁对象
    let currentPatchs = [];

    //如果新节点不存在 前提是在没有key的情况下 要是有key的话，就直接找
    if (!newTree) {
        console.log(1)
        currentPatchs.push({
            tepy: "REMOVE",
            index
        })
    }else if(_.isString(oldTree)){
        console.log(2)
        console.log(oldTree)
        console.log(newTree)
        if(_.isString(newTree) && oldTree != newTree){
            currentPatchs.push({
                tepy: "REPLACE",
                newNode: newTree
            })
        }
    }else if(oldTree.type == newTree.type) {
        console.log(3)
        //第一层的比较  不做那么多层的比较  只为根节点服务
        //两个节点的类型要一致
        //比属性
        //比子节点
        diffChildrens(oldTree.children, newTree.children);
    }

    if(currentPatchs.length > 0) {
        patchs[index] = currentPatchs
    }

}

function diffProps() {

}

function diffChildrens(oldChildren, newChildren) {
    oldChildren.forEach((child,index) => {
        dfswalk(child, newChildren[index], ++globalIndex)
    });
}

export {
    diff
}
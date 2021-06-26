/* <ul class = "list">
    <li class = "item">a</li>
    <li class = "item">b</li>
    <li class = "item">c</li>
    <li class = "item">d</li>
</ul>
 */

// {
//     taggetName,
//     props,
//     children
// }
import {createElement} from "./element.js";
import {diff} from "./diff.js"

let VirtualDoml = createElement("ul",{class:"list"},[
    createElement("li",{class:"item"},["a"]),
    createElement("li",{class:"item"},["b"]),
    createElement("li",{class:"item"},["c"]),
    createElement("li",{class:"item"},["d"])
])
let VirtualDom2 = createElement("ul",{class:"list-item"},[
    createElement("li",{class:"item"},["1"]),
    createElement("li",{class:"item"},["b"]),
    createElement("li",{class:"item"},["c"]),
    createElement("li",{class:"item"},["4"])
])

//得到补丁包
const patchs = diff(VirtualDoml, VirtualDom2)

console.log(patchs)
//补丁包 很多类型的补丁包 有文本节点发生变化， 属性发生变化
//补丁包
// 1.属性发生变化 {type:"ATTRS",attrs: {class:"list-item";}}
// 2. {type:"REMOVE", index:3} 在索引为3，节点下都干掉，拿新的节点去补上
// 3. {type:"TEXT",text:1}
//4.{type:"REPLACE",newNode:newNode}


//通过diff得到的补丁包  对比virtualDom1(老树)与virtualDom2(新树)得出的补丁
// [{
//     0:{type:"ATTRS",attrs: {class:"list-item"}},
//     2:{type:"TEXT",text:1},
//     8:{type:"TEXT",text:4}
// }]


//将虚拟Dom  渲染到页面
// $dom => virtualDom1 =>oldTree 对应的永远都是真实的Dom
// let $dom = render(virtualDom1)
// rederDom($dom, document.getElementById("app"))

//==================假设用户这个时候调用了SetState 而且已经完成了批处理  patch updata也处理完了 //




//将补丁包直接更新到$dom 
// Patchs($dom,$patchs)



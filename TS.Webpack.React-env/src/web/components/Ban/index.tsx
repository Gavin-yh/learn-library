import * as React from 'react'

const {useCallback, useState, useEffect} = React
const Ban = () => {
    let [state, setState] = useState(0)
    const onclick = useCallback(() => {   // useCallback  进行封装， 对这个组件只执行一些，要不然句柄传递会重新渲染
        setState(state ++)
    },[])
    //副作用，不要写错了，不然会无限的循环
    //三个生命周期合为一体
    useEffect(() => {
        //componentWillUpdate
        //componentPropreciver
        console.log('sssss')
        return () => {
            //卸载时，执行
        }
    }, [state]) //依赖
    return <h1 onClick = {onclick}> banner 组件，click me{state}</h1>
}

export default  Ban














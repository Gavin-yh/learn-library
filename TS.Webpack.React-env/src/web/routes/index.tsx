//根路由
//都说webpack打包慢，将全部的路由组件都打包起来，当然慢了，可以用异步组件

import * as React from 'react'
import { Switch, RouteProps, Route } from 'react-router-dom'
//RouteProps对路由进行限制，类型检查
import Home from '../components/home/index'
import Loading from '../components/loading/index'
const { Suspense, lazy } = React

const Ban = lazy( () => import(/*webpackChunkName:"banner"*/"../components/Ban/index"))


const routes:RouteProps[] = [
    {
        path:'/',
        exact: true,
        component: Home
    },
    {
        path: '/ban',
        exact: true,
        component: Ban
    }
]

const Routers = () => (
    //fallback  当组件还没有加载过来时，用loading组价
    <Suspense fallback = { <Loading />}>
        {/* Switch  对异步组件进行切换 ， 里面放Router，  */}
        <Switch>
            {
                routes.map( r => {
                    const {path, exact, component} = r
                    const LazyCom = component
                    return <Route key = {path + ''} path = {path} exact = {exact} render = {() => <LazyCom/>}></Route>
                })
            }
        </Switch>
    </Suspense>
)

export default Routers


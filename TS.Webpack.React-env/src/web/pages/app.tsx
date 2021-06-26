import * as React from 'react'
import {
    BrowserRouter
    // , Route
} from 'react-router-dom'
//这里不需要Route，因为会将Route单独拿出去
//BrowserRouter浏览器用的路由
import Routes from '../routes/index'
const App = () => {
return <BrowserRouter basename='/'>{Routes()}</BrowserRouter>
}

export default  App
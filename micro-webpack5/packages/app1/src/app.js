import React from 'react'
const { lazy, Suspense} = React

const App2 = lazy(() => import('app2/App2'))
const Button = lazy(() => import('app2/Button'))

const App = () => (
    <div>
        <h1>容器应用</h1>

        <Suspense fallback="loading">
            <App2 />
            <Button />
        </Suspense>
    </div>
)

export default App
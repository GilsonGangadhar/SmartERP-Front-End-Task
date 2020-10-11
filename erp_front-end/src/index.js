import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import Home from './components/Home'
import configureStore from './store/configureStore'
import '../src/style.css'

const store = configureStore()

store.subscribe(() => {
    console.log(store.getState())
})

const jsx = (
<Provider store={store}>
    <Home/>
</Provider>
)

ReactDom.render(jsx, document.getElementById('root'))
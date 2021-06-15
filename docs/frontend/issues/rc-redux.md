---
autoGroup-2: react
title: react redux
date: 2020-07-30
sidebar: "auto"
tags:
  - react
categories:
  - frontend
---


:::tip

- [redux](https://github.com/reduxjs/redux)
- [awesome-redux](https://github.com/xgrommx/awesome-redux)
- [redux-actions](https://github.com/redux-utilities/redux-actions)
- [redux-thunk](https://github.com/reduxjs/redux-thunk)
- [redux-immutable](https://github.com/facebook/immutable-js)
- [react/rematch](https://rematch.github.io/rematch)
- [redux-toolkit](https://github.com/reduxjs/redux-toolkit)

:::

- [Redux 关系图解](https://segmentfault.com/a/1190000011473973)

  ![react-redux-01](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/react-redux-01.png)

## Provider

```js
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store'

import App from './App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
```

## reducer

```js
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    default:
      return state
  }
}

export default todos
```

## combineReducers

```js
import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
  todos,
  visibilityFilter
})
```

## createStore

```js
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'

const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

## connect

```js
import { connect } from 'react-redux'

const increment = () => ({ type: 'INCREMENT' })
const decrement = () => ({ type: 'DECREMENT' })
const reset = () => ({ type: 'RESET' })

function mapStateToProps(state, ownProps) {
  const { visibilityFilter } = state
  const { id } = ownProps
  const todo = getTodoById(state, id)

  // component receives additionally:
  return { todo, visibilityFilter }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleTodo: () => dispatch(toggleTodo(ownProps.todoId)),
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    reset: () => dispatch(reset())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
```

## applyMiddleware

- redux-thunk

```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

// Note: this API requires redux@>=3.1.0
const store = createStore(rootReducer, applyMiddleware(thunk));
```

## Rematch

- install

```bash
yarn add @rematch/core
```

- step1: init

```js
import { init } from '@rematch/core'
import * as models from './models'

const store = init({
	models,
})

export default store
```

- step2: `models.js`

```js
export const count = {
	state: 0, // initial state
	reducers: {
		// handle state changes with pure functions
		increment(state, payload) {
			return state + payload
		},
	},
	effects: dispatch => ({
		// handle state changes with impure functions.
		// use async/await for async actions
		async incrementAsync(payload, rootState) {
			await new Promise(resolve => setTimeout(resolve, 1000))
			dispatch.count.increment(payload)
		},
	}),
}
```

- step3: `dispatch`

```js
// state = { count: 0 }
// reducers
dispatch({ type: 'count/increment', payload: 1 }) // state = { count: 1 }
dispatch.count.increment(1) // state = { count: 2 }

// effects
dispatch({ type: 'count/incrementAsync', payload: 1 }) // state = { count: 3 } after delay
dispatch.count.incrementAsync(1) // state = { count: 4 } after delay
```

- step 4: View

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import store from './store'

const Count = props => (
	<div>
		The count is {props.count}
		<button onClick={props.increment}>increment</button>
		<button onClick={props.incrementAsync}>incrementAsync</button>
	</div>
)

const mapState = state => ({
	count: state.count,
})

const mapDispatch = ({ count: { increment, incrementAsync } }) => ({
	increment: () => increment(1),
	incrementAsync: () => incrementAsync(1),
})

const CountContainer = connect(
	mapState,
	mapDispatch
)(Count)

ReactDOM.render(
	<Provider store={store}>
		<CountContainer />
	</Provider>,
	document.getElementById('root')
)
```

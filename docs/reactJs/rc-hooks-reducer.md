---
title: react hooks
date: 2020-07-21
sidebar: "auto"
tags:
  - react
---

## asyncDelay

```js
// 测试延迟
const asyncDelay = ms => new Promise(r => setTimeout(r, ms));
```

## Portal

```jsx
import React from "react";
import { createPortal } from "react-dom";

class Dialog extends React.Component {
  constructor() {
    super(...arguments);

    const doc = window.document;
    this.node = doc.createElement("div");
    doc.body.appendChild(this.node);
  }

  render() {
    return createPortal(
      <div class="dialog">{this.props.children}</div>, //塞进传送门的JSX
      this.node //传送门的另一端DOM node
    );
  }

  componentWillUnmount() {
    window.document.body.removeChild(this.node);
  }
}
```

## useModal

- create `Modal.js`

```jsx
// Modal.js
import React from 'react'
import ReactDOM from 'react-dom'

type Props = {
  children: React.ReactChild
  closeModal: () => void
}

const Modal = React.memo(({ children, closeModal }: Props) => {
  const domEl = document.getElementById('modal-root')

  if (!domEl) return null
  return ReactDOM.createPortal(
    <div>
      <button onClick={closeModal}>Close</button>
      {children}
    </div>,
    domEl
  )
})

export default Modal
```

- create `useModal.js`

```jsx
// useModal.js
import React, { useState } from "react";

import Modal from "./Modal";

// Modal组件最基础的两个事件，show/hide
export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  const RenderModal = ({ children }: { children: React.ReactChild }) => (
    <React.Fragment>
      {isVisible && <Modal closeModal={hide}>{children}</Modal>}
    </React.Fragment>
  );

  return {
    show,
    hide,
    RenderModal
  };
};
```

- use modal

```jsx
import React from "react";

import { useModal } from "./useModal";

const App = React.memo(() => {
  const { show, hide, RenderModal } = useModal();
  return (
    <div>
      <div>
        <p>some content...</p>
        <button onClick={show}>打开</button>
        <button onClick={hide}>关闭</button>
        <RenderModal>
          <p>这里面的内容将会被渲染到'modal-root'容器里.</p>
        </RenderModal>
      </div>
      <div id="modal-root" />
    </div>
  );
});

export default App;
```

## hooks-reducer

- create `store/context.js`

```jsx
import { createContext } from "react";

const Context = createContext();

export default Context;
```

- create `store/redux.js`

```jsx
import React, { useReducer } from "react";
import ContextContainer from "./context";

const defaultState = {
  count: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

const ContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <ContextContainer.Provider value={{ state, dispatch }}>
      {props.children}
    </ContextContainer.Provider>
  );
};

export { reducer, ContextProvider };
```

- use `index.js`

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { ContextProvider } from "./store/redux";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  rootElement
);
```

- use `App.js`

```jsx
import React, { useContext } from "react";
import "./styles.css";
import CounterContext from "./store/context";
export default function App() {
  const { state, dispatch } = useContext(CounterContext);
  return (
    <div className="App">
      <h1>React Hooks</h1>
      <h2>useContext and useReducer</h2>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+1</button>
      <span> - </span>
      <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
    </div>
  );
}
```

## hooks-redux

- create `store/index.js`

```jsx
import { combineReducer } from "./redux";
import User from "./userModule";
import Counter from "./counterModule";

const state = {
  user: User.state,
  counter: Counter.state
};

const reducers = combineReducer({
  user: User.reducer,
  counter: Counter.reducer
});

export default {
  state,
  reducers
};
```

- create `store/redux.js`

```jsx
import React, { useContext, useReducer } from "react";

const EMPTY = Symbol("store context");
const StoreContext = React.createContext(EMPTY);

export const Provider = ({ children, store }) => {
  // console.log(store)
  const [state, dispatch] = useReducer(store.reducers, store.state);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useRedux = () => {
  const store = useContext(StoreContext);
  if (store === EMPTY) {
    throw new Error("App Component must be wrapped with <Provider>");
  } else {
    const { state, dispatch } = store;
    return { state, dispatch };
  }
};

export const combineReducer = reducers => {
  return (state = {}, action) => {
    let result = Object.keys(reducers).reduce((newState, key) => {
      newState[key] = reducers[key](state[key], action);
      return newState;
    }, {});
    return result;
  };
};
```

- create `store/counterModule.js`

```jsx
const CounterModule = {
  state: {
    count: 0
  },
  reducer: (state, action) => {
    switch (action.type) {
      case "increment":
        return { ...state, count: state.count + 1 };
      case "decrement":
        return { ...state, count: state.count - 1 };
      default:
        return state;
    }
  }
};

export default CounterModule;
```

- create `store/UserModule.js`

```jsx
const UserModule = {
  state: {
    login: "未登录"
  },
  reducer: (state, action) => {
    switch (action.type) {
      case "SET_TOKEN":
        return { ...state, login: "已登录" };
      case "RESET_TOKEN":
        return { ...state, login: "未登录" };
      default:
        return state;
    }
  }
};

export default UserModule;
```

- use `index.js`

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "./store/redux";
import store from "./store/index";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);
```

- use `App.js`

```jsx
import React from "react";
import "./styles.css";
import { useRedux } from "./store/redux";

export default function App() {
  const { state, dispatch } = useRedux();

  return (
    <div className="App">
      <h1>React Hooks</h1>
      <h2>useContext and useReducer</h2>
      <p>Count:{state.counter.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+1</button>
      <span> - </span>
      <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
      <hr />
      <p>login:{state.user.login}</p>
      <button onClick={() => dispatch({ type: "SET_TOKEN" })}>登录</button>
      <span> - </span>
      <button onClick={() => dispatch({ type: "RESET_TOKEN" })}>退出</button>
    </div>
  );
}
```

## hooks-unstated-next

- create `store/index.js`

```jsx
import { useState } from "react";
import { createContainer } from "./redux";

const defaultState = {
  count: 0
};

function Store(initialState = defaultState) {
  let [state, setState] = useState(initialState);
  let increment = () => setState(pre => ({ count: pre.count + 1 }));
  let decrement = () => setState(pre => ({ count: pre.count - 1 }));
  return {
    state,
    increment,
    decrement
  };
}

export default createContainer(Store);
```

- create `store/redux.js`

```jsx
// https://github.com/jamiebuilds/unstated-next
import React from "react";

const EMPTY = Symbol("unstated-next");

export function createContainer(useHook) {
  let Context = React.createContext(EMPTY);

  function Provider(props) {
    let value = useHook(props.initialState);
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  }

  // eslint-disable-next-line no-shadow
  function useContainer() {
    let value = React.useContext(Context);
    if (value === EMPTY) {
      throw new Error("Component must be wrapped with <Container.Provider>");
    }
    return value;
  }

  return { Provider, useContainer };
}

export function useContainer(container) {
  return container.useContainer();
}
```

- use `index.js`

```jsx
import React from "react";
import ReactDOM from "react-dom";
import Counter from "./store/index";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Counter.Provider>
      <App />
    </Counter.Provider>
  </React.StrictMode>,
  rootElement
);
```

- use `App.js`

```jsx
import React from "react";
import "./styles.css";
import Counter from "./store/index";

export default function App() {
  const store = Counter.useContainer();
  return (
    <div className="App">
      <h1>React Hooks</h1>
      <h2>use unstated-next</h2>
      <p>Count: {store.state.count}</p>
      <div>
        <button onClick={store.increment}>+1</button> ~{" "}
        <button onClick={store.decrement}>-1</button>
      </div>
    </div>
  );
}
```

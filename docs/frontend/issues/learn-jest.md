---
title: Learn jest.js note
date: 2022-01-16
sidebar: "auto"
tags:
  - jest
categories:
  - frontend
---

## Web常见测试


> 来源于VUE： [https://cn.vuejs.org/v2/guide/testing.html](https://cn.vuejs.org/v2/guide/testing.html)



- 单元测试（unit）： Mocha、Jest ...
- 端到端 (E2E，end-to-end) 测试：cypress.io 、Nightwatch.js、Puppeteer ...



## 单元测试分类


- TDD - 测试驱动开发：先写测试用例再写代码
- BDD - 行为驱动开发：先写代码再写测试用例



## Jest介绍


- [https://jestjs.io/](https://jestjs.io/)
- Jest 是一款优雅、简洁的 JavaScript 测试框架。
- Jest 支持 Babel、TypeScript、Node、React、Angular、Vue 等诸多框架！



## 快速开始


- 安装 jest



```bash
npm install jest -D
or
yarn add jest -D
```


- 初始化配置文件



```bash
npx jest init  // -> jest.config.js
```


- demo



```javascript
// sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;

// sum.test.js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// package.json
{
  "scripts": {
    "test": "jest" // <- add
  }
}
```


## 常用配置参数


- `collectCoverage`: 覆盖
- `testMatch`: 匹配test文件
- `transform`: 匹配到文件后使用的转换loader
- `testEnvironment`: 测试环境，默认是node环境
- `testEnvironmentOptions`: 设置变量传递给`testEnvironment`中
- `moduleNameMapper`: 类似webpack中的别名
- `setupFiles` & `setupFilesAfterEnv`: 用于设置 testing environment
- demo



```javascript
const path = require('path');

module.exports = {
  testMatch: [
    '<rootDir>/src/test/unit/specs/*.spec.js',
  ],
  transform: {
    '^.+\\.js?$': 'babel-jest',
	'^.+\\.ts?$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['/node_modules/'],
  // ...
};
```


## 常用接口


- 常用的三个：`describe`、`test`(	别名`it`)、`expect`



```javascript
const sum = require('../src/sum');

describe('tests: sum commonjs', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
})
```


- 钩子函数：多次测试重复设置 `beforeEach & afterEach`
- 钩子函数：一次性设置 `beforeAll & afterAll`
- 钩子函数执行顺序



```javascript
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```


- describe 和 test 块的执行顺序



```javascript
describe('outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test 1', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('describe outer-b');

  test('test 1', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2
```


## 匹配器的使用


- `toBe`



```javascript
test('2 加 2 等于 4', () => {
  expect(2 + 2).toBe(4);
});
```


- `toEqual`: 递归检查对象或数组的每个字段



```javascript
test('对象赋值', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```


- `not`



```javascript
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
```


- `toBeNull` 只匹配 `null`
- `toBeUndefined` 只匹配 `undefined`
- `toBeDefined` 与 `toBeUndefined` 相反
- `toBeTruthy` 匹配任何 `if` 语句为真
- `toBeFalsy` 匹配任何`if` 语句为假
- 数字大多数的比较数字有等价的匹配器



```javascript
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```


- `toBeCloseTo`：对于比较浮点数相等



```javascript
test('两个浮点数字相加', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);      // 这句会报错，因为浮点数有舍入误差
  expect(value).toBeCloseTo(0.3); // 这句可以运行
});
```


- `toMatch`：字符串



```javascript
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```


- `toContain`：Arrays and iterables



```javascript
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});
```


- `toThrow`：抛出错误



```javascript
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);
});
```


## 异步代码


- 回调



```javascript
const fetchData = callback => setTimeout(() => callback&&callback('peanut butter'), 1000)

test('the data is peanut butter', done => {
  expect.assertions(1);
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }
  // 异步方法
  fetchData(callback);
});
```


- Promises：需要有返回值



```javascript
// 捕获：then
const fetchData = () => Promise.resolve('peanut butter')
test('the data is peanut butter', () => {
  expect.assertions(1);
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});

// 捕获：cath
const fetchData = () => Promise.reject('catch error')
test('the fetch fails with an error', () => {
  expect.assertions(1); // 验证一定数量的断言被调用
  return fetchData().catch(e => expect(e).toMatch('error'));
});
```


- 【推荐】`.resolves` / `.rejects`



```javascript
// resolves
const fetchData = () => Promise.resolve('peanut butter')
test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});

// rejects
const fetchData = () => Promise.reject('catch error')
test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});
```


- `Async/Await`



```javascript
// resolve
const fetchData = () => Promise.resolve('peanut butter')
test('the data is peanut butter', async () => {
  expect.assertions(1);
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

// reject error
const fetchData = () => Promise.reject('catch error')
test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```


- 【推荐】`async await`和 `.resolves or .rejects`一起使用



```javascript
// resolve
const fetchData = () => Promise.resolve('peanut butter')
test('the data is peanut butter', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});

// error
const fetchData = () => Promise.reject('catch error')
test('the fetch fails with an error', async () => {
  await expect(fetchData()).rejects.toMatch('error');
});
```


## Jest Mock


### `jest.fn`


- 没有定义函数内部的实现，返回`undefined`作为返回值



```javascript
test('测试jest.fn()调用', () => {
  let mockFn = jest.fn();
  let result = mockFn(1, 2, 3);

  // 断言mockFn的执行后返回undefined
  expect(result).toBeUndefined();
  // 断言mockFn被调用
  expect(mockFn).toBeCalled();
  // 断言mockFn被调用了一次
  expect(mockFn).toBeCalledTimes(1);
  // 断言mockFn传入的参数为1, 2, 3
  expect(mockFn).toHaveBeenCalledWith(1, 2, 3);
})
```


- `mockReturnValue`：定义返回值



```javascript
test('测试jest.fn()返回固定值', () => {
  let mockFn = jest.fn().mockReturnValue('default');
  // 断言mockFn执行后返回值为default
  expect(mockFn()).toBe('default');
})

test('测试jest.fn()内部实现', () => {
  let mockFn = jest.fn((num1, num2) => {
    return num1 * num2;
  })
  // 断言mockFn执行后返回100
  expect(mockFn(10, 10)).toBe(100);
})

test('测试jest.fn()返回Promise', async () => {
  let mockFn = jest.fn().mockResolvedValue('default');
  let result = await mockFn();
  // 断言mockFn通过await关键字执行后返回值为default
  expect(result).toBe('default');
  // 断言mockFn调用后返回的是Promise对象
  expect(Object.prototype.toString.call(mockFn())).toBe("[object Promise]");
})
```


- demo



```javascript
// fetch.js
import axios from 'axios';
export default {
  async fetchPostsList(callback) {
    return axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
      return callback(res.data);
    })
  }
}
// fetch.spec.js
import fetch from '../src/fetch.js'
test('fetchPostsList中的回调函数应该能够被调用', async () => {
  expect.assertions(1);
  let mockFn = jest.fn();
  await fetch.fetchPostsList(mockFn);

  // 断言mockFn被调用
  expect(mockFn).toBeCalled();
})
```


### `jest.mock`


- 模块内的方法是不会被jest所实际执行



```javascript
// events.js
import fetch from './fetch';
export default {
  async getPostList() {
    return fetch.fetchPostsList(data => {
      console.log('fetchPostsList be called!');  // not console called
      // do something
    });
  }
}

// events.spec.js
import events from '../src/events';
import fetch from '../src/fetch';
// mock整个fetch.js模块
jest.mock('../src/fetch.js');
test('mock 整个 fetch.js模块', async () => {
  expect.assertions(2);
  await events.getPostList();
  expect(fetch.fetchPostsList).toHaveBeenCalled();
  expect(fetch.fetchPostsList).toHaveBeenCalledTimes(1);
});
```


### `jest.spyOn`


```javascript
// events.js
import fetch from './fetch';
export default {
  async getPostList() {
    return fetch.fetchPostsList(data => {
      console.log('fetchPostsList be called!');  // console called
      // do something
    });
  }
}

// events.spec.js
import events from '../src/events';
import fetch from '../src/fetch';

test('使用jest.spyOn()监控fetch.fetchPostsList被正常调用', async() => {
  expect.assertions(2);
  const spyFn = jest.spyOn(fetch, 'fetchPostsList');
  await events.getPostList();
  expect(spyFn).toHaveBeenCalled();
  expect(spyFn).toHaveBeenCalledTimes(1);
})
```


## 测试库


- [https://testing-library.com/docs/](https://testing-library.com/docs/)



## 在 Vue 中使用


- 来源：[https://cn.vuejs.org/v2/guide/testing.html](https://cn.vuejs.org/v2/guide/testing.html)
- ​[Vue Test Utils](https://vue-test-utils.vuejs.org/zh/)：vue官方的偏底层的组件测试库
- [Vue Testing Library (@testing-library/vue)](https://testing-library.com/docs/vue-testing-library/intro/)



- el-input: textarea 设置默认高度
```javascript
<el-input
  type="textarea"
  :rows="10"
/>
```

- element-ui jest
```javascript
// HelloWorld.vue
<template>
  <div class="hello">
    <el-button>{{ msg }}</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

// HelloWorld.spec.js
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Button from '@/components/HelloWorld.vue'
import ElementUI from 'element-ui' // added

const localVue = createLocalVue() // added
localVue.use(ElementUI) // added

describe('shallowMount HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Button, {
      propsData: { msg },
      localVue
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
```

- jest测试：第三方组件
```javascript
import { shallowMount, createLocalVue } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import ElementUI from 'element-ui'
const localVue  = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)
localVue.use(ElementUI)

describe('HelloWorld.vue', () => {
  it('use localVue', () => {
    const wrapper = shallowMount(HelloWorld, {
      localVue
    })
  })
})
```


- tests router view: [code sinppets](https://github.com/lmiller1990/vue-testing-handbook/blob/master/demo-app/tests/unit/App.spec.js)
```javascript
import { mount, createLocalVue } from "@vue/test-utils"
import App from "@/App.vue"
import VueRouter from "vue-router"
import NestedRoute from "@/components/NestedRoute.vue"
import routes from "@/routes.js"

const localVue = createLocalVue()
localVue.use(VueRouter)

// mock components render
jest.mock("@/components/NestedRoute.vue", () => ({
  name: "NestedRoute",
  render: h => h("div")
}))

describe("App", () => {
  it("renders a child component via routing", async () => {
    const router = new VueRouter({ routes })
    const wrapper = mount(App, {
      localVue,
      router
    })

    router.push("/nested-route")
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(NestedRoute).exists()).toBe(true)
  })
})
```


- jest.mock & jest.fn:  [code snippets](https://github.com/lmiller1990/vue-testing-handbook/blob/master/demo-app/tests/unit/NestedRoute.spec.js)
```javascript
// NestedRoute.vue
<template>
  <div>
    Nested Route
    <div class="username">
      {{ $route.params.username }}
    </div>
  </div>
</template>

<script>
import { bustCache } from "@/bust-cache.js"
export default {
  name: "NestedRoute",

  beforeRouteLeave(to, from, next) {
    bustCache()
    next()
  }
}
</script>

// NestedRoute.spec.js
import { shallowMount, createLocalVue } from "@vue/test-utils"
import VueRouter from "vue-router"
import NestedRoute from "@/components/NestedRoute.vue"
import mockModule from "@/bust-cache.js"

jest.mock("@/bust-cache.js", () => ({ bustCache: jest.fn() }))
const localVue = createLocalVue()
localVue.use(VueRouter)

describe("NestedRoute", () => {
  it("renders a username from query string", () => {
    const username = "alice"
    const wrapper = shallowMount(NestedRoute, {
      mocks: {
        $route: {
          params: { username }
        }
      }
    })

    expect(wrapper.find(".username").text()).toBe(username)
  })

  it("calls bustCache and next when leaving the route", () => {
    const next = jest.fn()
    NestedRoute.beforeRouteLeave(undefined, undefined, next)

    expect(mockModule.bustCache).toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })
})
```


## How can I mock `window`?


### 方式一


- 使用`Object.defineProperty`代理劫持属性
- 相关包：[jest-useragent-mock](https://github.com/ariesjia/jest-useragent-mock)



### 方式二


- [jest-environment-jsdom-global](https://github.com/simon360/jest-environment-jsdom-global)
- 安装



```
yarn add --dev jest-environment-jsdom-global jest-environment-jsdom
```


- 配置`jest.config.js`



```
"jest": {
  "testEnvironment": "jest-environment-jsdom-global" // 默认是node
}
```


## jest Exceeded timeout of 5000 ms for a test #11607


- [Exceeded timeout of 5000 ms for a test #11607](https://github.com/facebook/jest/issues/11607)



## tsd
tsd: [https://github.com/SamVerschueren/tsd](https://github.com/SamVerschueren/tsd)


## package

- jest promise: flush-promises



## 相关链接


- [Github@Jest issues: Docs: setupFiles vs setupFilesAfterEnv #9314](https://github.com/facebook/jest/issues/9314)
- [jsdom](https://github.com/jsdom/jsdom)
- [jest-environment-jsdom](https://github.com/facebook/jest/tree/main/packages/jest-environment-jsdom)
- [Jest Mocking localstorage #2098](https://github.com/facebook/jest/issues/2098)
- [Unable to change window.location using Object.defineProperty #5124](https://github.com/facebook/jest/issues/5124)
- [Jest Unable to change window.location using Object.defineProperty #5124](https://github.com/facebook/jest/issues/5124)
- vue tests: [https://github.com/tonylua/vue-testing-handbook](https://github.com/tonylua/vue-testing-handbook)


---
title: axios请求封装
date: 2022-01-30
sidebar: "auto"
tags:
  - axios
categories:
  - frontend
---


## axios的cancelToken

> 原文出处: [https://segmentfault.com/a/1190000021290514](https://segmentfault.com/a/1190000021290514)

- 通过`axios.CancelToken.source`生成取消令牌token和取消方法cancel

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');
```

- 通过axios.CancelToken构造函数生成取消函数

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  })
});

// cancel the request
cancel();
```

- 封装取消请求逻辑

```js
// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()
/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
    if (!pending.has(url)) { // 如果 pending 中不存在当前请求，则添加进去
      pending.set(url, cancel)
    }
  })
}
/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  if (pending.has(url)) { // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}
/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}
```

- 在 axios 拦截器中使用

```js
axios.interceptors.request.use(config => {
  removePending(options) // 在请求开始前，对之前的请求做检查取消操作
  addPending(options) // 将当前请求添加到 pending 中
  // other code before request
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  removePending(response) // 在请求结束后，移除本次请求
  return response
}, error => {
  if (axios.isCancel(error)) {
    console.log('repeated request: ' + error.message)
  } else {
    // handle error code
  }
  return Promise.reject(error)
})
```

## axios超时重发

> 出处：https://github.com/axios/axios/issues/164#issuecomment-327837467

- axios 的超时是在 response 中处理的，所以要在 response 中添加拦截器：

```js
const RETRY_TIMEOUTS = [1, 3, 5, 10]; // seconds
const delay = RETRY_TIMEOUTS[config.retryCount] * 1000;

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) return Promise.reject(err);

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }

    // Increase the retry count
    config.__retryCount += 1;

    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || delay);
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
});
```

- 使用

```js
axios.get('/some/endpoint', { retry: 5, retryDelay: 1000 })
    .then(function(res) {
        console.log('success', res.data);
    })
    .catch(function(err) {
        console.log('failed', err);
    });
```

- 重新请求1次

```js
axios.interceptors.response.use(function(response){
// ....
}, function(error){
	var originalRequest = error.config;
	if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1 && !originalRequest._retry){
			originalRequest._retry = true
			return axios(originalRequest);
	}
});
```

## axios配置

```js
// 封装axios请求
import axios from "axios"
import qs from "qs"
import router from "../../router"
// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()
/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config) => {
	const url = [
		config.method,
		config.url,
		qs.stringify(config.params),
		qs.stringify(config.data),
	].join("&")
	config.cancelToken =
		config.cancelToken ||
		new axios.CancelToken((cancel) => {
			if (!pending.has(url)) {
				// 如果 pending 中不存在当前请求，则添加进去
				pending.set(url, cancel)
			}
		})
}
/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config) => {
	const url = [
		config.method,
		config.url,
		qs.stringify(config.params),
		qs.stringify(config.data),
	].join("&")
	if (pending.has(url)) {
		// 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
		const cancel = pending.get(url)
		cancel(url)
		pending.delete(url)
	}
}
/**
 * 清空 pending 中的请求（在路由跳转时调用）
 * @param {Object} config
 */
export const clearPending = () => {
	for (const [url, cancel] of pending) {
		cancel(url)
	}
	pending.clear()
}

const request = axios.create({
	timeout: 10000,
	withCredentials: false,
})

const CONFIG = {
	retry: 3,
	retryDelay: 1000,
}

// 添加请求拦截器
request.interceptors.request.use(
	(config) => {
		removePending(config)
		addPending(config)
		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

// 添加响应拦截器
request.interceptors.response.use(
	(response) => {
		// 请求返回结果，移除pending
		removePending(response.config)
		if (
			Number(response.data.stat) === 1 ||
			(response.data.result && Number(response.data.result.status) === 1)
		) {
			return Promise.resolve(response.data)
		} else {
			// 未登录
			if (response.data.stat == 9) {
				router.push({ name: "home" })
			}
			return Promise.reject(response)
		}
	},
	(error) => {
		// retry request: https://github.com/axios/axios/issues/164#issuecomment-327837467
		let config = error.config

		// If config does not exist or the retry option is not set, reject
		if (!config || !CONFIG.retry) return Promise.reject(error)

		// Set the variable for keeping track of the retry count
		config.__retryCount = config.__retryCount || 0

		// Check if we've maxed out the total number of retries
		if (config.__retryCount >= CONFIG.retry) {
			// Reject with the error
			return Promise.reject(error)
		}

		// Increase the retry count
		config.__retryCount += 1

		// Create new promise to handle exponential backoff
		let backoff = new Promise(function (resolve) {
			setTimeout(function () {
				resolve()
			}, CONFIG.retryDelay)
		})

		// Return the promise in which recalls axios to retry the request
		return backoff.then(function () {
			return request(config)
		})
	},
)

export default request
```


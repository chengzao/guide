---
title: 使用commitizen格式化提交规范
date: 2020-07-20
sidebar: "auto"
tags:
  - commitizen
categories:
  - tools
---

- [git commit 、CHANGELOG 和版本发布的标准自动化](https://zhuanlan.zhihu.com/p/51894196)
- [优雅的提交你的 Git Commit Message](https://juejin.im/post/5afc5242f265da0b7f44bee4)

## commitizen

### Adapter

- [Commitizen](https://github.com/commitizen/cz-cli): 替代你的 git commit

```bash
npm install -g commitizen
```

- 方式一：在全局安装适配器（Adapter)

<CodeBlock>

```bash
npm install -g cz-conventional-changelog

# 项目根目录下添加 .czrc 配置文件
{ "path": "cz-conventional-changelog" }

# 使用 git commit 替换为 git cz
git cz
```

</CodeBlock>

- 方式二：在项目安装适配器（Adapter)

<CodeBlock>

```bash
commitizen init cz-conventional-changelog --save-dev --save-exact --force

# commitizen 工具会自动在package.json中添加配置相应的配置

  "config": {
      "commitizen": {
          "path": "cz-conventional-changelog"
      }
  }

# 使用： package.json配置

  "script": {
      "commit": "git-cz",
  },
  "config": {
      "commitizen": {
        "path": "node_modules/cz-conventional-changelog"
      }
  }

# 命令运行
npm run commit
```

</CodeBlock>

- Adapter options

<CodeBlock>

```bash
feat    # 新功能
fix Bug   # 修复
docs    # 文档更新
style     # 代码的格式，标点符号的更新
refactor  # 代码重构
perf    # 性能优化
test    # 测试更新
build   # 构建系统或者包依赖更新
ci CI   # 配置，脚本文件等更新
chore   # 非 src 或者 测试文件的更新
revert  # commit 回退
```

</CodeBlock>

### 自定义 Adapter

- 安装 cz-customizable

```bash
npm i -g cz-customizable / npm i -D cz-customizable
```

- 修改 `.czrc` 或 `package.json` 中的 config 为

<CodeBlock>

```bash
# .czrc
{ "path": "cz-customizable" }

# package.json
"config": {
    "commitizen": {
      "path": "node_modules/cz-customizable"
    }
}
```

</CodeBlock>

- 同时在`~/` 或项目目录下创建 `.cz-config.js` 文件

<CodeBlock>

```js
"use strict";

module.exports = {
  types: [
    {
      value: "feat",
      name: "✨  feat:     A new feature"
    },
    {
      value: "fix",
      name: "🐞  fix:      A bug fix"
    },
    {
      value: "refactor",
      name:
        "🛠  refactor: A code change that neither fixes a bug nor adds a feature"
    },
    {
      value: "docs",
      name: "📚  docs:     Documentation only changes"
    },
    {
      value: "test",
      name: "🏁  test:     Add missing tests or correcting existing tests"
    },
    {
      value: "chore",
      name:
        "🗯  chore:    Changes that don't modify src or test files. Such as updating build tasks, package manager"
    },
    {
      value: "style",
      name:
        "💅  style:    Code Style, Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)"
    },
    {
      value: "revert",
      name: "⏪  revert:   Revert to a commit"
    }
  ],
  scopes: [],
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
};
```

</CodeBlock>

## changelog

- 安装 [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)

```bash
npm install -g conventional-changelog-cli
```

- use

```bash
conventional-changelog -p angular -i CHANGELOG.md -s
conventional-changelog -p angular -i CHANGELOG.md -s -r 0
```

## standard-version

- [standard-version](https://github.com/conventional-changelog/standard-version)
- local

```bash
npm i --save-dev standard-version

{
  "scripts": {
    "release": "standard-version"
  }
}

npm run release
```

- global

```bash
npm i -g standard-version

standard-version
```

- release-as, -r 指定版本号

```bash
主版本（major）,次版本（ minor） or 修订版（patch）

$ standard-version -r minor
# output 1.1.0
$ standard-version -r 2.0.0
# output 2.0.0
$ standard-version -r 2.0.0-test
# output 2.0.0-test
```

- prerelease, -p 预发版本命名

```bash
用来生成预发版本, 如果当期的版本号是 2.0.0，例如

$ standard-version --prerelease alpha
# output 2.0.0-alpha.0
```

- tag-prefix, -t 版本 tag 前缀

```bash
用来给生成 tag 标签添加前缀，例如如果前版本号为 2.0.0，则：

$ standard-version --tag-prefix "stable-"
# output tag: stable-v2.0.0
```

## 集成 npm

- package

```json
"scripts": {
    "release": "./scripts/release.sh",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0 && git add CHANGELOG.md && npm run changeissueurl",
    "changeissueurl": "replace 'https://github.com/myproject/issues/' 'https://redmine.example.com/' CHANGELOG.md"
},
```

- `release.sh`

<CodeBlock>

```shell
#!/bin/bash

# Release branch
master="master"
prefix="DTinsight_v"

git pull origin $master
echo "Current pull origin $master."

# Auto generate version number and tag
standard-version -r $release --tag-prefix $prefix

git push --follow-tags origin $master

echo "Git push origin $master"
echo "Release finished."
```

</CodeBlock>

## Commitlint

- [Commitlint: 校验你的 message](https://github.com/marionebl/commitlint)
- 安装 [@commitlint/config-conventional](https://github.com/marionebl/commitlint/tree/master/@commitlint/config-conventional)

```bash
npm i -D @commitlint/config-conventional @commitlint/cli
```

- 在项目目录下创建配置文件 `.commitlintrc.js`

<CodeBlock>

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-leading-blank": [1, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 72],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"]
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test"
      ]
    ]
  }
};
```

</CodeBlock>

- 针对自定义的 Adapter 进行 Lint

<CodeBlock>

```bash
npm i -D @commitlint/cli

# .commitlintrc.js 中写入
module.exports = {
	rules: {
		'body-leading-blank': [1, 'always'],
		'footer-leading-blank': [1, 'always'],
		'header-max-length': [2, 'always', 72],
		'scope-case': [2, 'always', 'lower-case'],
		'subject-case': [
			2,
			'never',
			['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
		],
		'subject-empty': [2, 'never'],
		'subject-full-stop': [2, 'never', '.'],
		'type-case': [2, 'always', 'lower-case'],
		'type-empty': [2, 'never'],
		'type-enum': [
			2,
			'always',
			['feat', 'fix', 'refactor', 'docs', 'test', 'chore', 'style', 'revert'],
		],
	},
}
```

</CodeBlock>

## husky

- [husky](https://github.com/typicode/husky)
- 安装 `npm install husky --save-dev`
- 使用

<CodeBlock>

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test",
      "pre-push": "npm test",
    }
  }
}

// 例如：
"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

</CodeBlock>

## 参考示例

### 默认 Adapter

- package.json

<CodeBlock>

```json
{
  "name": "demo",
  "version": "1.0.1",
  "main": "index.js",
  "scripts": {
    "lint": "eslint --debug src/**/*.js",
    "lint:write": "eslint src/**/*.js --fix",
    "prettier": "prettier --write src/**/*.js",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0 && git add CHANGELOG.md",
    "release": "standard-version"
  },
  "devDependencies": {
    "@commitlint/cli": "^7.2.1",
    "@commitlint/config-conventional": "^7.1.2",
    "cz-conventional-changelog": "^2.1.0",
    "eslint": "^5.12.0",
    "eslint-config-standard": "^12.0.0",
    "eslint-plugin-import": "^2.14.0",
    "eslint-plugin-node": "^8.0.1",
    "eslint-plugin-promise": "^4.0.1",
    "eslint-plugin-standard": "^4.0.0",
    "prettier": "^1.15.3",
    "eslint-plugin-prettier": "^3.0.1",
    "eslint-config-prettier": "^3.5.0",
    "husky": "^1.3.1",
    "lint-staged": "^8.1.0"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },
  "lint-staged": {
    "*.(js|jsx)": ["npm run lint:write", "git add"]
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "dependencies": {
    "standard-version": "^4.4.0"
  }
}
```

</CodeBlock>

- .commitlintrc.js

<CodeBlock>

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-leading-blank": [1, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 72],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"]
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test"
      ]
    ]
  }
};
```

</CodeBlock>

### 自定义 Adapter

- package.json

<CodeBlock>

```json
{
  "name": "demo",
  "version": "1.0.4",
  "main": "index.js",
  "scripts": {
    "test": "echo dev branch",
    "lint": "eslint --debug src/**/*.js",
    "lint:write": "eslint src/**/*.js --fix",
    "prettier": "prettier --write src/**/*.js",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0 && git add CHANGELOG.md",
    "release": "standard-version"
  },
  "devDependencies": {
    "@commitlint/cli": "^7.2.1",
    "cz-customizable": "^5.3.0",
    "eslint": "^5.12.0",
    "eslint-config-prettier": "^3.5.0",
    "eslint-config-standard": "^12.0.0",
    "eslint-plugin-import": "^2.14.0",
    "eslint-plugin-node": "^8.0.1",
    "eslint-plugin-prettier": "^3.0.1",
    "eslint-plugin-promise": "^4.0.1",
    "eslint-plugin-standard": "^4.0.0",
    "husky": "^1.3.1",
    "lint-staged": "^8.1.0",
    "prettier": "^1.15.3"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-customizable"
    }
  },
  "lint-staged": {
    "*.(js|jsx)": ["npm run lint:write", "git add"]
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

</CodeBlock>

- .cz-config.js

<CodeBlock>

```js
"use strict";

module.exports = {
  types: [
    {
      value: "feat",
      name: "✨  feat:     A new feature"
    },
    {
      value: "fix",
      name: "🐞  fix:      A bug fix"
    },
    {
      value: "refactor",
      name:
        "🛠  refactor: A code change that neither fixes a bug nor adds a feature"
    },
    {
      value: "docs",
      name: "📚  docs:     Documentation only changes"
    },
    {
      value: "test",
      name: "🏁  test:     Add missing tests or correcting existing tests"
    },
    {
      value: "chore",
      name:
        "🗯  chore:    Changes that don't modify src or test files. Such as updating build tasks, package manager"
    },
    {
      value: "style",
      name:
        "💅  style:    Code Style, Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)"
    },
    {
      value: "revert",
      name: "⏪  revert:   Revert to a commit"
    }
  ],
  allowCustomScopes: true
};
```

</CodeBlock>

- .commitlintrc.js

<CodeBlock>

```js
module.exports = {
  rules: {
    "body-leading-blank": [1, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 72],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"]
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "refactor", "docs", "test", "chore", "style", "revert"]
    ]
  }
};
```

</CodeBlock>

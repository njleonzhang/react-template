# react-template
scaffolding a react project with [Vue-cli](https://github.com/vuejs/vue-cli) for you inspired by [vue webpack tempalte](https://github.com/vuejs-templates/webpack)

* webpack3
* Mobx 3
* react-router 4
* stylus | scss | sass support
* hot reload
* http request proxy to avoid cross-site request in developing
* code lint when git commit
* dynamic port when default port is occupied

> hot realod with `react-router` + `mobx` can not be implemented by configuration. in this project, we abandon to keep `current store` after hot reload. but the update to store(both value and action) can work.

# Usage

```
npm install -g vue-cli
vue init njleonzhang/react-template my-project
```

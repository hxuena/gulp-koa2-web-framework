module.exports = {
  "rules":{},
  "extends": "eslint:recommended",
  "globals": {},
  "env":{
    'browser': true,
    'node': true,
    'es6': true
  },
  "parserOptions":{  //排除export和import的合法性检查
    "ecmaVersion": 6,
    "sourceType": "module"
  }
}
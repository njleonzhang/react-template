module.exports = {
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A React.js project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    },
    "serverBase": {
      "type": "string",
      "message": "the base string of your http server request",
      "default": "http://rapapi.org/mockjsdata/20993/"
    }
  },
  "filters": {
    // ".eslintrc.js": "lint",
    // ".eslintignore": "lint",
    // "config/test.env.js": "unit || e2e",
    // "test/unit/**/*": "unit",
    // "build/webpack.test.conf.js": "unit",
    // "test/e2e/**/*": "e2e",
    // "src/router/**/*": "router"
  },
  "skipInterpolation": "src/**/*.jsx",
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://vuejs-templates.github.io/webpack"
};

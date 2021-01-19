module.exports = {
  "presets": [
      "@babel/preset-env"
  ],
  "plugins": [
      ["@babel/transform-runtime"],
      ["babel-plugin-root-import",
        {
          "paths": [
            {
              "rootPathSuffix": "./src",
              "rootPathPrefix": "@root/"
            },
            {
              "rootPathSuffix": "./src/api",
              "rootPathPrefix": "@api/"
            },
            {
              "rootPathSuffix": "./src/lib",
              "rootPathPrefix": "@lib/"
            }                        
          ]
        }
      ]
  ]
}
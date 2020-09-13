#!/usr/bin/env node
require("@babel/register")
const {Command} = require('commander')
const program = new Command()
const babel = require('@babel/core')
const fs = require('fs')
const traverse = require('@babel/traverse')
const types = require('@babel/types')
const path = require('path')
const packageJson = JSON.parse(fs.readFileSync('package.json'))
program.version(packageJson.version)

/**
 * AST 预处理
 */
const code = fs.readFileSync(path.resolve(process.cwd(), 'scripts/git/clone.js')).toString()
const ast = babel.parse(code, {
  sourceType: 'module'
})
traverse.default(ast, {
  ExportDefaultDeclaration: function (path) {
    const delcaration = path.node.declaration
    const params = delcaration.params.map(o => {
      if(types.isIdentifier(o)) {
        return {
          name: o.name,
          required: true
        }
      }
      if(types.isAssignmentPattern(o)) {
        return {
          name: o.left.name,
          required: false
        }
      }
    })
  }
})

/**
 * 生成CMD
 */
const scriptsPath = path.resolve(process.cwd(), 'scripts')
fs.readdir(scriptsPath, function (err, folders) {
  if(err) return
  folders.forEach(folder => {
    const dir = path.join(scriptsPath, folder)
    const stats = fs.statSync(dir)
    if(stats.isDirectory()) {
      program
        .command(`${folder} <directive> [args...]`)
        .action(function (directive, args) {
          const script = require(require('path').resolve(process.cwd(), 'scripts', prefix, directive))
          if(args) {
            script.default(...args)
          }
        })
    }
  })
  program.parse(process.argv)
})
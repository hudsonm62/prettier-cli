import * as core from '@actions/core'
import { parse } from 'shell-quote'
import { run } from 'prettier/internal/cli.mjs'
import { lilconfig } from 'lilconfig'
import yaml from 'yaml'

function getArgs() {
  let args = process.argv.slice(2).join(' ') // from shell
  if (process.env.GITHUB_ACTIONS) args = core.getInput('args')
  return parse(args)
}

function loadYaml(filepath, content) {
  return yaml.parse(content)
}

const options = {
  loaders: {
    '.yaml': loadYaml,
    '.yml': loadYaml,
  },
}

async function loadPluginsFromConfig() {
  let result
  try {
    const explorer = lilconfig('prettier', options)
    result = await explorer.search()
  } catch (error) {
    console.log("Config not found or doesn't exist")
    return
  }

  // Attempt to load plugins from config
  if (result && result.config && result.config.plugins) {
    const plugins = await Promise.all(
      result.config.plugins.map(async (pluginPath) => {
        // Load each plugin
        try {
          const plugin = await import(pluginPath)
          return plugin
        } catch (error) {
          console.error('Failed to load Plugin:', error)
        }
      })
    )
    return plugins
  }
  return
}

async function runPrettier() {
  // Load plugins from configuration
  await loadPluginsFromConfig()
  await run(getArgs())
}

// Run the main function
try {
  runPrettier()
} catch (err) {
  if (process.env.GITHUB_ACTIONS) {
    core.setFailed(err.message)
  } else {
    console.log(err.message)
    process.exit(1)
  }
}

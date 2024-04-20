import { test } from 'bun:test'
import { existsSync } from 'node:fs'
import { $ } from 'bun'
import { getPrettierBin } from './_lib'

const testFile = '.tests/_lib.js'
const BIN = getPrettierBin()

// Check if the binary file exists
if (existsSync(BIN)) {
  test('Test File Lint (w/ bin)', async () => {
    await $`${BIN} '${testFile} --check'`
  })
  test('Test Project Lint (w/ bin)', async () => {
    await $`${BIN} '. --check'`
  })
}

test('Test File Lint (w/ node bundle)', async () => {
  await $`bun dist/node-prettier.mjs '${testFile} --check'`
})
test('Test Project Lint (w/ bundle)', async () => {
  await $`bun dist/node-prettier.mjs '. --check'`
})

test('Test File Lint (w/ node bundle)', async () => {
  await $`bun dist/node-prettier.mjs '${testFile} --check'`
})
test('Test Project Lint (w/ bundle)', async () => {
  await $`bun dist/bun-prettier.js '. --check'`
})

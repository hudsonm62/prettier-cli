import { test, expect } from 'bun:test'
import { existsSync } from 'node:fs'
import { $ } from 'bun'
import { getPrettierBin } from './_lib'

// Node test
test('Node | prettier --version', async () => {
  try {
    // Execute the command and capture the output
    let output1 = await $`bun dist/node-prettier.mjs --version`
    let output2 = await $`bunx prettier --version`
    // Assert that the outputs match
    expect(output1.stdout.toString().trim()).toBe(
      output2.stdout.toString().trim()
    )
  } catch (error) {
    throw error
  }
})

test('Node | prettier --help', async () => {
  try {
    await $`bun dist/node-prettier.mjs --help`
  } catch (error) {
    throw error
  }
})

// Bun test
test('Bun | prettier --version', async () => {
  try {
    // Execute the command and capture the output
    let output1 = await $`bun dist/bun-prettier.js --version`
    let output2 = await $`bunx prettier --version`
    // Assert that the outputs match
    expect(output1.stdout.toString().trim()).toBe(
      output2.stdout.toString().trim()
    )
  } catch (error) {
    throw error
  }
})

test('Bun | prettier --help', async () => {
  try {
    await $`bun dist/bun-prettier.js --help`
  } catch (error) {
    throw error
  }
})

const BIN = getPrettierBin()
if (existsSync(BIN)) {
  test('Binary | prettier --version', async () => {
    try {
      const output1 = (await $`${BIN} --version`).toString().trim()
      const output2 = (await $`${BIN} --version`).toString().trim()
      expect(output1).toEqual(output2)
    } catch (error) {
      throw error
    }
  })
}

import { $ } from 'bun'
import { test } from 'bun:test'
import { rimrafSync } from 'rimraf'

// refresh
rimrafSync('./dist')

test('Build Node Bundle', async () => {
  await $`bun run build`
})

test('Build Bun Bundle', async () => {
  await $`bun run build-bun`
})

test('Build Executable Binary', async () => {
  await $`bun run package`
})

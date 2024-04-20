function getPrettierBin() {
  if (process.platform === 'win32') {
    return process.cwd() + '\\dist\\bin\\prettier.exe'
  } else {
    return process.cwd() + '/dist/bin/prettier'
  }
}

module.exports = { getPrettierBin }

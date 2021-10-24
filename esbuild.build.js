const esbuild = require('esbuild')
const fs = require('fs')

outDir = './build'

fs.access(outDir, err => {
  if(err) {
    fs.mkdir(outDir, err => {
      if(err) {
        throw err
      }
    })    
  }
  
  fs.copyFile('./src/index.html', './build/index.html', (err) => {
    if(err) throw err
  })
})

esbuild.build({
  entryPoints: ['./src/css/styles.css', './src/app/main.ts'],
  outdir: outDir,
  bundle: true,
  minify: true,
})
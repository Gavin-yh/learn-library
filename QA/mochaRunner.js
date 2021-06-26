const Mocha = require('mocha')

let mocha = new Mocha({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: './doc/customReportFilename',
    // quiet: true
  }
})

mocha.addFile('./test/service/route.spec.js')
mocha.run(() => {
    process.exit() 
})
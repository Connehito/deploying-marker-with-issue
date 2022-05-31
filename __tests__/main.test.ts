import {expect, test} from '@jest/globals'
// import * as process from 'process'
// import * as cp from 'child_process'
// import * as path from 'path'

test('dummy', async () => {
  await expect(1 === 1).toBe(true)
})

// shows how the runner will run a javascript action with env / stdout protocol
// test('test runs', () => {
//   process.env['ACTION'] = 'check-marker'
//   process.env['ISSUE_NUMBER'] = '12'
//   const np = process.execPath
//   const ip = path.join(__dirname, '..', 'lib', 'main.js')
//   const options: cp.ExecFileSyncOptions = {
//     env: process.env
//   }
//   console.log(cp.execFileSync(np, [ip], options).toString())
// })

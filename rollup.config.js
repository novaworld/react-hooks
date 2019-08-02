import { rollup } from "@ttungbmt/module-config"
import pkg from './package.json'

const input = './src/index.js'

const globals = {

}

rollup.setConfig({
    pkg,
    moduleName: 'ReactHooks'
})

export default [
    rollup(input, [
        [pkg.main, 'cjs'],
        [pkg.module, 'es'],
    ]),
];

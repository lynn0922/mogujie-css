const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

console.info(chalk`{red.bold -------------- 脚本执行，当前环境为 ${process.env.BUILD_ENV} --------------}`)

if (process.env.BUILD_ENV === 'development') {
    let main = fs.readFileSync(path.resolve(__dirname, './src/main.js'), 'utf-8')

    main = main.replace('/** mock(不要删除) **/', "import '@/mock'")

    fs.writeFile(path.resolve(__dirname, './src/main.js'), main, 'utf8', (err) => {
        if (err) throw err
        console.info(chalk`{red.bold -------------- 成功引入 mock 数据 --------------}`)
    })
} else if (process.env.BUILD_ENV === 'production') {
    let main = fs.readFileSync(path.resolve(__dirname, './src/main.js'), 'utf-8')

    main = main.replace("import '@/mock'", '/** mock(不要删除) **/')

    fs.writeFile(path.resolve(__dirname, './src/main.js'), main, 'utf8', (err) => {
        if (err) throw err
        console.info(chalk`{red.bold -------------- 去掉 mock 数据 --------------}`)
    })
}

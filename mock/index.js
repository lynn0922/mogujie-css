/*
 * @Author: lynn
 * @Date: 2021-06-23 09:41:17
 * @LastEditTime: 2021-06-23 15:19:58
 * @LastEditors: lynn
 * @Description: mock service
 */
const { delay, getMockData, replacer, chalk, JSON5, devServerMockUrlMatch } = require('./utils.js')

module.exports = app => {

    // 只有环境变量是mock的情况才会进入
    if (process.env.NODE_ENV === 'mock') {
        console.info(chalk`{red.bold --------------开启本地mock数据调试模式--------------}`)

        app.all(devServerMockUrlMatch, async (req, res) => {
            const { method, originalUrl } = req
            console.error(chalk`{red.bold 本地数据请求：[${method}] ${originalUrl}}`)
            try {
                // 响应延迟500ms，模拟请求
                await delay(500)

                const dataFilePath = replacer(originalUrl)

                let data = await getMockData(dataFilePath, method)

                res.append('Access-Control-Allow-Origin', true)
                try {
                    data = JSON5.parse(data)
                } catch (e) {
                    const errMsg = `local mock json data parse error (本地测试数据JSON解析错误): ${dataFilePath}`
                    throw new Error(`${errMsg}\n${e}`)
                }
                res.json(data)
            } catch (err) {
                console.error(chalk`{red.bold ${err}}`)
                res.status(500).send(err.stack)
            }
        })
    }
}

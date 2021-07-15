/*
 * @Author: lynn
 * @Date: 2021-07-15 16:18:31
 * @LastEditTime: 2021-07-15 16:53:26
 * @LastEditors: lynn
 * @Description: 首次有效绘制时间
 */
class FMP {
    static getFmp(observeTime = 3000) {
        if (
            !Promise ||
            !window.performance ||
            !window.performance.timing ||
            !window.requestAnimationFrame ||
            !window.MutationObserver
        ) {
            console.log('fmp can not be retrieved')
            Promise.reject(new Error('fmp can not be retrieved'))
        }

        const promise = new Promise(resolve => {
            const observedPoints = []
            const observer = new window.MutationObserver(() => {
                const innerHeight = window.innerHeight
                function getDomMark(dom, level) {
                    const length = dom.children ? dom.children.length : 0
                    let sum = 0
                    const tagName = dom.tagName
                    if (
                        tagName !== 'SCRIPT' &&
                        tagName !== 'STYLE' &&
                        tagName !== 'META' &&
                        tagName !== 'HEAD'
                    ) {
                        if (
                            dom.getBoundingClientRect &&
                            dom.getBoundingClientRect().top < innerHeight
                        ) {
                            sum += level * length
                        }
                        if (length > 0) {
                            const children = dom.children
                            for (let i = 0; i < length; i++) {
                                sum += getDomMark(children[i], level + 1)
                            }
                        }
                    }
                    return sum
                }
                window.requestAnimationFrame(() => {
                    const timing = window.performance.timing
                    const startTime = timing.navigationStart || timing.fetchStart
                    const t = new Date().getTime() - startTime
                    const score = getDomMark(document, 1)
                    observedPoints.push({
                        score,
                        t
                    })
                })
            })
            observer.observe(document, {
                childList: true,
                subtree: true
            })

            setTimeout(() => {
                observer.disconnect()
                const rates = []
                for (let i = 1; i < observedPoints.length; i++) {
                    if (observedPoints[i].t !== observedPoints[i - 1].t) {
                        rates.push({
                            t: observedPoints[i].t,
                            rate: observedPoints[i].score - observedPoints[i - 1].score
                        })
                    }
                }
                rates.sort((a, b) => b.rate - a.rate)
                if (rates.length > 0) {
                    resolve(rates[0].t)
                } else {
                    resolve(observeTime)
                }
            }, observeTime)
        })
        return promise
    }
}

FMP.getFmp().then(fst => {
    console.log(
        '%c 计算 %c 首次有效绘制时间 %c',
        'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#fe2b60 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent',
        fst + 'ms'
    )
})

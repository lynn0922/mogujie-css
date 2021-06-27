# Readme

## mockjs 的使用

- 安装

          npm install mockjs

- mock 数据

          // 具体语法可以查看文档 https://github.com/nuysoft/Mock/wiki/Getting-Started

          import Mock from "mockjs";

          Mock.setup({
            timeout: "300-600",
          });

          Mock.mock("/api/user", "get", getUser);

          function getUser() {
            return Mock.mock({
              data: {
                data: {
                  name: "@cname",
                  "phone|11": "@integer(0,9)",
                  city: "@city",
                },
                status: 200,
                msg: "请求成功",
              },
            });
          }

          export default Mock;

- 使用

          // 在需要使用的文件中引入该文件
          <template>
            <div class="home">
              <img alt="Vue logo" src="../assets/logo.png" />
              <HelloWorld msg="Welcome to Your Vue.js App" />
            </div>
          </template>

          <script>
            // @ is an alias to /src
            import HelloWorld from "@/components/HelloWorld.vue";
            import "./../mock/index";
            import { getUserInfo } from "./../service/user";

            export default {
              name: "Home",
              components: {
                HelloWorld,
              },
              async setup() {
                const res = await getUserInfo();
                console.log(
                  "%c 🍒 res: ",
                  "font-size:20px;background-color: #FFDD4D;color:#fff;",
                  res
                );
              },
            };
          </script>

## Css 的设计模式

### OOCSS 设计模式

- OO: 面向对象
- 原则一： 容器与内容分离
- 原则二： 结构（基础对象）与皮肤分离

（原则一： 容器与内容分离）举个 🌰：

      <div class="post">
        <p class="metadata">
          <a> Author name </a>
        </p>
      </div>


      <div class="comment">
        <p class="metadata">
          <a> Author name2 </a>
        </p>
      </div>

      // 不好的写法
      .post .metadata { css code }

      // 好的写法
      .post { css code }
      .comment { css code }
      .metadata { css code }

上述代码的意思就是, `post` 容器跟 `comment` 容器中各有 类名 `metadata`, 那么我们在写 css 的时候就应该讲他们分离开, 这种就是 `OOCSS` 设计模式之一。

（原则二： 结构（基础对象）与皮肤分离）举个 🌰：

      <div class="menu fix"></div>

      .menu { color: green }
      .fix { color: red }

上述代码的意思就是, `menu`类名作为基础对象,我们想要改变它的颜色, 秉持不改变基础对象的情况下,新增一个对象（`fix`）去改变它。

这种模式在我们日常开发中基本都在使用,特别是在开发 `vue` 项目的时候, 举个 🌰

- 假设我们有个组件 `Home.vue`

            <template>
              <div class="home">
                <img alt="Vue logo" src="../assets/logo.png" />
                <HelloWorld msg="Welcome to Your Vue.js App" />
              </div>
            </template>

            <script>
              // @ is an alias to /src
              import HelloWorld from "@/components/HelloWorld.vue";
              import "./../mock/index";
              import { getUserInfo } from "./../service/user";

              export default {
                name: "Home",
                components: {
                  HelloWorld,
                },
                async setup() {
                  const res = await getUserInfo();
                  console.log(
                    "%c 🍒 res: ",
                    "font-size:20px;background-color: #FFDD4D;color:#fff;",
                    res
                  );
                },
              };
            </script>

- 我们在使用这个组件的时候是不是经常会去修改这个组件的位置或者其他的一些样式：

            <template>
              <home class="custom" />
              <home class="custom2" />
            </template>

            <style lang="scss">
              .custom {
                height: 100px;
                width: 100px;
              }

              .custom2 {
                 height: 200px;
                  width: 200px;
              }
            </style>

### BEM (Block(块)、Element(元素)、Modifier(修饰符))

我们假设有两个`tab`组件, 它们之间什么文案布局都是一样的，只是它们的样式有些许不一样, 一般我们可以使用 `BEM` 来规范命名并让结构清晰。

举个 🌰

    <div class="menu">
      <div class="menu__tab menu__tab--style1">tab1</div>
      <div class="menu__tab menu__tab--style1">tab2</div>
      <div class="menu__tab menu__tab--style1">tab3</div>
      <div class="menu__tab menu__tab--style1">tab4</div>
    </div>

    <div class="menu">
      <div class="menu__tab menu__tab--style2">tab1</div>
      <div class="menu__tab menu__tab--style2">tab2</div>
      <div class="menu__tab menu__tab--style2">tab3</div>
      <div class="menu__tab menu__tab--style2">tab4</div>
    </div>

    .menu {
      width: 100%;
      height: 200px;
    }

    .menu__tab {
      color: #000;
      font-size: 14px;
    }

    .menu__tab--style1 {
      border: 1px solid #000;
    }

    .menu__tab--style2 {
      padding: 0 20px;
    }

先来解释下, 什么是 `BEM`, 上述代码为例：

- `menu`类名为 `Block`
- `menu__tab`类名为 `Element`
- `menu__tab--style1` 类名为 `Modifier`

这种 `BEM` 标准, 它是属于进阶版本的 `OOCSS` 设计模式, 它的好处有：

1. 命名规范
2. 让页面结构清晰

上述代码看上去一目了然, `menu`为块, 它用于设置整体的样式, `menu__tab` 为元素, 它用于设置每个元素的样式, `menu__tab--style1` 和 `menu__tab--style2` 为修饰符, 它用于布局设置每个块之间元素的样式不同表现。

关于更多的 `BEM`可以查看官网: (<http://getbem.com/introduction/>)

### SMACSS 设计模式

SMACSS 的核心是分类；它总共分为**五大类**：

1. Base（基础）
2. Layout（布局）
3. Module（模块）
4. State（状态）
5. Theme（主题）

先解释下这五大类的含义：

- 基础（Base）规则里存放**重置浏览器元素的默认样式**，举个 🌰

          html, body, form { margin: 0; padding: 0; }
          input[type=text] { border: 1px solid #999; }
          a { color: #039; }
          a:hover { color: #03C; }

- 布局（Layout）规则将页面拆分成几个部分，每个部分都可能有一到多个模块。
- 模块（Modules） 是我们的设计当中可重用，可模块化的部分。插图，侧边栏，产品列表等等都属于模块。
- 状态（State）规则 定义了我们的模块或者布局在特殊的状态下应该呈现怎样的效果。是 hidden 呢？还是 expanded 呢？是 active 还是 inactive？例如，它可能定义模块、布局在不同显示屏上应该如何显示。也可能定义一个模块在不同页面（例如主页和内页）中可能呈现怎么样的效果。
- 主题（Theme）规则 和状态规则类似，定义模块或者布局的外观。

**命名规则**：

- 布局（Layout）, 采用 `l-` 或者 `layout-` 作为前缀。
- 状态（State）, 采用 `is-` 作为前缀。
- 模块（Module）, 模块是项目的主体，所以我们没有必要使用前缀等， 直接使用模块本身的名称即可。
- 主题（Theme）, 采用 `theme-`作为前缀.

这种模式的好处在于，它**易维护**、**易复用**、**易扩展**。

那么在实际项目中,我们要如何应用上述的设计模式呢？

我们先来讲解在传统的原生项目中如何应用它, 举个 🌰

    /*
      首先我们需要创建这五个文件夹： Base、Layout、Module、 State、Theme。
      根据我们上述所讲， 这五个文件夹分别执行着各自不同的指责；
      在 Html 中， 我们需要分别引入这五个文件
    */

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!-- 引入五个分类的文件 -->
        <link rel="stylesheet" href="./Base/Base.css" />
        <link rel="stylesheet" href="./Layout/Layout.css" />
        <link rel="stylesheet" href="./Module/Module.css" />
        <link rel="stylesheet" href="./State/State.css" />
        <link rel="stylesheet" href="./Theme/Theme.css" />
        <title>Document</title>
      </head>
      <body>
        <!--
          l-header 为布局的类名
          theme-bg 为主题的类名
          sidebar 为模块的类名
          is-show 为State的类名
        -->
        <div class="l-header theme-bg"></div>
        <div class="l-main">
          <div class="sidebar">
            <div class="sidebar-item"></div>
          </div>
        </div>
        <div class="l-footer is-show"></div>
      </body>
    </html>

举一反三, 经过上面的 🌰 在当下流行的三大框架中的应用也就不言而喻了呀， 不同的是，现在的框架都是面向组件开发, 所以我们可能就不需要 `Layout` 和 `Module` 了, 它们都会体现在组件当中了, 什么意思呢？ 举个 🌰

    <template>
      <div class="home">
        <header />
        <sidebar />
        <footer>
      </div>
    </template>

    <script>
    export default {
      name: "Home",
      components: {
        Header,
        Sidebar,
        Footer
      },
    };
    </script>

你看, 布局 以及 模块 在 `vue` 中将会被这种形式体现出来了。

更多的关于 `SMACSS`的资料可以查看官网 （<https://smacss-zh.vercel.app/>）

### ITCSS 设计模式

`ITCSS` 总共被分为 七层， 分别是：

- setting （设置）， 与预处理器一起使用并包含字体、颜色定义等
- tools （工具）， mixin 和函数。不要在前 2 层中输出任何 CSS，这一点很重要。
- generic （通用）， 重置或规范化样式、框大小定义等。这是生成实际 CSS 的第一层。
- elements （元素）， 裸 HTML 元素的样式（如 H1、A 等）。这些带有浏览器的默认样式，因此我们可以在此处重新定义它们。
- objects（对象）， 基于类的选择器，它定义了未修饰的设计模式，例如 OOCSS 中的媒体对象
- components （组件）， 特定的 UI 组件
- utilities （实用工具），实用程序和辅助类

这种模式很适合当下的工程化项目，它相对于 `SMACSS` 区分的更加细。更多的资料可自行查看（<https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/>）

### ACSS 设计模式

它的特点如下：

- 一个样式属于一个类
- 好处： 极强的复用性， 维护成本低
- 坏处： 破坏了 `css` 命名的语义化

目前流行的 `css` 框架中采用这种模式的是 `tailwindcss`, 举个 🌰

| 类名          | 样式                 |
| ------------- | -------------------- |
| z-0           | z-index: 0;          |
| static        | position: static;    |
| grid-flow-row | grid-auto-flow: row; |

一个样式 对应一个类名， 这就使得它具有极强的复用性， 但是它会破坏我们的命名语义化, 因为我们的代码在使用了这种模式后， 结构会变成这个样子(一堆的类名在标签上):

    <div class="grid grid-flow-col grid-cols-3 grid-rows-3 gap-4">
      <div>1</div>
      <!-- ... -->
      <div>9</div>
    </div>

这个是`tailwindcss`的官网 （<https://www.tailwindcss.cn/docs/grid-auto-flow>）

## Sass 技巧

### 变量

    $color-primary: #ff5777;

### @mixin

    @mixin firefox-message($selector) {
      body.firefox #{$selector}:before {
        content: "Hi, Firefox users!";
      }
    }

### @include

     @include firefox-message(".header");

### @function

    $grid-width: 40px;
    $gutter-width: 10px;

    @function grid-width($n) {
      @return $n * $grid-width + ($n - 1) * $gutter-width;
    }

    #sidebar { width: grid-width(5); }

### @each

    @each $animal in puma, sea-slug, egret, salamander {
      .#{$animal}-icon {
        background-image: url('/images/#{$animal}.png');
      }
    }

### @for

    @for $i from 1 through 3 {
      .item-#{$i} { width: 2em * $i; }
    }

更多的资料请查看官网（<https://www.sass.hk/>）

## 响应式布局

### REM 适配方案

    // 安装两个包
    npm install lib-flexible
    npm install postcss-plugin-px2rem -D

将 `lib-flexible` 导入项目中, 以 `vue` 举例, 在 `main.js` 入口中导入这个包即可。

    import "lib-flexible/flexible.js";

接着是配置 `postcss-plugin-px2rem` 插件：

    module.exports = {
      css: {
        loaderOptions: {
          postcss: {
            plugins: [
              require("postcss-plugin-px2rem")({
                rootValue: 75, // 设计稿的宽度 / 10 得到该值
                exclude: /(node_module)/, // 排除 node_module 包
                minPixelValue: 3, // 这个字段是配置低于3px的元素将不起效果
                selectorBlackList: ["van"],
              }),
            ],
          },
        },
      },
    };

## 关于思考如何寻找页面复用元素以及组件的问题

### 如何架构项目的 `css`

- 基于 `SMACSS` 以及 `ITCSS` 的设计原则 , 我们应该对整个项目的 `Styles` 进行分层, 由于后者是前者的进阶, 它的分层更加适合当下的工程化项目, 所以我们选择 `ITCSS` 设计模式来进行分层。
- 项目的分层(文件夹命名我这里并没有严格按照 `ITCSS` 的倒三角规则，而是进行了理解总结后设计)

  - `base` 文件夹的命名我是根据对比 `SMACSS` 设计模式后, 总结出， `ITCSS` 中 `generic` 和 `elements` 层跟 `SMACSS` 中的 `Base` 层很相似, 它们存放的都是关于页面元素的重置或规范化的样式, 所以为了统一我将它确定为 `base` , 当然，你可能会认为有点不伦不类 😄 （项目中使用了 `npm` 包 `normalize.css` , 它也是属于这一层当中的，只不过并不在项目中维护）
  - `object` 文件夹在官方文档的解是基于 `OOCSS` 原则创建的 `object class`，只能出现 class 选择器 , 由于项目技术栈中使用的是`vue`, 所以在这一层中, 通常都会被 组件所代替了, 但是为什么最终还是选择了使用它,是因为项目中引入了 `ACSS` 设计模式, 所以， 这里面存放的都是为了避免 `ACSS` 设计模式带来的 `破坏类名语义化` 而另外设计的 `属性选择器` 存放地, 它跟 `ACSS` 一样, 一个属性选择器 对应一个样式。
  - `settings` 文件中存放的都是对外服务的样式， 它属于 `ITCSS` 中的最顶层， 官方也明确的告诉我们, 前面两层 (第二层是 `tools`)不输出任何 `CSS`, 它们主要负责提供服务（全局变量，比如颜色，字体大小等等）
  - `theme` 文件夹存放的是见名知意的样式(主题色), 在 `ITCSS` 中其实是没有这一层的，这是因为项目中需要使用到换皮肤的功能，所以使用了 `SMACSS` 中的 `theme`层。
  - `tools` 文件夹存放的都是对外服务的样式工具（`mixin`，`function` 等等）, 刚刚提到过，它跟 `settings` 层一样，不会有任何的 `css` 输出。

  - 如上，我们最终的 `styles` 文件夹将存放了 五个文件夹， 它们各司其职, 方便我们日后的维护。 但是我们接下来要思考另外一个问题， 这些文件夹该如何应用到我们的项目当中呢？ 其实很简单， 作为 `base` 层 `object` 层, 这两个的职责是直接输出 `css` 的， 所以我们可以把这两个文件通过在 入口文件 中应用到项目上, 你可能会问，为什么其他的不可以这么做？ 其实很容易理解， 这两个作为直接输出 `css` 的文件 ， 我们经常会在模版中直接使用到它们， 例如 `base` 中存放的都是关于页面初始化的内容（重置 `input、` `a` 标签的默认样式等等）, 自然，你应该在全局使用它，其他页面就都可以应用到了,另外一个是 `object` ， 刚刚我们给这一层做过解释， 它提供属性选择器给模版使用的，那么当然也是在全局使用即可。那么， 其他层要如何应用呢？ 我们应该要思考的问题又来了，那就是，剩下的三层，它们的职责都是什么？ 它们都是对外提供服务，而不是直接输出 `css` 的， 所以，这意味着，你可能需要在别的 `scss` 文件中使用到它们提供的 `变量` 或者 `mixins` 等, 所以它们并不需要全局引入, 只需要在每个需要使用它们的文件中导入它们即可（这种方式一般我们采用插件的形式进行全局自动导入）

                 // 这里介绍 Vue 项目在 vue.config.js 全局导入的方式：
                  module.exports = {
                    css: {
                      loaderOptions: {
                        scss: {
                          prependData: `@import "~@/styles/gobal.scss";`,
                        },
                      },
                    },
                  };

- 根据项目的分层, 我们在开发过程中，首要思考的就是我们在拿到设计稿之后应该如何去分配这些职责（建文件）,
  - `base` 层的东西我们很好处理, 将标签中需要去除默认样式的都写进去即可，例如 `a` 标签等。
  - `theme` 层的主题色，根据项目中 `ui`设计师给出的数据，也不会很难。
  - `object` 层刚刚我们解释过，这里面存放的是关于 `ACSS` 模式的高复用的对象，例如 `字体`， `margin` ， `padding` ， `背景颜色`， `圆角`等等。
  - `settings` 都是一些变量, 根据项目中出现过的颜色来进行定义即可，一般也跟 `theme` 层有关系，跟`ui`设计师沟通即可。
  - `tools` 层存放的是 函数， 项目中直接使用了第三方包。
  - `components` 层， 这一层没有在 `styles` 文件夹中体现是因为当前项目使用了 `vue` , 所以它被 `components` 文件夹所替代。

### 思考拿到设计稿后的工作

拿到设计稿我们应该对整体的页面有一个分层架构的认识，我们应该思考，哪些元素是多次出现的，哪些元素需要重置的，哪些元素需要使用到主题色的，结合 `BEM` 的设计模式，全局思考这些问题是我们必不可少的一个环节。例如一个拿到首页设计稿，我们要从我们的 `css` 架构下去思考， 比如， 这个页面哪些是需要在 `base` 层存放， 哪些需要在 `theme` 层存放， 哪些需要在 `components` 中设计的。那么如何寻找页面中的 可复用的公共组件呢？

- 1.  寻找项目中多次出现的组件， 一般 有 头部组件， 底部组件 ， 还有像轮播图，按钮等等， 这个想法是通过对组件整体来思考的。
- 2.  寻找页面多次出现的相似结构， 例如， flex 布局， list 列表等等， 这个想法是通过对 元素结构方面的思考。

那么为什么我们要从这两个点出发寻找我们的组件呢？ 第一点不用多做解释，相信大家都懂， 那么第二点，为什么要从结构去入手寻找？ 这就涉及到我们之前说的， `components` 层其实就是在写组件，在原生开发中，它遵守 `结构与皮肤分离` 原则， 它跟 皮肤(例如 背景色，字体大小，宽高等)无关，换个思维， 组件是什么？ 组件不就是结构嘛， 我们写组件就是在写它的结构， 所以 `components` 的本质就是 `OOCSS` 。

## 字体压缩

移动端如果需要使用字体的话会导致体积剧增， 特别是一个字体包，随便就到达了十几 M 的情况下，我们就不得不重视起字体压缩这个问题。

项目中我找到了一款名叫 `font-spider`（字蛛） 的字体压缩工具，接下来我们就来看看如何使用它吧。

首先是安装这个工具：`npm install font-spider -g` , 之后我们需要创建个文件夹，来测试我们的字体是否可用。

- 创建文件夹， 在文件夹内分别创建一个 `index.html` , 内容如下：

        <!DOCTYPE html>

          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <!-- 使用字体包 -->
              <link rel="stylesheet" href="./css/index.css" />
              <title>Document</title>
            </head>
            <body>
              <h1>使用字体压缩</h1>

              /* 使用字体 */
              <style>
                h1 {
                  font-family: gf;
                }
              </style>
            </body>

        </html>

- 接着创建文件夹`css`, 并新建 `index.css` , 内容如下：

          /* 使用字体 */
          @font-face {
            font-family: gf;
            src: url("./font/gf.ttf");
          }

          // 我这里所使用的字体包高达 `10M` 。

- 最后别忘了把字体也放进来蛤，这个就不说怎么做了吧。

万事俱备， 我们来使用这个字体压缩工具， 看看效果， 进入这个项目根目录， 控制台输入命令：

    font-spider index.html

等待程序运行结束， 你会惊讶的发现， `10m` 的字体包被压缩成了`20k` 左右了, 把这个压缩后的字体文件拷贝放到你真正需要使用的项目中就可以啦。

## 利用 `webpack` 中 `devServer` 拦截请求 mock 数据

首先是配置`webpack`的 `devServer` , 配置如下：

    devServer: {
      before: require('./mock/index.js')
    }

接着创建 `mock` 目录， 分别创建文件：

1. index.js

        const { delay, getMockData, replacer, chalk, JSON5, devServerMockUrlMatch } = require('./utils.js')
        module.exports = app => {

            // 判断是否 mock 环境下

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

2. utils.js

        const chalk = require('chalk')
        const fs = require('fs-extra')
        const path = require('path')
        const Mock = require('mockjs2')
        const JSON5 = require('json5')

        /**
        * @description: 定时器 模拟接口返回时间
        * @param { number } time
        * @return { promises }
        */
        const delay = function (time) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve()
                }, time)
            })
        }


        /**
        * @description: 读取本地json文件，返回json数据
        * @param { string } dataFilePath
        * @param { string } method
        * @return { string } 返回 json 数据
        */
        async function getMockData (dataFilePath, method) {
            const fileJsonPath = `${dataFilePath}.json`
            const fileMockjsPath = `${dataFilePath}.mockjs.json`
            const fileRestFulPath = `${dataFilePath}$${method.toLowerCase()}.json`
            const fileRestFulMockjsPath = `${dataFilePath}$${method.toLowerCase()}.mockjs.json`
            const fileExist = await fs.pathExists(dataFilePath)
            const fileJsonExist = await fs.pathExists(fileJsonPath)
            const fileMockjsExist = await fs.pathExists(fileMockjsPath)
            const fileRestFulExist = await fs.pathExists(fileRestFulPath)
            const fileRestFulMockjsExist = await fs.pathExists(fileRestFulMockjsPath)

            // 先寻找 RESTFul .mockjs.json 文件
            if (fileRestFulMockjsExist) {
                return fs.readFile(fileRestFulMockjsPath, 'utf8').then(json => JSON.stringify(Mock.mock(JSON5.parse(json))))
            }

            // 再寻找 RESTFul .json 数据文件
            if (fileRestFulExist) {
                return fs.readFile(fileRestFulPath, 'utf8')
            }

            // 再寻找 .mockjs.json 后缀 mock 数据文件
            if (fileMockjsExist) {
                return fs.readFile(fileMockjsPath, 'utf8').then(json => JSON.stringify(Mock.mock(JSON5.parse(json))))
            }

            // 再寻找 .json 后缀 mock 数据文件
            if (fileJsonExist) {
                return fs.readFile(fileJsonPath, 'utf8')
            }

            // 再寻找无后缀 mock 数据文件
            if (fileExist) {
                return fs.readFile(dataFilePath, 'utf8')
            }

            console.error(chalk`{red.bold ------- ERROR ------}`)
            console.error(chalk`{red.bold 尝试了以下可能的 mock 数据文件，仍没有找到对应的数据}`)
            console.error(chalk`{red.bold 1. ${fileRestFulPath}}`)
            console.error(chalk`{red.bold 2. ${fileRestFulMockjsPath}}`)
            console.error(chalk`{red.bold 3. ${fileJsonPath}}`)
            console.error(chalk`{red.bold 4. ${fileMockjsExist}}`)
            console.error(chalk`{red.bold 5. ${dataFilePath}}`)

            return Promise.reject(new Error(`未找到对应 mock 文件, 请确认路径是否正确`))
        }

        // 接口前缀
        const devServerMockUrlMatch = /^\/api\//


        /**
        * @description: 返回存放在本地json数据的完整路径， 可通过配置决定是否多创建一层目录来区分 api 的前缀
        * @param { string } originalUrl
        * @return { string } 完整的本地路径
        */
        function replacer (originalUrl) {

            if (process.env.VUE_APP_MOCK_PREFIX === 'true') return originalUrl.replace(devServerMockUrlMatch, `${path.join(process.cwd(), 'mock/json')}/`)

            return originalUrl.replace(devServerMockUrlMatch, `${path.join(process.cwd(), 'mock/json')}$&`).replace(/\?.*$/, '')
        }

        const utils = {
            delay,
            getMockData,
            replacer,
            chalk,
            JSON5,
            devServerMockUrlMatch
        }

        module.exports = utils

        // 监听 没有 reject 处理器的情况
        process.on('unhandledRejection', reason => {

            console.log(chalk.red.bold(reason))
            console.error(reason.stack)

            // 以失败代码退出程序
            process.exit(1)
        })

3. json 目录。 这个目录是根据接口是否需要前缀决定的， 如果不需要，可以在 根目录创建 `.env.mock` 配置环境变量。

        NODE_ENV=mock
        # 是否去除接口前缀 ， 目的是为了 mock 少一层目录
        VUE_APP_MOCK_PREFIX=true

最终文件目录如下:

    │  index.js
    │  utils.js
    │
    └─json
        │  user.$get.mockjs.json
        │  user.json
        │  user.mockjs.json
        │
        └─api
                user.$get.mockjs.json
                user.json
                user.mockjs.json

稍微解释下目录：

1. `index.js` 默认导出一个函数， 通过 `devServe` 传入的 `app` 参数来做一些请求拦截， 这里使用的是 `all` 方法， 当然， 它还有 `get` ，`post` 等方法。
2. `utils.js` 存放的都是工具函数， 有详细注释。
3. `json` 存放的就是我们 `mock` 的数据了, 解释下：

        1. 第一个， 为什么会多一个 api 文件，
        是因为假如你的请求 url 是由公共的前缀的，
        例如 /api/user， /api/goods,
        然后又有其他的前缀，例如 /mock/user ， /mock/goods ，
        这种情况, 如果你想要区分他们的数据，
        那么就要创建对应的前缀文件夹，
        如果不需要的话， 你就需要配置环境变量来取消创建这个目录。

        2. 第二个， 为什么文件的名称那么奇怪，
        .json 的文件是没有经过 mock 语法书写的文件，
        .mockjs.json 的文件是经过 mock 语法书写的文件，它需要使用 mock 官方语法生成数据

        3. 第三个， $del， $put ，是什么意思， 这是根据 RESTFul API 风格来命名文件。

## 利用 `node` 动态引入 `mock` 文件

这种方式不是通过 读取 `json` 文件实现 `mock` 数据的 ， 这里使用了 `mockjs` , 注意，上面使用的是 `mockjs2` 。

介绍下使用方式：

1. 安装 `npm install mockjs`
2. 创建 `mock` 文件夹存放 `index.js`,内容如下：

        import Mock from "mockjs";
        import mall from "./mall";

        // 模拟接口返回时间
        Mock.setup({
          timeout: "300-600",
        });

        // 第一个参数是 url， 可以使用正则匹配， 第二个参数是请求方式， 第三个是 mock 的数据
        Mock.mock("/api/mall/categorys", "get", mall.getCategorys);
        Mock.mock(/\/api\/mall\/categorys\/\d*/, "get", mall.getOneCategory);


        export default Mock;


        // mall.js mock返回数据
        import Mock from "mockjs";
        import { getParamsFromRestful } from "@/utils/tools";

        export default {
            // 获取商品类目
            getCategorys: () => {

              // mock 语法
              return Mock.mock({
                "data|20": [
                  {
                    "title|+1": ["上衣", "裤子", "裙子", "女鞋", "男友", "包包"],
                    "id|+1": [0, 1, 2, 3, 4, 5],
                  },
                ],
                status: 200,
                msg: "请求成功",
              });
            },


             // 获取某种品类
            getOneCategory: (config) => {
              const params = getParamsFromRestful(config.url, "/api/mall/categorys/:id");
              let list = "";

              if (params["id"] == 0) {
                list = Mock.mock({
                  "data|30": [
                    {
                      "image|+1": [
                        "https://s2.mogucdn.com/mlcdn/c45406/200831_65f6hij20574g1h7f5je59le49h4f_100x120.png_999x999.v1c0.81.webp",
                        "https://s2.mogucdn.com/mlcdn/c45406/180910_1l7ii4gejd9g5333313gefaebbhf5_180x180.jpg_200x9999.v1c7E.81.webp",
                        "https://s2.mogucdn.com/mlcdn/c45406/170823_7dkl85cdikcfd4940de030hg315il_120x120.jpg_999x999.v1c0.81.webp",
                        "https://s2.mogucdn.com/mlcdn/c45406/181120_85cjh932h88f1f43f175gc6eaal7g_120x120.jpg_999x999.v1c0.81.webp",
                      ],
                      "des|+1": ["卫衣", "长袖T恤", "衬衫", "棉服"],
                      id: 0,
                    },
                  ],
                });
              } else if (params["id"] == 1) {
                list = Mock.mock({
                  "data|15": [
                    {
                      "image|+1": [
                        "https://s17.mogucdn.com/mlcdn/c45406/200414_6jkf2ijhf2jihjk6842lab3lg4b1d_180x180.png_200x9999.v1c7E.81.webp",
                        "https://s18.mogucdn.com/mlcdn/c45406/200506_65604dg7d5a6h1h86igd3h16h474h_180x180.jpg_200x9999.v1c7E.81.webp",
                        "https://s2.mogucdn.com/mlcdn/c45406/200506_7hec9lkbecdbbkd19beb887285i2i_180x180.jpg_200x9999.v1c7E.81.webp",
                        "https://s2.mogucdn.com/mlcdn/c45406/181105_8daff35ek786l91fgg637ek82kc7b_130x130.jpg_999x999.v1c0.81.webp",
                      ],
                      "des|+1": ["牛仔裤", "休闲裤", "阔腿裤", "运动裤"],
                      id: 1,
                    },
                  ],
                });
              } else if (params["id"] == 2) {
                list = Mock.mock({
                  "data|15": [
                    {
                      "image|+1": [
                        "https://s2.mogucdn.com/mlcdn/c45406/190903_2h8b9c515cacfh15f83833j6ec6fd_180x180.jpg_200x9999.v1c7E.81.webp",
                        "https://s2.mogucdn.com/mlcdn/c45406/191029_1l56ag438lcbh9k3hkjgaka5ha6la_180x180.jpg_200x9999.v1c7E.81.webp",
                        "https://s2.mogucdn.com/mlcdn/c45406/190903_1hbe60056b7ih269g1ih0j53a887h_179x180.jpg_200x9999.v1c7E.81.webp",
                        "https://s2.mogucdn.com/mlcdn/c45406/200831_40h180aa42k0gei4l5cah9efkac90_120x150.png_999x999.v1c0.81.webp",
                      ],
                      "des|+1": ["连衣裙", "长款半裙", "短款半裙", "卫衣裙"],
                      id: 2,
                    },
                  ],
                });
              } else if (params["id"] == 3) {
                list = Mock.mock({
                  "data|15": [
                    {
                      "image|+1": [
                        "https://s2.mogucdn.com/mlcdn/c45406/200831_0ed9alld0aa7jfl9c9ha0913el24e_200x200.jpg_200x9999.v1c7E.81.webp",
                        "https://s11.mogucdn.com/mlcdn/c45406/200831_78iiddjh8gkh37ee25ef3408b4aa0_200x200.jpg_200x9999.v1c7E.81.webp",
                        "https://s17.mogucdn.com/mlcdn/c45406/200831_6488kd4d59cdff46932llefg68lb0_200x200.jpg_200x9999.v1c7E.81.webp",
                        "https://s18.mogucdn.com/mlcdn/c45406/200831_14diej29e7jk1ikbg6k4cad3a8lgb_200x200.jpg_200x9999.v1c7E.81.webp",
                      ],
                      "des|+1": ["靴子", "品牌精选", "老爹鞋", "休闲鞋"],
                      id: 3,
                    },
                  ],
                });
              } else if (params["id"] == 4) {
                list = Mock.mock({
                  "data|15": [
                    {
                      "image|+1": [
                        "https://s2.mogucdn.com/mlcdn/c45406/201104_1g8hhjlf6b721f17dd6hg26b2cc7f_200x200.png_200x9999.v1c7E.81.webp",
                        "https://s2.mogucdn.com/mlcdn/c45406/201104_1j9531e3c19ehgec0h3hajb9gbckh_200x200.png_200x9999.v1c7E.81.webp",
                        "https://s2.mogucdn.com/mlcdn/c45406/201104_1395al1bh55ceb8ibk1ig2g82fjj2_200x200.png_200x9999.v1c7E.81.webp",
                        "https://s2.mogucdn.com/mlcdn/c45406/201104_6kgab2274339j6llkghcfd4b1f3a2_200x200.png_200x9999.v1c7E.81.webp",
                      ],
                      "des|+1": ["秋冬上新", "卫衣T恤", "外套", "休闲裤"],
                      id: 4,
                    },
                  ],
                });
              } else if (params["id"] == 5) {
                list = Mock.mock({
                  "data|15": [
                    {
                      "image|+1": [
                        "https://s18.mogucdn.com/mlcdn/c45406/190926_6j92j0d3dhdf5k30hl2ehffe9b23l_120x120.jpg_999x999.v1c0.81.webp",
                        "https://s2.mogucdn.com/mlcdn/c45406/190926_69a76j986i6d74760hdd44j7e9hda_120x120.jpg_999x999.v1c0.81.webp",
                        "https://s2.mogucdn.com/mlcdn/c45406/200509_0d3ke2e36lci55e8heibgcc1b288c_180x180.jpg_200x9999.v1c7E.81.webp",
                        "https://s2.mogucdn.com/mlcdn/c45406/190926_20h05ej196j3kif9fjii33kb7d0k1_120x120.jpg_999x999.v1c0.81.webp",
                      ],
                      "des|+1": ["斜挎包", "单肩包", "手提包", "双肩包"],
                      id: 5,
                    },
                  ],
                });
              }
              return {
                status: 200,
                data: list.data,
                msg: "请求成功",
              };
            },
        }

        // tools.js
        /**
        * 对比 url 与 restUrl，返回 restUrl 中的请求参数
        * @param {请求链接} url
        * @param {restful 链接} restUrl
        */
        export const getParamsFromRestful = (url, restUrl) => {
          const paramsUrl = url.split("/");
          const paramsRestUrl = restUrl.split("/");
          let diff = {};

          paramsUrl.forEach((item, index) => {
            if (item !== paramsRestUrl[index]) {
              diff[paramsRestUrl[index].substr(1)] = item;
            }
          });

          return diff;
        };

3. 最后在入口函数引入这个 `index.js` 文件即可使用了。

这种方式的请求不会出现在 控制台的 `netWork` 中， 还有就是需要手动注释入口文件引入问题， 针对这个问题， 这里使用 `node` 的读写来解决：

1. 删除入口文件的 `mock` 引入， 使用 `/** mock(不要删除) **/` 注释作为占位符存放到 入口文件。
2. 编写脚本 `mock-server.js`, 注意 ， 这里要多安装一个包， `npm i cross-env` , 这个包用来在启动脚本的时候设置一个环境变量的，`node` 启动脚本不知道怎么获取 `vue-cli` 内部提供的环境变量，所以想到了自己注入。

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

这种方案有个很大的局限性， 不能更改 `main.js` 中占位符的格式， 多个空格都不行， 还有就是导入 `import '@/mock'` 的格式也是不能有任何改变，虽然不太友好，但是至少解决了我们要手动注释这行代码的问题，当然如果你不会忘记注释， 那么可以不引入这个脚本，手工操作。

## `css` 高性能动画

### 浏览器渲染流程

  <https://juejin.cn/post/6844903565610188807>, 可以阅读这篇文章了解浏览器的渲染流程。

  而 `css` 的动画原理其实就是多次渲染页面的结果。

  看完浏览器渲染的过程, 我们大概了解到, 动画的原理其实就是多次渲染页面从而形成动画的, 但是每次渲染都需要经过几个过程, 所以如果能够省略几个过程，那么动画的性能是不是就会有所提高了。

### 高性能动画

  通过 `CSS Triggers` 网站我们可以了解每个属性的渲染需要经过哪些过程, 网址: <https://csstriggers.com/>。

  这里介绍总结下实现 `css` 高性能动画的三个关键思路:
  
  1. 硬件加速

          概念：
            1.1 也被称为GPU加速。
            1.2 GPU 擅长对 texture 进行偏移、放大缩小、 旋转等。
            1.3 GPU 渲染时跳过 Layout 、 paint这两个过程，只会触发 composite,速度极快。
          如何触发 GPU 渲染?
            1.4 css属性为元素生成Layer

              如何触发Layer？
                1.4.1 元素使用 3D 或者 perspective、 transform 属性。
                1.4.2 元素使用 animation、transition改变 opacity,transform的元素。
                1.4.3 video、 canvas、 flash、css filters等。
            1.5 Layer 会作为 texture 上传到 GPU。

  2. 使用 `requestAnimationFrame` 函数。

          2.1 一般的屏幕一秒中刷新`60`次，约等于 `16.7ms` 一帧， 
          每个屏幕的刷新次数可能不一样，想要实现流畅的动画，就是在`16.7ms`内将一帧的内容准备好。 
          假设你的屏幕`1/60FPS`,那么 `GPU` 在渲染到屏幕的时候应该准备好`60` 张渲染图，这种情况就不会导致动画卡顿。

          2.2 如上述所说，流畅的动画就是在 `GPU` 准备渲染到屏幕的时候能够不间断（有渲染资源），那么动画就会是很流畅的，
          但是我们在写动画的时候，有时候会出现屏幕突然闪动一下、动画卡顿或丢失了一个画面，
          这是因为在 `GPU`渲染的过程中，每一帧的时间不一致，导致前一帧的渲染图被后一帧的覆盖了。
          造成这种丢失帧的原因是因为在一个时间范围内包含了两个或者多个帧,
          那么想要解决这种情况，我们只需要控制住在一个时间间隔只能包含一帧就行了，
          但是我们的动画代码是写死，它的渲染时间并不是我们能够控制住的，它的第一帧是这么长就是这么长，第二帧是这么短就是这么短；
          既然无法控制它的渲染时间，那么我们就来调节屏幕的刷新次数，
          假设屏幕刷新频率为 1s/60FPS, 在这一帧渲染时间长的情况下，我们就将屏幕刷新频率降低为 1s/30FPS, 
          是不是就可以控制每一帧的时间间隔长短了。
          通过不断的调整屏幕的刷新频率，我们就能够做到 每一时间间隔保证只有一帧的画面，这样动画就永远不会丢失帧了。

          2.3 想要实现上述所讲，不断调节屏幕的刷新频率，我们可以使用 requestAnimationFrame 函数， 
          函数内部会自动调节屏幕的刷新频率， 下面代码演示:

          <!--
            * @Author: lynn
            * @Date: 2021-06-27 20:48:06
            * @LastEditTime: 2021-06-27 21:03:16
            * @LastEditors: lynn
            * @Description: 
            -->
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Document</title>
                </head>
                <style>
                    #box {
                        width: 100px;
                        height: 100px;
                        background-color: brown;
                        position: absolute;
                        top: 800px;
                        left: 0;
                    }

                    
                </style>
                <body>
                    <div id="box"></div>

                    <script>
                        let box = document.getElementById('box')

                        requestAnimationFrame(() => {
                            setInterval(() => {
                                let top = parseInt(box.offsetTop)
                                box.style.top = top - 1 + 'px'
                            }, 0)
                        })
                    </script>
                </body>
            </html>

  3. 关注代码层面，极致优化每一帧渲染的时间，避免超过 16s 。

          回流必将引起重绘，重绘不一定会引起回流。

          那么什么是回流呢？ 
          当渲染树(Render Tree)中部分或者全部元素的尺寸结构或者某些属性变化时,
          浏览器重新渲染部分或全部文档的过程称为回流。

          那什么是重绘呢？
          当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），
          浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。

          显而易见，回流比重绘的代价更高。


          如何避免呢？
          css 方面：
            3.1 避免使用table布局。
            3.2 尽可能在DOM树的最末端改变class。
            3.3 避免设置多层内联样式。
            3.4 将动画效果应用到position属性为absolute或fixed的元素上。
            3.5 避免使用CSS表达式（例如：calc()）。

          javascript 方面：
            3.6 避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性。
            3.7 避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中。
            3.8 也可以先为元素设置display: none，操作结束后再把它显示出来。
            因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘。
            3.9 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
            3.10 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

  相关资料：
    <https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work>

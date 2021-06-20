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

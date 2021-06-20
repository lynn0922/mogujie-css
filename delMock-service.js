const path = require("path");
const fs = require("fs");

let main = fs.readFileSync(path.resolve(__dirname, "./src/main.js"), "utf-8");

main = main.replace('import "@/mock";', "/** mock(不要删除) **/");

fs.writeFile(path.resolve(__dirname, "./src/main.js"), main, "utf8", (err) => {
  if (err) throw err;
  console.log("------------- 去掉mock数据 ----------------");
});

const path = require("path");
const fs = require("fs");

let main = fs.readFileSync(path.resolve(__dirname, "./src/main.js"), "utf-8");

main = main.replace("/** mock(不要删除) **/", 'import "@/mock";');

fs.writeFile(path.resolve(__dirname, "./src/main.js"), main, "utf8", (err) => {
  if (err) throw err;
  console.log("------------- 成功引入mock数据 ----------------");
});

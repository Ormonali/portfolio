const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const root = path.join(__dirname, "..");
const viewsDir = path.join(root, "views");
const publicDir = path.join(root, "public");
const distDir = path.join(root, "dist");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

const html = ejs.renderFile(
  path.join(viewsDir, "home.ejs"),
  {},
  { root: viewsDir, filename: path.join(viewsDir, "home.ejs") }
);

Promise.resolve(html).then((rendered) => {
  fs.writeFileSync(path.join(distDir, "index.html"), rendered);
  copyDir(publicDir, distDir);
  console.log("Built static site to dist/");
});

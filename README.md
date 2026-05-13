# 修复版：普通分享 + 可选配对版

## 修复内容
修复了“朋友做完后没有出现配对分析”的问题。

原因：
旧版本把配对数据直接放在 URL 里，Base64 里的 `+ / =` 可能被浏览器/微信改写，导致朋友端读不到你的结果。

本版改成 URL 安全编码：
- 生成邀请链接时 encodeURIComponent
- 读取邀请链接时 decodeURIComponent
- 读取失败会给出提示

## 使用方式
覆盖上传这 5 个文件：
- index.html
- style.css
- questions.js
- app.js
- README.md

Vercel 会自动重新部署。

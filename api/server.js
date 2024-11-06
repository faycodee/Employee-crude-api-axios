// استيراد مكتبة json-server
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data/data.json'); // هنا المسار الجديد إلى data.json داخل مجلد data
const middlewares = jsonServer.defaults();

// إعداد الخادم
server.use(middlewares);
server.use(router);

// تصدير الخادم ليعمل كوظيفة بدون خادم في Vercel
module.exports = server;

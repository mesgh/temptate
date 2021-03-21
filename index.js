const { get } = require('axios');
const express = require('express');
const app = express();
const URL = 'https://kodaktor.ru/j/users';

app
.set('view engine', 'pug')

.get('/users', async (req, res)  => {
  const { data: { users: list } } = await get(URL);
  console.log(list);
  res.render('list', {list});
})

.get('/', (req, res) => {
  res
  .set({
    'Content-Type': 'javascript; charset=utf-8'
  });
  require('fs').createReadStream('./index.js').pipe(res);
})

.use((req, res) => {
  res
  .status(404)
  .set({
    'Content-Type': 'text/html; charset=utf-8'
  })
  .send('<h1 style="aqua">Не найдено!</h1>');
})

.listen(process.env.PORT || 80);

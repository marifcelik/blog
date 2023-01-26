const app = require('./src/app');
const { PORT, HOST } = require('./config');

app.listen(PORT, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});
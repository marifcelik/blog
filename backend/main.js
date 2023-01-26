const app = require('./src/app');
const { PORT, HOST } = require('./src/utils/config');

app.listen(PORT, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});
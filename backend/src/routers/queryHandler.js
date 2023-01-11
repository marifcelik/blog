async function queryHandler(query) {
    try {
        const data = await query;
        return [data, null]
    } catch (err) {
        console.error('error', err.toString());
        return [null, err]
    }
}

module.exports = queryHandler
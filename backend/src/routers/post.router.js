const express = require('express');
const sql = require('../db');

const router = express.Router();

async function queryHandler(query) {
    try {
        const data = await query;
        return [data, null]
    } catch (err) {
        console.error('error', err.toString());
        return [null, err]
    }
}

router.get('/', async (req, res) => {
    const [result, error] = await queryHandler(sql` SELECT * FROM posts`)
    if (error)
        return res.status(500).json({ msg: 'error', error })

    res.status(200).json({ msg: 'success', result });
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    res.status(200).json({ id: Number(id), body: `post ${id}` })
})

router.post('/add', async (req, res) => {
    const data = req.body;
    const [result, error] = await queryHandler(sql` INSERT INTO posts ${sql(data, 'title', 'cover', 'body')} RETURNING id `)
    if (error)
        return res.status(500).json({ msg: 'error', error })

    res.status(201).json({ msg: 'success', id: result[0].id });
})

router.patch('/update', async (req, res) => {
    const data = req.body;
    data.updated_at = Date.now();
    const [result, error] = await queryHandler(sql` UPDATE posts SET ${sql(data, 'title', 'cover', 'body', 'updated_at')} WHERE id = ${Number(data.id)} RETURNING * `)

    if (error)
        return res.status(500).json({ msg: 'error', error })

    res.status(200).json({ msg: 'updated', result });
})

router.delete('/rm', async (req, res) => {
    const data = req.body;
    const [result, error] = await queryHandler(sql` DELETE FROM posts WHERE id = ${Number(data.id)} RETURNING * `)
    if (error)
        return res.status(500).json({ msg: 'error', error })

    res.status(200).json({ msg: 'deleted', result });
})

module.exports = router
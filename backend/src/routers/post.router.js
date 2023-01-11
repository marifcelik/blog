const express = require('express');
const sql = require('../db');
const queryHandler = require('./queryHandler');

const router = express.Router();

router.get('/', async (req, res) => {
    const [result, error] = await queryHandler(sql` SELECT * FROM posts`)
    if (error)
        return res.status(500).json({ msg: 'error', error })

    res.status(200).json({ msg: 'success', result });
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id)
    return res.status(400).json({ msg: 'error', error: 'id is invalid' })
    
    const [result, error] = await queryHandler(sql`SELECT * FROM posts WHERE id = ${id}`)
    if (error)
        return res.status(500).json({ msg: 'error', error })
    if (Object.keys(result).length === 0)
        return res.status(404).json({ msg: 'error', error: 'post not found' })

    res.status(200).json({ msg: 'success', result: result[0] })
})

router.post('/add', async (req, res) => {
    const data = req.body;
    if (!data || Object.keys(data).length !== 3)
        return res.status(400).json({ msg: 'error', error: 'invalid arguments' })

    const [result, error] = await queryHandler(sql` INSERT INTO posts ${sql(data, 'title', 'cover', 'body')} RETURNING * `)
    if (error)
        return res.status(500).json({ msg: 'error', error })

    res.status(201).json({ msg: 'success', result: result[0] });
})

router.patch('/update', async (req, res) => {
    const data = req.body;
    data.updated_at = Date.now();
    const [result, error] = await queryHandler(sql` UPDATE posts SET ${sql(data, 'title', 'cover', 'body', 'updated_at')} WHERE id = ${Number(data.id)} RETURNING * `)
    if (error)
        return res.status(500).json({ msg: 'error', error })

    res.status(200).json({ msg: 'success', result: result[0] });
})

router.delete('/rm', async (req, res) => {
    const data = req.body;
    const [result, error] = await queryHandler(sql` DELETE FROM posts WHERE id = ${Number(data.id)} RETURNING * `)
    if (error)
        return res.status(500).json({ msg: 'error', error })

    res.status(200).json({ msg: 'deleted', result: result[0] });
})

module.exports = router
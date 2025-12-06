const express = require('express');
const router = express.Router();

// POST /api/questions (Admin: Create Question)
router.post('/', async (req, res) => {
    try {
        const { content, category, is_active } = req.body;

        // TODO: Insert into Supabase 'questions' table
        console.log('Creating question:', { content, category, is_active });

        // Mock response
        res.status(201).json({
            message: 'Question created successfully',
            data: {
                id: 'mock-uuid',
                content,
                category,
                is_active,
                created_at: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/questions (List Questions)
router.get('/', async (req, res) => {
    try {
        // TODO: Fetch from Supabase
        res.status(200).json({
            data: []
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

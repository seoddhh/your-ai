const express = require('express');
const router = express.Router();

// POST /api/answers (User Submit Answer)
router.post('/', async (req, res) => {
    try {
        const { questionId, content, modelName, persona } = req.body;

        // TODO: Insert into Supabase 'answers' table
        console.log('Submitting answer:', { questionId, content, modelName, persona });

        res.status(201).json({
            message: 'Answer submitted successfully',
            data: {
                id: 'mock-answer-uuid',
                questionId,
                content,
                modelName,
                persona_tags: persona,
                likes: 0,
                created_at: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Error submitting answer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/answers/:questionId (Fetch with Filters)
router.get('/:questionId', async (req, res) => {
    try {
        const { questionId } = req.params;
        const { ageGroup, gender, jobCategory } = req.query;

        // TODO: Fetch from Supabase with filters
        console.log(`Fetching answers for question ${questionId} with filters:`, { ageGroup, gender, jobCategory });

        res.status(200).json({
            data: [
                // Mock data
                {
                    id: 'mock-answer-1',
                    question_id: questionId,
                    content: 'This is a mock answer.',
                    model_name: 'GPT-4o',
                    persona_tags: {
                        ageGroup: '20s',
                        gender: 'Female',
                        jobCategory: 'Student'
                    },
                    likes: 5,
                    created_at: new Date().toISOString()
                }
            ]
        });
    } catch (error) {
        console.error('Error fetching answers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

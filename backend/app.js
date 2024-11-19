import express from 'express';
import pool from './database.js'; // Import database connection
import cors from 'cors';
const app = express();


app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests
app.get('/api/health-check', async (req, res) => {
    try {
        await pool.query('SELECT 1'); // Simple query to test the connection
        res.status(200).send('Successfully connected to the database');
    } catch (err) {
        console.error('Database connection failed:', err);
        res.status(500).send('Failed to connect to the database');
    }
});

// Workspace Query
app.get('/api/workspaces/:id', async (req, res) => {
    const { id } = req.params; 

    try {
        const [rows] = await pool.query('SELECT * FROM workspaces WHERE owner_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).send('No workspaces have been created');
        }

        return res.json(rows); 
    } catch (error) {
        console.error('Error fetching data', error); 
        res.status(500).send('Failed to fetch data from the database');
    }
});





// Creates users once UID has been created by firebase
app.post('/api/users', async (req, res) => {
    const { user_id, name, email } = req.body;
    try {
        const query = 'INSERT INTO users (user_id, name, email) VALUES (?, ?, ?)';
        const result = await pool.query(query, [user_id, name, email]);
        res.status(201).json({ message: 'User added successfully', id: result[0].insertId });
        console.log('User added sucessfully')
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).send('Failed to add user');
    }
});


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
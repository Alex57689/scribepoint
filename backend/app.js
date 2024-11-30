import express from 'express';
import pool from './database.js'; // Import database connection
import cors from 'cors';
const app = express();


app.use(cors());
app.use(express.json()); 
app.get('/api/health-check', async (req, res) => {
    try {
        await pool.query('SELECT 1'); 
    
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

// Board Query
app.get('/api/board/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        const [rows] = await pool.query('SELECT * FROM BOARDS WHERE workspace_id = ? ', [id]);

        if (rows.length === 0) {
            return res.status(404).send('No boards have been created');
        }

        return res.json(rows); 
    } catch (error) {
        console.error('Error fetching data', error); 
        res.status(500).send('Failed to fetch data from the database');
    }
});


//Cards and Tasks Query
app.get('/api/cards/:id', async (req, res) => {
    const { id } = req.params;


    try {
        const [rows] = await pool.query(
            `
            SELECT 
                c.card_id,
                c.board_id,
                c.title AS card_title,
                c.description AS card_description,
                c.position AS card_position,
                c.created_at AS card_created_at,
                c.due_date AS card_due_date,
                c.assigned_to AS card_assigned_to,
                t.task_id,
                t.title AS task_title,
                t.completed AS task_completed,
                t.position AS task_position,
                t.created_at AS task_created_at,
                t.description AS task_description,
                t.activity as task_activity
            FROM 
                cards c
            LEFT JOIN 
                tasks t
            ON 
                c.card_id = t.card_id
            WHERE 
                c.board_id = ?
            ORDER BY 
                c.position, t.position;
            `,
            [id]
        );


        if (rows.length === 0) {
            return res.status(404).send('No cards have been created');
        }

        const cards = rows.reduce((acc, row) => {
            let card = acc.find(c => c.card_id === row.card_id);
        
            if (!card) {
                let assignedTo;
                try {
                    assignedTo = JSON.parse(row.card_assigned_to || '[]');
                } catch {
                    assignedTo = row.card_assigned_to ? [row.card_assigned_to] : [];
                }
        
                card = {
                    card_id: row.card_id,
                    board_id: row.board_id,
                    title: row.card_title,
                    description: row.card_description,
                    position: row.card_position,
                    created_at: row.card_created_at,
                    due_date: row.card_due_date,
                    assigned_to: assignedTo,
                    tasks: [],
                };
                acc.push(card);
            }
        
            if (row.task_id) {
                let activity; // Move activity definition here, where it is needed
                try {
                    activity = JSON.parse(row.task_activity || '[]');
                } catch {
                    activity = row.task_activity ? [row.task_activity] : [];
                }
        
                card.tasks.push({
                    task_id: row.task_id,
                    card_id: row.card_id,
                    title: row.task_title,
                    completed: !!row.task_completed,
                    position: row.task_position,
                    created_at: row.task_created_at,
                    task_description: row.task_description,
                    task_activity: activity
                });
            }
        
            return acc;
        }, []);
        


        return res.json(cards);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Failed to fetch data from the database');
    }
});


// Creates new task 
app.post('/api/task', async (req, res) => {
    const { card_id, title, desc } = req.body;
    try {
        const query = 'INSERT INTO TASKS (card_id, title, description) VALUES (?, ?, ?);';
        const [result] = await pool.query(query, [card_id, title, desc]);
        res.status(201).json({ message: 'Task successfully added', task_id: result.insertId });
    } catch (err) {
        console.error('Error creating task', err);
        res.status(500).send('Failed to create task');
    }
});

// Delete new task
app.delete('/api/task/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Await the result of the query
        const [results] = await pool.query('DELETE FROM tasks WHERE task_id = ?', [id]);

        // Respond with success
        res.status(200).send('Task deleted successfully');
    } catch (err) {
        console.error('Error deleting task', err);
        res.status(500).send('Failed to delete task');
    }
});

// Updates Task Description
app.patch('/api/task/:id', async (req, res) => {
    const { id } = req.params; 
    const { desc } = req.body; 

    try {
        const [result] = await pool.query(
            'UPDATE tasks SET description = ? WHERE task_id = ?',
            [desc, id] 
        );

        if (result.affectedRows > 0) {
            res.status(200).send('Task description updated');
        } else {
            res.status(404).send('Task not found'); 
        }
    } catch (err) {
        console.error('Error updating task description', err);
        res.status(500).send('Failed to update task');
    }
});

// Creates users once UID has been created by firebase
app.post('/api/users', async (req, res) => {
    const { user_id, name, email } = req.body;
    try {
        const query = 'INSERT INTO users (user_id, name, email) VALUES (?, ?, ?)';
        const result = await pool.query(query, [user_id, name, email]);
        res.status(201).json({ message: 'User added successfully', id: result[0].insertId });
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).send('Failed to add user');
    }
});


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
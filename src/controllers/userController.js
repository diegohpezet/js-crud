// This module creates a list with all CRUD functions
const controller = {};

controller.list = (req,res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users', (err, rows) => {
            if(err) {
                res.json(err)
            }
            res.render('users', {
                data: rows
            })
        });
    })
}

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO users SET ?', [data], (err, row) => {
            res.redirect('/');
        })
    })
}

controller.edit = (req, res) => {
    const data = req.params.id;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE id = ?',[data], (err, row) => {
            res.render('user_edit', {
                data: row[0]
            })
        })
    })
}

controller.update = (req, res) => {
    const id = req.params.id;
    const data = req.body; 
    
    req.getConnection((err, conn) => {
        conn.query('UPDATE users SET ? WHERE id = ?', [data, id], (err, row) => {
            res.redirect('/');
        })
    }) 
}

controller.delete = (req, res) => {
    const data = req.params.id;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM users WHERE id = ?', [data], (err, row) => {
            res.redirect('/');
        })
    })
}

module.exports = controller;
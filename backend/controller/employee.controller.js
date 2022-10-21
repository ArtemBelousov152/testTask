const db = require('../db')

class EmployeeController {

    // async addDocOrder(req, res) {
    //     const getDocBase = async () => {
    //         const data = await db.query('SELECT * FROM doclist');
    //         return data;
    //     }

    //     const {employee, document} = req.body;
    //     let haveDoc = false;
    //     const empDoc = await db.query('SELECT name, docName FROM employee WHERE name = $1', [employee]);

    //     const docArray = empDoc.rows[0].docname.split(',')

    //     if (docArray.length > 1) {
    //         docArray.forEach(item => {
    //             if(item === document) {
    //                 haveDoc = true;
    //             };
    //         })
    //     } else if(docArray[0] === document) {
    //         haveDoc = true;
    //     }
        
    //     if (haveDoc) {
    //         getDocBase()
    //             .then(data => res.json({flag: true}));
    //         return;
        
    //     } else {
    //         const doc = await db.query('SELECT * FROM doclist WHERE docname = $1', [document]);
            
    //         if (doc.rows.length === 0) {
    //             await db.query('INSERT INTO doclist (docname, docorder) values ($1, $2) RETURNING *', [document, 1]);

    //         } else {
    //             await db.query(`UPDATE doclist SET docorder = $1 WHERE docname = $2 RETURNING *`, [doc.rows[0].docorder + 1, document]);
    //         }

    //         const oldEmploye = await db.query('SELECT * FROM employee WHERE name = $1', [employee]);

    //         await db.query('UPDATE employee SET docname = $1 WHERE name = $2 RETURNING *', [`${oldEmploye.rows[0].docname},${document}`, employee]);
            
    //         getDocBase()
    //             .then(data => res.json({data: data.rows, flag: false}));

    //     }
    // }

    // async getDocsOrderList(req, res) {
    //     const docList = await db.query('SELECT * FROM doclist')
    //     res.json({data: docList.rows, flag: false});
    // }

    // async getEmployee(req, res) {
    //     const employeeList = await db.query('SELECT * FROM employee')
    //     const result = employeeList.rows.map(emp => {
    //         return emp.name;
    //     });
    //     res.json(result);
    // }


    async addDocOrder(req, res) {
        const {employee, document} = req.body;

        const haveDoc = await db.query('SELECT name FROM orders WHERE docname = $1', [document])
        
        if(haveDoc.rows.some(item => {
            return item.name === employee;})) {
                res.json({flag: true})
                return;
        } else {
            await db.query('INSERT INTO orders (name, docname) values ($1, $2) RETURNING *', [employee, document]);

            const countDoc = await db.query('SELECT docName, COUNT(name) from orders GROUP BY docName',[])
            res.json({data: countDoc.rows, flag: false});
            return;
        } 
    }

    async getDocsOrderList(req, res) {
        const employeeList = await db.query('SELECT docName, COUNT(name) from orders GROUP BY docName')
        res.json({data: employeeList.rows, flag: false});
        }
    
    async getEmployee(req, res) {
        const employeeList = await db.query('SELECT * FROM employee')
        const result = employeeList.rows.map(emp => {
            return emp.name;
        });
        res.json(result);
    }
}

module.exports = new EmployeeController()


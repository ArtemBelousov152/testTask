const db = require('../db')

class EmployeeController {

    async addDocOrder(req, res) {
        const {employee, document} = req.body;
        let flag = false;
        const empDoc = await db.query('SELECT name, docName FROM employee WHERE name = $1', [employee]);

        const docArray = empDoc.rows[0].docname.split(',')

        const response = await db.query('SELECT * FROM doclist');

        if (docArray.length > 1) {
            docArray.forEach(item => {
                if(item === document) {
                    flag = true;
                };
            })
        } else if(docArray[0] === document) {
            flag = true;
        }
        if (flag) {
            res.json({response: 'такой документ уже был запрошен вами'});
            return;
        }
        // } else {
        //     const doc = await db.query('SELECT * FROM doclist where docname = $1',[document]);
        //     console.log(doc.rows);
        //     if (doc.rows.length === 0) {
        //         await db.query('INSERT INTO doclist (docname, docorder) values ($1, $2) RETURNING *', [document, 1]);
        //         res.json(response);
        //         return;
        //     }
        //     const addCountDocOrder = await db.query(`UPDATE doclist SET docorder=$1 WHERE docname=$2 RETURNING *`, [response.rows[0].docorder + 1, document]);
        //     const addEmpDoc = await db.query('INSERT INTO employee SET docname=$1 WHERE name=$2 RETURNING *',[`,${document}`, employee]);
        //     res.json(await db.query('SELECT * FROM doclist'));
        // }




        // const response = await (await db.query('SELECT * FROM doclist where docname = $1',[document]));

        // if (response.rows.length > 0) {
        //     const {docorder} = response.rows[0];
        //     const newOrder = await db.query(`UPDATE doclist SET docorder=$1 WHERE docname=$2 RETURNING *`, [docorder + 1, document]);
        //     res.json(await db.query('SELECT * FROM doclist'));
        //     return;
        // }

        // const newOrder = await db.query('INSERT INTO doclist (docname, docorder) values ($1, $2) RETURNING *', [document, 1]);
        // res.json(await db.query('SELECT * FROM doclist'));
    }

    async getDocsOrderList(req, res) {
        const docList = await db.query('SELECT * FROM doclist')
        res.json(docList.rows);
    }
    async getEmployee(req, res) {
        const employeeList = await db.query('SELECT * FROM employee')
        const result = employeeList.rows.map(emp => {
            return emp.name;
        });
        res.json(result);
    }
}

module.exports = new EmployeeController();
const db = rootRequire('/app/libs/dbConn');
const config = rootRequire('/app/config');
const respon = rootRequire('/app/libs/respon');
const async = require("async");
const mysql = require('mysql');
const moment = require('moment');


// hophoho
const Sales={
	data:async(req,res)=>{
		try {
			const d=req.body;
			switch (d.a) {

				case 'sales_transaction':{
					let q = `
						SELECT transaction_no, transaction_date, cashier_name, agent_name, SUM(total_price) AS total FROM transaction_info GROUP BY transaction_no
					`
                    let R = await db.query(q);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;

				case 'sales_by_transaction':{
					let q = `
						SELECT * FROM transaction_info WHERE transaction_no = ?
					`
                    let qd = [d.transaction_no]

                    let R = await db.query(q, qd);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;

                default:
					return respon.err400('Unknown method.',null,res);
			}

		} catch (err) {
			return respon.err500(err.message,req.body,res);
		}
    },
	load:async(req,res)=>{
		try {
			const d=req.query;
			switch (d.a) {

				case 'modal_incident_details':{
                    return res.render(`incident/correlation-details`);
                }break;
				
				default:
					return respon.err400('Unknown component.',null,res);

			}

		} catch (err) {return respon.err500(err.message,req.body,res);}

	}
};
module.exports = Sales;
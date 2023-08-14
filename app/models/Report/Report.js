const db = rootRequire('/app/libs/dbConn');
const config = rootRequire('/app/config');
const respon = rootRequire('/app/libs/respon');
const async = require("async");
const mysql = require('mysql');
const moment = require('moment');


const Report={
	data:async(req,res)=>{
		try {
			const d=req.body;
			switch (d.a) {

				case 'report_by_date':{
					let q = `
						SELECT
							transaction_date,
							SUM(total_price) * 106 / 100 AS total
						FROM
							transaction_info
						WHERE
							transaction_date BETWEEN ? AND ?
						GROUP BY
							transaction_date`

					let qd = [d.start_date, d.end_date]

					let R = await db.query(q, qd);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;

				case 'report_by_product':{
					let q = `
						SELECT
							product_code,
							product_name,
							SUM(total_qty) AS qty
						FROM
							transaction_info
						WHERE
							transaction_date BETWEEN ? AND ?
						GROUP BY
							product_code,
							product_name
						ORDER BY
							qty DESC`

					let qd = [d.start_date, d.end_date]

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
module.exports = Report;
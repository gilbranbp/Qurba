const db = rootRequire('/app/libs/dbConn');
const config = rootRequire('/app/config');
const respon = rootRequire('/app/libs/respon');
const async = require("async");
const mysql = require('mysql');
const moment = require('moment');


// hophoho
const Store={
	data:async(req,res)=>{
		try {
			const d=req.body;
			switch (d.a) {

				// SEARCH & FILTER
				case 'filter_category':{
					let q = `
						SELECT DISTINCT product_category AS text
						FROM product_info 
						ORDER BY product_category ASC	
					`
                    let R = await db.query(q);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;

				case 'filter_code':{
					let q = `
						SELECT DISTINCT product_code AS text
						FROM product_info 
						ORDER BY product_code ASC	
					`
                    let R = await db.query(q);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;

				case 'filter_type':{
					let q = `
						SELECT DISTINCT product_type AS text
						FROM product_info 
						ORDER BY product_type ASC	
					`
                    let R = await db.query(q);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;

				case 'filter_zone':{
					let q = `
						SELECT DISTINCT product_zone AS text
						FROM product_info 
						ORDER BY product_zone ASC	
					`
                    let R = await db.query(q);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;

				case 'product_by_search':{
					let q = `
						SELECT * FROM product_info 
						WHERE product_name LIKE ?	
					`
                    let qd = ['%' + d.search + '%']

                    let R = await db.query(q, qd);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;

				case 'product_by_dropdown':{
					let q = `
						SELECT * FROM product_info WHERE product_zone = ? OR product_category = ? OR product_type = ? OR product_code = ?	
					`
                    let qd = [d.zone, d.category, d.type, d.code]

                    let R = await db.query(q, qd);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;


				// TRANSACTION
				case 'transaction_cashier':{
					let q = `
						SELECT id, UPPER(name) AS text FROM user_info 
						WHERE role = 'Cashier'	
					`
                    let R = await db.query(q);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;

				case 'transaction_agent':{
					let q = `
						SELECT id, UPPER(name) AS text FROM user_info 
						WHERE role = 'Agent'	
					`
                    let R = await db.query(q);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;

				case 'update_product':{

					let q = `
						UPDATE product_info
						SET product_qty = ?
						WHERE product_code = ?;
					`
                    let qd = [
						d.product_qty,
						d.product_code
					]

					console.log(qd)

                    let R = await db.query(q, qd);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;

				case 'transaction_check_out':{

					let q = `
						INSERT INTO transaction_info (transaction_no,transaction_date,status,product_code,product_type,product_name,product_price,total_qty,total_price,cashier_id,cashier_name,agent_id,agent_name)
						VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);
					`
                    let qd = [
						d.transaction_no,
						d.transaction_date,
						d.status,
						d.product_code,
						d.product_type,
						d.product_name,
						d.product_price,
						d.total_qty,
						d.total_price,
						d.cashier_id,
						d.cashier_name,
						d.agent_id,
						d.agent_name
					]

					console.log(qd)

                    let R = await db.query(q, qd);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;


				// DEPRECDASTED
				case 'popular_item':{
					let q = `
						SELECT a.id, a.item_name, a.item_price, a.item_image, b.store_location FROM item a, store b
						WHERE a.store_id = b.id
						ORDER BY item_rating DESC
						LIMIT 6`
                    let R = await db.query(q);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;

				case 'favorite_seller':{
					let q = `
						SELECT * FROM store 
						ORDER BY store_rating DESC
						LIMIT 6`
                    let R = await db.query(q);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;

				case 'search_item_by_search':{
					let q = `
						SELECT a.id, a.item_name, a.item_price, a.item_image, b.store_location FROM item a, store b
						WHERE a.store_id = b.id AND a.item_name LIKE ?
						ORDER BY item_rating DESC
					`

					let qd = ['%' + d.search + '%']

                    let R = await db.query(q, qd);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;

				case 'search_item_by_category':{
					let q = `
						SELECT a.id, a.item_name, a.item_price, a.item_image, b.store_location FROM item a, store b
						WHERE a.store_id = b.id AND a.item_category LIKE ?
						ORDER BY item_rating DESC
					`

					let qd = ['%' + d.category + '%']

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
module.exports = Store;
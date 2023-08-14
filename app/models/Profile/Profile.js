const db = rootRequire('/app/libs/dbConn');
const config = rootRequire('/app/config');
const respon = rootRequire('/app/libs/respon');
const async = require("async");
const mysql = require('mysql');
const moment = require('moment');


// hophoho
const Profile={
	data:async(req,res)=>{
		try {
			const d=req.body;
			switch (d.a) {

				case 'my_profile':{
					let q = `
						SELECT * FROM user_info WHERE id = ?
					`

					qd = [d.id]

                    let R = await db.query(q, qd);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;

				case 'update_profile':{

					let q = `
						UPDATE user_info
						SET name = ?, email = ?, phone_no = ?
						WHERE id = ?;
					`
                    let qd = [
						d.name,
						d.email,
						d.phone_no,
						d.id
					]

                    let R = await db.query(q, qd);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;

				case 'user_agent':{
					let q = `
						SELECT * FROM user_info WHERE role = 'Agent'
					`

                    let R = await db.query(q);
                    const data=R;
					return respon.ok('Sukses.',data,res);
                }break;

				case 'create_agent':{
					let q = `
						INSERT INTO user_info (email, name, phone_no, address, role, created_date)
						VALUES ( ?, ?, ?, ?, ?, ? );
					`

                    let qd = [
						d.email,
						d.name,
						d.phone_no,
						d.address,
						d.role,
						d.created_date
					]

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

				case 'modal_add_agent':{
                    return res.render(`profile/add-agent`);
                }break;
				
				default:
					return respon.err400('Unknown component.',null,res);

			}

		} catch (err) {return respon.err500(err.message,req.body,res);}
	},
	upload:async(req,res)=>{
		try {
			const d=req.body;
			return respon.ok('Sukses.',null,res);
		} catch (err) {
			return respon.err500(err.message,req.body,res);
		}
    }
};
module.exports = Profile;
'use strict'

const db = rootRequire('/app/libs/dbConn');
const config = rootRequire('/app/config');
const respon = rootRequire('/app/libs/respon');
const bcrypt = require('bcryptjs');
const async = require("async");
const jwt = require('jsonwebtoken');
const func = rootRequire('/app/libs/func');
const moment = require('moment');

const Login={
	login:async(req,res)=>{
		try{
			const email=req.body.email;
			const password=req.body.password;

			const cekUser=`SELECT * FROM user_info where email=? limit 1`;
			
			const cekUserD=[email];
			const cekUserR = await db.query(cekUser,cekUserD);
			
			console.log(cekUser)

			if (cekUserR.length<=0) {
				return respon.err400('User Not Found.',null,res)
			}

			const cekP=bcrypt.compareSync(password,cekUserR[0].password);
			if (!cekP) {
				return respon.err400('Wrong Password!.',null,res)
			}

			if (cekUserR[0].email==null) {
				return respon.err400('User tidak masuk dalam Grup.',null,res)
			}

			const upSes={ 
				id:cekUserR[0].id,
				role:cekUserR[0].role,
				email:cekUserR[0].email,
				name:cekUserR[0].name,
			}

			// const q1 =`UPDATE 
			// 				usr00100
			// 			SET 
			// 				ltm=?
			// 			WHERE 
			// 				id = ?`

			// let time = moment().format('YYYY-MM-DD HH:mm:ss')
			// let dt = [time,upSes.id]
        	// let R1 = await db.query(q1,dt)

            
            req.session.user = await func.updateSession(upSes)
			const data=req.session.user

			return respon.ok('Sukses.',data,res)
		}catch(error){
			return respon.err500(error.message,req.body,res)
		}
    },
	data:async(req,res)=>{
		try {
			const d=req.body;
			switch (d.a) {

				case 'add_user':{
					const pass=bcrypt.hashSync(d.password,12);

					// let qd = [d.name, pass, d.name, d.email, d.phone]
					
					// console.log(qd, 'qd')

					let q = `INSERT INTO user_info (username, password, name, email, phone_no) 
								VALUES (?, ?, ?, ?, ?)`
					const R = await db.query(q,[d.name, pass, d.name, d.email, d.phone]);
					const data=R;
					return respon.ok('Sukses.',data,res);
				}break;

				case 'update_user':{

					// let qd = [d.name, pass, d.name, d.email, d.phone]
					
					// console.log(qd, 'qd')

					let q = `UPDATE user_info SET name = ?, email = ?, phone_no = ? WHERE id = ?`
					const R = await db.query(q,[d.name, d.email, d.phone, d.id]);
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
	// register:async(req,res)=>{
	// 	try {
	// 		const d=req.query;
	// 		switch (d.a) {
	// 			/** User */
	// 			case 'create_new_user':{
	// 				const pass=bcrypt.hashSync(d.password,12);
	// 				let qd = {
	// 					username : d.name,
	// 					password : pass,
	// 					name : d.name,
	// 					email : d.email,
	// 					phone_no : d.phone,
	// 					birthday : d.birthday,
	// 					location : d.location
	// 				}
					
	// 				console.log(qd, 'qd')

	// 				let q = `INSERT INTO user_info (username, password, name, email, phone_no, birthday, location) 
	// 							VALUES (?, ?, ?, ?, ?, ?, ?)`
	// 				const R = await db.query(q,[d.name, pass, d.name, d.email, d.phone, d.birthday, d.location]);

	// 				console.log(R, 'R')

	// 				const data=R;
	// 				return respon.ok('Sukses.',data,res);
	// 			}break;

	// 			default:
	// 				return respon.err400('Unknown component.',null,res);

	// 		}

	// 	} catch (err) {return respon.err500(err.message,req.body,res);}

	// },
	load:async(req,res)=>{
		try {
			const d=req.query;
			switch (d.a) {
				/** User */
				case 'modal_create_user':{
                    return res.render(`login/create-user`);
                }break;

				default:
					return respon.err400('Unknown component.',null,res);

			}

		} catch (err) {return respon.err500(err.message,req.body,res);}

	}
};

module.exports = Login;
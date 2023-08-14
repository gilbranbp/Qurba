'use strict';


exports.ok=(msg,data,res)=>{
	return res.status(200).json({
		status:200,
		message:msg,
		data:data,
	});
};


exports.err400=(msg,data,res)=>{
	console.log('=====>  opps error 400: ' + msg);
	return res.status(400).json({
		status:400,
		message:msg,
		data:data,
	});
};


exports.err500=(msg,data,res)=>{
	console.log('=====>  opps error 500: ' + msg);
	return res.status(500).json({
		status:500,
		message:msg,
		data:data,
	});
};


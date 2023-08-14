$('input[name="email"],input[name="password"]').keyup(function(e){
	if(e.keyCode == 13)
	{
		$('#login').click()
	}
});

$('#login').click((e)=>{

	e.preventDefault()
	const email = $("input[name=email]").val();
	const password = $("input[name=password]").val();

	$.ajax({
		url: '/login-data',
		type: "POST",
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		data: {
			email: email,
			password: password
		},

		success:(R)=>{

			if (R.status==200) {
				console.log('R :>> ', R);
				let usr = {
					id:R.data.id,
					email:R.data.email,
					role:R.data.role,
				}
				localStorage.setItem('usr',JSON.stringify(usr))
                window.location.href = "/store"
            }
		},
		error:(err)=>{
			console.log('err :>> ', err);
			if (err.status==400) {
				$('#email').addClass('is-invalid')
				$('#password').addClass('is-invalid')
				$('#err').show()
				$('#err').html(err.responseJSON.message)
			}else{
				alert(err.responseJSON.message)
			}
		}

	});

})

$("#btn_create_user" ).click(function(e) {
	e.preventDefault();
	ajaxLoads('/login-load',{a:'modal_create_user'},(R)=>{
		$('#modal_create_user').empty().append(R)
		$('#modal_create_user').modal().show()

		$("#btn_save" ).click(function(e) {
			var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

			if ( ($('#i_name').val() || $('#i_password').val() || $('#i_email').val() || $('#i_phone').val() != '') && ($('#i_email').val()).match(validRegex) ){
				saveUser()
			} else {
				$('#err_create').show()
				$('#err_create').html('Please fill in all input!')
			}
		})

		
		// $("body").delegate( ".btnSaveUser", "click", function() {
			
		// })
	})
});

function saveUser(){
	const data = {
		a: 'add_user', 
		name: $('#i_name').val(),
		password: $('#i_password').val(),
		email: $('#i_email').val(),
		phone: $('#i_phone').val(),
	}

	ajaxPost('/login-register', data, R => {
		swal.fire({
			title: "Success",
			text:  "User has been added",
			icon: 'success',
			customClass: {
				confirmButton: 'btn btn-success btn-sm'
			}
		}).then(function () {
			window.location.assign('/login')
		});
	})
}
	
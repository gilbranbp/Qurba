var usr=JSON.parse(localStorage.getItem('usr'));

// console.log('usr :>> ', usr);

// save form

function saveform(route,data) {
    swal({
        title: 'Apakah Anda Yakin?',
        type: 'question',
        showCancelButton: true,
        confirmButtonText: 'Iya',
        cancelButtonText: 'Tidak',
        allowOutsideClick: false
    }).then(function(result) {
        if (result.value) {
            swal({
                title:'Mohon menunggu',
                allowOutsideClick:false,
            })
            swal.showLoading()
            $.post(route, data,function(r) {
                swal({
                    type: 'success',
                    title: 'Data berhasil disimpan',
                    showConfirmButton: false,
                    timer: 1500
                })
                $('#modal').modal('hide')
                $('#list').DataTable().ajax.reload(null, false);
                $('#modal').empty()
            }, 'json').fail(function(response) {
                console.log(response)
                swal(
                    'Terjadi Kesalahan!',
                    response.responseText||'Mohon Dicek Kembali',
                    // 'Mohon Dicek Kembali',
                    'error'
                )

            })

        }

    })

}



// save form then redirect

function saverd(route,data,redirect) {
    swal({
        title: 'Are You Sure?',
        type: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        allowOutsideClick: false
    }).then(function(result) {
        if (result.value) {
            swal({
                title:'Please Wait..!!',
                allowOutsideClick:false,
            })
            swal.showLoading()
            $.post(route, data,function(r) {
                swal({
                    type: 'success',
                    title: 'Data saved successfully',
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    window.location = redirect
                })
            }, 'json').fail(function(response) {
                console.log(response)
                swal(
                    'Something Wrong!',
                    //response.responseText,
                    'Please Check again',
                    'error'
                )
            })
        }
    })
}



function _delete(route,data,redirect){
    swal({
        title: 'Are You Sure Delete!',
        type: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        allowOutsideClick: false
    }).then(function(result) {
        if (result.value) {
            swal({
                title:'Please Wait..!!',
                allowOutsideClick:false,
            })
            swal.showLoading()
            $.post(route, data,function(r) {
                swal({
                    type: 'success',
                    title: 'Data saved successfully',
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    window.location = redirect
                })
            }, 'json').fail(function(response) {
                console.log(response)
                swal(
                    'Something Wrong!',
                    //response.responseText,
                    'Please Check again',
                    'error'
                )
            })
        }
    })
}



function loadshow() {
	swal({
		title:'Mohon menunggu',
		allowOutsideClick: () => !swal.isLoading()
	})
	swal.showLoading()
}

function loadhide() {
	swal.close()
}


function errSwal(err){
	console.log('ERROR',err);
	swal(
		'Terjadi Kesalahan!',
		err.responseJSON.message,
		'error'
	)
}



function ajaxPost(url,data,callback) {
    if (callback) {
        $.ajax({
            url:url,
            type:"POST",
            dataType:"json",
            data:data,
            success:(R)=>{
                callback(R);
            },
            error:(err)=>{
                errSwal(err)
            }
        });
    }else{
        return $.ajax({
    		url:url,
    		type:"POST",
    		dataType:"json",
    		data:data,
    		error:(err)=>{
    			errSwal(err)
    		}
    	});
    }
}



function ajaxLoad(url,data,callback){
	$.ajax({
		url:url,
		type:"POST",
		data:data,
		success:(R)=>{
			callback(R);
		},
	});
}

function ajaxLoads(url,data,callback){
	$.ajax({
		url:url,
		type:"GET",
		data:data,
		success:(R)=>{
			callback(R);
		},
	});
}



function loading() {

    $.blockUI({ 

        // message : '<img src="/images/telkomsel_loading.png" class="spinner" style="width: 50px;height: 50px;">',

        message: '<div class="loader-image-icons"></div>',

        // timeout: 2000,

        overlayCSS: {

            backgroundColor: '#ffff',

            opacity: 0.8,

            zIndex: 1200,

            cursor: 'wait'

        },

        css: {

            border: 0,

            color: '#fff',

            padding: 0,

            zIndex: 1201,

            backgroundColor: 'transparent'

        },

    });

    

}



function loadingelement(id) {

    $(id).block({

            message: '<h1>Processing....</h1>',

            // message: '<img src="/assets/images/loading3_.gif">',

            css: { border: 0,

                padding : 0,

                backgroundColor: 'transparent'

            }

    });

    setTimeout($.unblock, 2000);

}





function formatNumber(num) {

  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

}







function roles() {
    // Menu Provisioning
    if (usr.pv<1) {
        $( "#exe_selected" ).remove();
    }

    // Menu Settings
    if (usr.st<1) {
        $( "#add_user" ).remove();
        // $('#settings').remove();
    }

}



 function formatphone(d) {
    const isNumericInput = (event) => {
        const key = event.keyCode;
        return ((key >= 48 && key <= 57) || (key >= 96 && key <= 105));
    };

    const isModifierKey = (event) => {
        const key = event.keyCode;
        return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
            (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
            (key > 36 && key < 41) || // Allow left, up, right, down
            (
                // Allow Ctrl/Command + A,C,V,X,Z
                (event.ctrlKey === true || event.metaKey === true) &&
                (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
            )
    };

    const enforceFormat = (event) => {
        // Input must be of a valid number format or a modifier key, and not longer than ten digits
        if(!isNumericInput(event) && !isModifierKey(event)){
            event.preventDefault();
        }
    };


    const formatToPhone = (event) => {
        if(isModifierKey(event)) {return;}

        // I am lazy and don't like to type things more than once
        const key = event.keyCode;
        const target = event.target;
        const input = event.target.value.replace(/\D/g,'').substring(0,18); // First ten digits of input only
        const f = input.substring(0,1);
        const s = input.substring(1);

        if (input.length > 0) {
            if (key === 48 || key === 96) {
                target.value = '62'
            }
        }

        if(input.length > 6){
            if (f==='0') {
                target.value = '62'+s
            }
        } else if(input.length > 0){
            if (key === 48 || key === 96) {
                target.value = '62'
            }
        }
    };


    // $( "#notelp" ).keyup(function( event ) {
    $( d ).keyup(function( event ) {
        formatToPhone(event)
    }).keydown(function( event ) {
        enforceFormat(event)
    });

}



function inputnumeric(d) {

    const isNumericInput = (event) => {
        const key = event.keyCode;
        return ((key >= 48 && key <= 57) || (key >= 96 && key <= 105));
    };

    const isModifierKey = (event) => {
        const key = event.keyCode;
        return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
            (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
            (key > 36 && key < 41) || // Allow left, up, right, down
            (
                // Allow Ctrl/Command + A,C,V,X,Z
                (event.ctrlKey === true || event.metaKey === true) &&
                (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
            )
    };

    const enforceFormat = (event) => {
        // Input must be of a valid number format or a modifier key, and not longer than ten digits
        if(!isNumericInput(event) && !isModifierKey(event)){
            event.preventDefault();
        }
    };

    $( d ).keydown(function( event ) {
         enforceFormat(event)
    });

}



function remove_loader() {
    $('.loader-image-icons2').remove()
}

setInterval(function() {
    $('#clocks').html(moment().format('MMMM Do YYYY, HH:mm:ss')+' (GMT+7)')
}, 100);




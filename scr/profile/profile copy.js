
'use strict'

$(()=>{

    async function myProfile(){

        const data = {
            a :'my_profile',
            id : usr.id
        }

        const R = await ajaxPost('/profile-data', data)

        $('#i_name').val(R.data[0].name);
        $('#i_email').val(R.data[0].email);
        $('#i_phone').val(R.data[0].phone_no);

        $("#btn_save" ).click(function(e) {
			var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

			if ( ($('#i_name').val() || $('#i_email').val() || $('#i_phone').val() != '') && ($('#i_email').val()).match(validRegex) ){
				saveUser()
			} else {
				$('#err_create').show()
				$('#err_create').html('Please fill in all input!')
			}
		})
        // $('#i_name').empty().append(R.data[0].name)
    }

    function saveUser(){
        const data = {
            a: 'update_user', 
            name: $('#i_name').val(),
            email: $('#i_email').val(),
            phone: $('#i_phone').val(),
            id: usr.id,
        }
    
        ajaxPost('/login-register', data, R => {
            swal.fire({
                title: "Success",
                text:  "User has been updated",
                icon: 'success',
                customClass: {
                    confirmButton: 'btn btn-success btn-sm'
                }
            }).then(function () {
                location.reload()
            });
        })
    }

    async function myStore(){

        $("#i_store_location").select2({
            theme: "classic",
            placeholder: "Please select location",
        })

        const data = {
            a :'my_store',
            user_id : usr.id
        }

        const R = await ajaxPost('/profile-data', data)


        if ( R.data.length == 0){
            $('#btn_update_store').hide()
            $('#btn_add_item').hide()
            $('#btn_add_bundle').hide()

        } else {
            myItem(R.data[0].id)
            myBundle(R.data[0].id)
            $('#btn_create_store').hide()
            $("#i_store_location").val(R.data[0].store_location).trigger("change");
            $('#i_store_name').val(R.data[0].store_name);
            $('#i_store_location').val(R.data[0].store_location);
            $('#i_store_contact').val(R.data[0].store_contact);
            $('#i_store_link').val(R.data[0].store_link);
        }

        $("#btn_create_store" ).click(function(e) {

        	if ( ($('#i_store_name').val() && $('#i_store_location').val() && $('#i_store_contact').val()) != '' ){
        		createStore()
        	} else {
        		$('#err_create_store').show()
        		$('#err_create_store').html('Please fill in all input!')
        	}
        })

        $("#btn_update_store" ).click(function(e) {

        	if ( ($('#i_store_name').val() && $('#i_store_location').val() && $('#i_store_contact').val()) != '' ){
        		updateStore()
        	} else {
        		$('#err_create_store').show()
        		$('#err_create_store').html('Please fill in all input!')
        	}
        })

        $("#btn_add_bundle" ).click(function(e) {
            e.preventDefault();
            ajaxLoads('/profile-load',{a:'modal_add_bundle'},(R)=>{
                $('#modal_add_bundle').empty().append(R)
                $('#modal_add_bundle').modal().show()

                $("#i_bundle_category").select2({
                    theme: "classic",
                    placeholder: "Please select category",
                })

                $("#i_bundle_discount").select2({
                    theme: "classic",
                    placeholder: "Please choose discount",
                })

                $("#btn_add_bundle_to_folder_n_database" ).click(function(e) {
                    uploadToFolder()
                })

                let form_data = ''
                // uploadToFolder()

                $("input[type=file]").on('change',function(){
                    var file = $('#upload_file');
                    var file_name = $(file).prop("files")[0];
                    form_data = new FormData();
                    // nyoba
                    // form_data.forEach(file => console.log(file, 'hello'))
                    form_data.append("file", file_name);
                    
                    // console.log(form_data.append("file", file_name))
                });

                async function uploadToFolder() {

                    if ( $('#upload_file').prop("files")[0] != undefined && $('#i_bundle_name').val() !='' && $('#i_bundle_category').val() !='' && $('#i_bundle_discount').val() !='' ) {

                        $("#alertEmpty").hide()

                        $.ajax({
                            url: "/profile-upload",
                            type: "post",
                            data: form_data,
                            cache: false,
                            processData: false,
                            contentType: false,
                            success: function(r){
                                uploadToDatabase()
                            },
                            error: function (e) {
                                // alert('fail')
                                console.log("some error", e);
                            }
                        });
                    } else {
                        $("#alertEmpty").show()
                    }

                }

                async function uploadToDatabase() {

                    const datas = {
                        a :'my_store',
                        user_id : usr.id
                    }
            
                    const store = await ajaxPost('/profile-data', datas)

                    const data= {
                        a: 'add_bundle',
                        bundle_name: $('#i_bundle_name').val(),
                        bundle_image: $('#upload_file').prop("files")[0].name,
                        bundle_category: $('#i_bundle_category').val(),
                        bundle_discount: $('#i_bundle_discount').val(),
                        bundle_description: $('#i_bundle_description').val(),
                        store_id: store.data[0].id
                    }
                    console.log(data)

                    ajaxPost('/profile-data',data,(R)=>{
                        swal.fire({
                            title: "Success",
                            text:  "Bundle has been added",
                            icon: 'success',
                            customClass: {
                                confirmButton: 'btn btn-success btn-sm'
                            }
                        }).then(function () {
                            $('#modal_uploads').modal('toggle');
                            location.reload();
                        });
                    })
                }
            })
            
        });

        $("#btn_add_item" ).click(function(e) {
            e.preventDefault();
            ajaxLoads('/profile-load',{a:'modal_add_item'},(R)=>{
                $('#modal_add_item').empty().append(R)
                $('#modal_add_item').modal().show()

                $("#i_item_category").select2({
                    theme: "classic",
                    placeholder: "Please select category",
                })

                $("#btn_add_to_folder_n_database" ).click(function(e) {
                    uploadToFolder()
                })

                let form_data = ''
                // uploadToFolder()

                $("input[type=file]").on('change',function(){
                    var file = $('#upload_file');
                    var file_name = $(file).prop("files")[0];
                    form_data = new FormData();
                    // nyoba
                    // form_data.forEach(file => console.log(file, 'hello'))
                    form_data.append("file", file_name);
                    
                    // console.log(form_data.append("file", file_name))
                });

                async function uploadToFolder() {

                    if ( $('#upload_file').prop("files")[0] != undefined && $('#i_item_name').val() !='' && $('#i_item_price').val() !='' && $('#i_item_category').val() !='' ) {

                        $("#alertEmpty").hide()

                        $.ajax({
                            url: "/profile-upload",
                            type: "post",
                            data: form_data,
                            cache: false,
                            processData: false,
                            contentType: false,
                            success: function(r){
                                uploadToDatabase()
                            },
                            error: function (e) {
                                // alert('fail')
                                console.log("some error", e);
                            }
                        });
                    } else {
                        $("#alertEmpty").show()
                    }

                }

                async function uploadToDatabase() {

                    const datas = {
                        a :'my_store',
                        user_id : usr.id
                    }
            
                    const store = await ajaxPost('/profile-data', datas)

                    const data= {
                        a: 'add_item',
                        item_name: $('#i_item_name').val(),
                        item_price: $('#i_item_price').val(),
                        item_image: $('#upload_file').prop("files")[0].name,
                        item_category: $('#i_item_category').val(),
                        item_description: $('#i_item_description').val(),
                        store_id: store.data[0].id
                    }
                    console.log(data)

                    ajaxPost('/profile-data',data,(R)=>{
                        swal.fire({
                            title: "Success",
                            text:  "Item has been added",
                            icon: 'success',
                            customClass: {
                                confirmButton: 'btn btn-success btn-sm'
                            }
                        }).then(function () {
                            $('#modal_uploads').modal('toggle');
                            location.reload();
                        });
                    })
                }
            })
            
        });

        function createStore(){
            const data = {
                a: 'add_store', 
                store_name: $('#i_store_name').val(),
                store_location: $('#i_store_location').val(),
                store_contact: $('#i_store_contact').val(),
                store_link: $('#i_store_link').val(),
                user_id: usr.id,
            }
        
            ajaxPost('/profile-data', data, R => {
                swal.fire({
                    title: "Success",
                    text:  "Store has been created",
                    icon: 'success',
                    customClass: {
                        confirmButton: 'btn btn-success btn-sm'
                    }
                }).then(function () {
                    location.reload()
                });
            })
        }

        function updateStore(){
            const data = {
                a: 'update_store', 
                store_name: $('#i_store_name').val(),
                store_location: $('#i_store_location').val(),
                store_contact: $('#i_store_contact').val(),
                store_link: $('#i_store_link').val(),
                user_id: usr.id,
            }
        
            ajaxPost('/profile-data', data, R => {
                swal.fire({
                    title: "Success",
                    text:  "Store has been updated",
                    icon: 'success',
                    customClass: {
                        confirmButton: 'btn btn-success btn-sm'
                    }
                }).then(function () {
                    location.reload()
                });
            })
        }
    }

    async function myBundle(store_id){

        const data = {
            a :'bundle_item',
            store_id : store_id
        }

        const R = await ajaxPost('/profile-data', data)

        const container = document.getElementById('card_my_bundle');

        const myItem = R.data

        myItem.forEach((result, idx) => {
            // Create card element
            const card = document.createElement('div');
            card.classList = 'card-body';

            // Construct card content
            const content = `
                <div class="col-2 btn-bundle" id=${result.id} style="cursor: pointer;">
                    <div class="card h-100" style="border-radius: 15px;">
                        <div class="card-body p-1">
                            <div class="row">
                                <div class="col-12">
                                    <img class='item-image' src="/global_assets/images/${result.bundle_image}" alt="">
                                </div>
                            </div>
                            <div class="row p-2">
                                <div class="col-12" style="margin: auto;">
                                    <span>${result.bundle_name}</span>
                                    <p class="text-muted">${result.store_location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += content;
        }) 

        $(".btn-bundle" ).click(function(e) {
            var id = $(this).attr('id');
            let redirect = window.location.origin + "/bundle?id=" + id;
            window.location.href = redirect
        });


    }

    async function myItem(store_id){

        const data = {
            a :'store_item',
            store_id : store_id
        }

        const R = await ajaxPost('/profile-data', data)

        const container = document.getElementById('card_my_items');

        const myItem = R.data

        myItem.forEach((result, idx) => {
            // Create card element
            const card = document.createElement('div');
            card.classList = 'card-body';

            // Construct card content
            const content = `
                <div class="col-2 btn-item" id=${result.id} style="cursor: pointer;">
                    <div class="card h-100" style="border-radius: 15px;">
                        <div class="card-body p-1">
                            <div class="row">
                                <div class="col-12">
                                    <img class='item-image' src="/global_assets/images/${result.item_image}" alt="">
                                </div>
                            </div>
                            <div class="row p-2">
                                <div class="col-12" style="margin: auto;">
                                    <span style="display: block;"><b>RM ${(result.item_price).toFixed(2)}</b></span>
                                    <span>${result.item_name}</span>
                                    <p class="text-muted">${result.store_location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += content;
        }) 

        $(".btn-item" ).click(function(e) {
            var id = $(this).attr('id');
            let redirect = window.location.origin + "/item?id=" + id;
            window.location.href = redirect
        });


    }

    async function init() {
        myProfile()
        // myStore()
    }
    init()
})
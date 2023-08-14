
'use strict'

$(()=>{

    async function myProfile(){

        $('#update_msg').hide()

        const data = {
            a :'my_profile',
            id : usr.id
        }

        const R = await ajaxPost('/profile-data', data)

        $('#i_name').val(R.data[0].name);
        $('#i_email').val(R.data[0].email);
        $('#i_phone').val(R.data[0].phone_no);

        $("#btn_update").click(function(e) {
            if ($('#i_name').val() == '' || $('#i_email').val() == '' || $('#i_phone').val() == ''){
                $('#update_msg').show()
            } else {
                $('#update_msg').hide()
                updateProfile()
            }
        });

    }

    async function updateProfile(){

        const data = {
            a: 'update_profile', 
            name: $('#i_name').val(),
            email: $('#i_email').val(),
            phone_no: $('#i_phone').val(),
            id: usr.id,
        }
    
        // console.log(data)
        ajaxPost('/profile-data', data, R => {
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

    async function dataAgent(){

        const data = {
            a :'user_agent'
        }

        const R = await ajaxPost('/profile-data', data)

        tableSetting('#tbl_agent', R.data)

        $("#btn_add_agent" ).click(function(e) {
            e.preventDefault();
            ajaxLoads('/profile-load',{a:'modal_add_agent'},(R)=>{
                $('#modal_add_agent').empty().append(R)
                $('#modal_add_agent').modal().show()

                $("#btn_add_agent_to_database" ).click(function(e) {
                    addToDatabase()
                })

                async function addToDatabase(){

                    const datas = {
                        a :'create_agent',
                        email : $('#i_agent_email').val(),
						name : $('#i_agent_name').val(),
						phone_no : $('#i_agent_phone').val(),
						address : $('#i_agent_address').val(),
						role : 'Agent',
						created_date : moment().format('YYYY-MM-DD')
                    }
            
                    ajaxPost('/profile-data',datas,(R)=>{
                        swal.fire({
                            title: "Success",
                            text:  "Agent has been added",
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

    }

    async function tableSetting(id, data) {

        const column = Object.keys(data[0])
        const rowData = data
            
        function DateCellRenderer(params) {
            return moment(params.value).format('YYYY-MM-DD')
        }

        // specify the columns
        const columnDefs = [
            { field: column[3], headerName: 'Name', sortable: true, filter: true, resizable: true, flex: 1},
            { field: column[1], headerName: 'Email', sortable: true, filter: true, resizable: true, flex: 1},
            { field: column[4], headerName: 'Phone No.', sortable: true, filter: true, resizable: true, flex: 1},
            { field: column[5], headerName: 'Address', sortable: true, filter: true, resizable: true, flex: 1},
            { field: column[7], headerName: 'Join Date', sortable: true, filter: true, resizable: true, flex: 1, cellRenderer: DateCellRenderer}
        ];

        // let the grid know which columns and what data to use
        const gridOptions = {
            columnDefs: columnDefs,
            rowData: rowData,
            pagination: true,
            paginationAutoPageSize: true
        };
    
        // lookup the container we want the Grid to use
        const eGridDiv = document.querySelector(id);
    
        // create the grid passing in the div to use together with the columns & data we want to use
        new agGrid.Grid(eGridDiv, gridOptions);

        $("#btn_reset").click(function(e) {
            $("#card_transaction").empty()
            transaction_cart = []
        });
          
    }

    async function init() {
        myProfile()
        dataAgent()
    }
    init()
})
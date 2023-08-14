
'use strict'

$(()=>{

    let link = window.location.search
    let transaction_id = link.replace('?transactionid=','')

    async function dataSales(){

        const data = {
            a :'sales_by_transaction',
            transaction_no: transaction_id
        }

        const R = await ajaxPost('/sales-data', data)

        topCard(R.data)
        tableSetting('#tbl_transaction', R.data)
    }

    async function topCard(data){

        $('#i_transaction_no').empty().append(data[0].transaction_no == ''? '-' : '#' + data[0].transaction_no)
        $('#i_transaction_date').empty().append(data[0].transaction_date == ''? '-' : moment(data[0].transaction_date).format('YYYY-MM-DD'))
        $('#i_transaction_status').empty().append(data[0].status == ''? '-' : data[0].status)
        $('#i_cashier_name').empty().append(data[0].cashier_name == ''? '-' : data[0].cashier_name)
        $('#i_agent_name').empty().append(data[0].agent_name == ''? '-' : data[0].agent_name)

        let total = data.reduce((total, obj) => obj.total_price + total,0)
        let gst = total * 106 / 100
        let charge = 0
        let discount = 0

        $('#i_price').empty().append('RM ' + Intl.NumberFormat('en-US').format(total))
        $('#i_gst').empty().append('RM ' + Intl.NumberFormat('en-US').format(gst))
        $('#i_charge').empty().append('RM ' + Intl.NumberFormat('en-US').format(charge))
        $('#i_discount').empty().append('RM ' + Intl.NumberFormat('en-US').format(discount))
        $('#i_total_price').empty().append('RM ' + Intl.NumberFormat('en-US').format(gst))

    }

    async function tableSetting(id, data) {

        const column = Object.keys(data[0])
        const rowData = data
          
        function RMCellRenderer(params) {
            let price = Intl.NumberFormat('en-US').format(params.value)
            return 'RM ' + price
        }
  
            // specify the columns
          const columnDefs = [
            // { field: column[0], headerName: column[0], sortable: true, filter: true, resizable: true, flex: 1},
            { field: column[4], headerName: 'Code', sortable: true, filter: true, resizable: true, flex: 1},
            { field: column[5], headerName: 'Type', sortable: true, filter: true, resizable: true, flex: 1},
            { field: column[6], headerName: 'Product', sortable: true, filter: true, resizable: true, flex: 1},
            { field: column[7], headerName: 'Price', sortable: true, filter: true, resizable: true, flex: 1, cellRenderer: RMCellRenderer},
            { field: column[8], headerName: 'Qty', sortable: true, filter: true, resizable: true, flex: 1},
            { field: column[13], headerName: 'Total', sortable: true, filter: true, resizable: true, flex: 1, cellRenderer: RMCellRenderer}
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
    
          
    }

    async function init() {

        dataSales()

    }
    init()
})

'use strict'

$(()=>{

    async function dataSales(){

        const data = {
            a :'sales_transaction'
        }

        const R = await ajaxPost('/sales-data', data)

        tableSetting('#tbl_sales', R.data)
    }

    async function tableSetting(id, data) {

        const column = Object.keys(data[0])
        const rowData = data

        function TransactionCellRendere(params) {
            // return '<button type="button" class="btn text-primary">#'+params.value+'</button>'
            return '<a href="/sales-details?transactionid='+ params.value +'">#' + params.value + '</a>'
        }
            
        function DateCellRenderer(params) {
            return moment(params.value).format('YYYY-MM-DD')
        }

        function RMCellRenderer(params) {
            let price = Intl.NumberFormat('en-US').format(params.value) * 106 / 100
            return 'RM ' + price
        }

        // specify the columns
        const columnDefs = [
            { field: column[0], headerName: 'Transaction No.', sortable: true, filter: true, resizable: true, flex: 1, cellRenderer: TransactionCellRendere},
            { field: column[1], headerName: 'Date', sortable: true, filter: true, resizable: true, flex: 1, cellRenderer: DateCellRenderer},
            { field: column[2], headerName: 'Cashier', sortable: true, filter: true, resizable: true, flex: 1},
            { field: column[4], headerName: 'Total Price', sortable: true, filter: true, resizable: true, flex: 1, cellRenderer: RMCellRenderer}
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

        dataSales()

    }
    init()
})
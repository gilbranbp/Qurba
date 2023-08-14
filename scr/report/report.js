
'use strict'

$(()=>{

    async function reportFilter(){

        $(".card").hide()

        $('#filterdate').html('<i class="icon-calendar mr-2"></i>'+moment().format('YYYY-MM-DD') + ' &nbsp; - &nbsp; ' + moment().format('YYYY-MM-DD'));
        $('#tgl0').val(moment().format('YYYY-MM-DD'))
        $('#tgl1').val(moment().format('YYYY-MM-DD'))
        $('#filterdate').daterangepicker({
            parentEl: '.content-inner',
            format: 'YYYY-MM-DD',
            timePicker: false,
            startDate: moment(),
            endDate: moment(),
            "opens": "right",
            linkedCalendars: true,
            locale: {
                format: 'YYYY-MM-DD'
            },
            ranges: {
                'Today': [moment(), moment()],
                'Last 7 Days': [moment().subtract(7, 'days'), moment()],
                'Last 30 Days': [moment().subtract(30, 'days'), moment()]
            },
        }, function(start, end, label) {
            $('#tgl0').val(start.format('YYYY-MM-DD'))
            $('#tgl1').val(end.format('YYYY-MM-DD'))
            $('#filterdate').html('<i class="icon-calendar mr-2"></i>'+start.format('YYYY-MM-DD') + ' &nbsp; - &nbsp; ' + end.format('YYYY-MM-DD'));
        })

        $("#btn_generate").click(function(e) {
            dataReport($('#tgl0').val(), $('#tgl1').val())
            $(".card").show()
            $("#s_periode").append('Periode ' + $('#tgl0').val() + ' to ' + $('#tgl0').val())
        });
    }

    async function dataReport(start_date, end_date){

        const data_report_date = {
            a :'report_by_date',
            start_date : start_date,
            end_date : end_date
        }

        const report_date = await ajaxPost('/report-data', data_report_date)

        tblReportByDate('#tbl_report_by_date', report_date.data)


        const data_report_product = {
            a :'report_by_product',
            start_date : start_date,
            end_date : end_date
        }

        const report_product = await ajaxPost('/report-data', data_report_product)
        
        tblReportByProduct('#tbl_report_by_product', report_product.data)

    }
    async function tblReportByDate(id, data){

        $(id).empty()

        const column = Object.keys(data[0])
        const rowData = data
          
        function RMCellRenderer(params) {
            let price = Intl.NumberFormat('en-US').format(params.value)
            return 'RM ' + price
        }

        function DateCellRenderer(params) {
            return moment(params.value).format('YYYY-MM-DD')
        }
  
        // specify the columns
        const columnDefs = [
            { field: column[0], headerName: 'Date', sortable: true, filter: true, resizable: true, flex: 1, cellRenderer: DateCellRenderer},
            { field: column[1], headerName: 'Total (RM)', sortable: true, filter: true, resizable: true, flex: 1, cellRenderer: RMCellRenderer}
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

    async function tblReportByProduct(id, data){

        $(id).empty()

        const column = Object.keys(data[0])
        const rowData = data
          
        // specify the columns
        const columnDefs = [
            { field: column[0], headerName: 'Code', sortable: true, filter: true, resizable: true, flex: 1},
            { field: column[1], headerName: 'Product', sortable: true, filter: true, resizable: true, flex: 1},
            { field: column[2], headerName: 'Qty', sortable: true, filter: true, resizable: true, flex: 1}
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

        reportFilter()
    }
    init()
})

'use strict'

$(()=>{

    let transaction_id = Math.floor(Math.random() * 900) + 100
    let datetime = moment().unix()

    let transaction = transaction_id + datetime

    let transaction_cart = []

    async function topSearch(){

        // const price = 2.75 + 2.70;

        // console.log(new Intl.NumberFormat('en-US').format(price));

        // FILTER CATEGORY
        const category_filter = {
            a :'filter_category'
        }

        const category = await ajaxPost('/store-data', category_filter)

        let all_category = { text: 'All Category' }

        category.data.splice(0, 0, all_category);

        category.data.forEach((item, i) => {
            item.id = i + 1;
        });

        // FILTER CODE
        const code_filter = {
            a :'filter_code'
        }

        const code = await ajaxPost('/store-data', code_filter)

        let all_code = { text: 'All Code' }

        code.data.splice(0, 0, all_code);

        code.data.forEach((item, i) => {
            item.id = i + 1;
        });

        // FILTER TYPE
        const type_filter = {
            a :'filter_type'
        }

        const type = await ajaxPost('/store-data', type_filter)

        let all_type = { text: 'All Type' }

        type.data.splice(0, 0, all_type);

        type.data.forEach((item, i) => {
            item.id = i + 1;
        });

        // FILTER ZONE
        const zone_filter = {
            a :'filter_zone'
        }

        const zone = await ajaxPost('/store-data', zone_filter)

        let all_zone = { text: 'All Zone' }

        zone.data.splice(0, 0, all_zone);

        zone.data.forEach((item, i) => {
            item.id = i + 1;
        });

        $("#i_category").select2({
            theme: "classic",
            data: category.data
            // placeholder: "Please select location",
        })

        $("#i_code").select2({
            theme: "classic",
            data: code.data
            // placeholder: "Please select location",
        })

        $("#i_type").select2({
            theme: "classic",
            data: type.data
            // placeholder: "Please select location",
        })

        $("#i_zone").select2({
            theme: "classic",
            data: zone.data
            // placeholder: "Please select location",
        })

        $("#input_search").change(function(){

            $('#i_zone').empty()
            $("#i_zone").select2({ data: zone.data })
            $('#i_category').empty()
            $("#i_category").select2({ data: category.data })
            $('#i_type').empty()
            $("#i_type").select2({ data: type.data })
            $('#i_code').empty()
            $("#i_code").select2({ data: code.data })

            cardProductbySearch("search", $("#input_search").val())
            
        });

        $("#i_zone").change(function(){

            $("#input_search").val('')

            $('#i_category').empty()
            $("#i_category").select2({ data: category.data })
            $('#i_type').empty()
            $("#i_type").select2({ data: type.data })
            $('#i_code').empty()
            $("#i_code").select2({ data: code.data })
            
            cardProductbyDropdown("zone", $("#i_zone").find(":selected").text())

        });

        $("#i_category").change(function(){

            $("#input_search").val('')

            $('#i_zone').empty()
            $("#i_zone").select2({ data: zone.data })
            $('#i_type').empty()
            $("#i_type").select2({ data: type.data })
            $('#i_code').empty()
            $("#i_code").select2({ data: code.data })

            cardProductbyDropdown("category", $("#i_category").find(":selected").text())

        });

        $("#i_type").change(function(){

            $("#input_search").val('')

            $('#i_zone').empty()
            $("#i_zone").select2({ data: zone.data })
            $('#i_category').empty()
            $("#i_category").select2({ data: category.data })
            $('#i_code').empty()
            $("#i_code").select2({ data: code.data })

            cardProductbyDropdown("type", $("#i_type").find(":selected").text())

        });

        $("#i_code").change(function(){

            $("#input_search").val('')

            $('#i_zone').empty()
            $("#i_zone").select2({ data: zone.data })
            $('#i_category').empty()
            $("#i_category").select2({ data: category.data })
            $('#i_type').empty()
            $("#i_type").select2({ data: type.data })

            cardProductbyDropdown("code", $("#i_code").find(":selected").text())

        });

    }

    async function cardProductbySearch(index, value){      
        
        $("#card_product").empty()

        const data = {
            a :'product_by_search',
            search : value

        }

        const R = await ajaxPost('/store-data', data)

        // console.log(R.data)

        $("#product_not_available_msg").hide()

        if (R.data.length > 0) {
        
        } else {
            $("#product_not_available_msg").show()
        }

        const container = document.getElementById('card_product');

        const product = R.data

        transactionReport(product)

        product.forEach((result, idx) => {
            // Create card element
            const card = document.createElement('div');
            card.classList = 'card-body';

            // Construct card content
            const content = `
                <div class="col-3 btn-item pb-3">
                    <div class="card h-100" style="border-radius: 5px;">
                        <div class="card-body p-1">
                            <div class="row">
                                <div class="col-12">
                                    <img class='item-image' src="/global_assets/images/default_product.png" alt="">
                                </div>
                            </div>
                            <div class="row p-2">
                                <div class="col-12" style="margin: auto;">
                                    <span style="display: block; color: #FF8A68; font-size: 14px;"><b>RM ${result.product_price}</b></span>
                                    <p class="m-0">${result.product_name}</p>
                                    <p class="text-muted">${result.product_qty} item available</p>
                                    <input class="totalItem mb-1" id="total_${result.id}" type="number" value="1" min="1" max="${result.stock}" style="width: 100%; text-align: center;">
                                    <button class="btn btn-custom-secondary add-item" id=${result.id} style="width: 100%">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += content;
        }) 

    }

    async function cardProductbyDropdown(index, value){    
        
        $("#card_product").empty()

        if (value.includes("All ")){
            cardProductbySearch("search", '')
        }

        let zone = ''
        let category = ''
        let type = ''
        let code = ''
        
        if (index == 'zone'){
            zone = value
        }
        
        if (index == 'category'){
            category = value
        }

        if (index == 'type'){
            type = value
        }

        if (index == 'code'){
            code = value
        }

        const data = {
            a :'product_by_dropdown',
            zone : zone,
            category : category,
            type : type,
            code : code
        }

        const R = await ajaxPost('/store-data', data)

        $("#product_not_available_msg").hide()

        if (R.data.length > 0) {
        
        } else {
            $("#product_not_available_msg").show()
        }

        const container = document.getElementById('card_product');

        const product = R.data

        transactionReport(product)

        product.forEach((result, idx) => {
            // Create card element
            const card = document.createElement('div');
            card.classList = 'card-body';

            // Construct card content
            const content = `
                <div class="col-3 btn-item pb-3">
                    <div class="card h-100" style="border-radius: 5px;">
                        <div class="card-body p-1">
                            <div class="row">
                                <div class="col-12">
                                    <img class='item-image' src="/global_assets/images/default_product.png" alt="">
                                </div>
                            </div>
                            <div class="row p-2">
                                <div class="col-12" style="margin: auto;">
                                    <span style="display: block; color: #FF8A68; font-size: 14px;"><b>RM ${result.product_price}</b></span>
                                    <p class="m-0">${result.product_name}</p>
                                    <p class="text-muted">${result.product_qty} item available</p>
                                    <input class="totalItem mb-1" id="total_${result.id}" type="number" value="1" min="1" max="${result.stock}" style="width: 100%; text-align: center;">
                                    <button class="btn btn-custom-secondary add-item" id=${result.id} style="width: 100%">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += content;
        }) 
    }

    async function transactionReport(product){

        const cashier_transaction = {
            a :'transaction_cashier',
        }

        const cashier = await ajaxPost('/store-data', cashier_transaction)

        $("#i_cashier").select2({
            theme: "classic",
            placeholder: "Please select Cashier",
            data: cashier.data
        })


        const agent_transaction = {
            a :'transaction_agent',
        }

        const agent = await ajaxPost('/store-data', agent_transaction)

        $("#i_agent").select2({
            theme: "classic",
            placeholder: "Please select Agent",
            data: agent.data
        })

        // let transaction_cart = []

        $(".add-item" ).click(function(e) {
            let id = $(this).attr('id')
            let total = $('#total_' + id).val()

            let data = product.find(e => e.id === Number(id));
            data.total_qty = Number(total);
            data.total_price = Number(data.product_price) * Number(total) ;

            transaction_cart.push(data)
            transactionProduct(data)

            let price = transaction_cart.reduce((total, obj) => obj.total_price + total,0)
            let total_price = price * 106 / 100

            $("#i_price").empty()
            $("#i_price").append('RM ' + price)

            $("#i_total_price").empty()
            $("#i_total_price").append('RM ' + total_price)
        });

        $("#btn_reset").click(function(e) {
            $("#card_transaction").empty()
            transaction_cart = []
        });

        $("#btn_check_out").click(function(e) {
            
            e.stopImmediatePropagation()
            console.log(transaction_cart.length)

            if (transaction_cart.length > 0){
                for (let i in transaction_cart) {

                    const data = {
                        a :'update_product',
                        product_code: transaction_cart[i].product_code,
                        product_qty: transaction_cart[i].product_qty - transaction_cart[i].total_qty
                    }
            
                    const R = ajaxPost('/store-data', data)
                    
                }
    
                for (let i in transaction_cart) {
    
                    const data = {
                        a :'transaction_check_out',
                        transaction_no: transaction,
                        transaction_date: moment().format('YYYY-MM-DD'),
                        status: 'Paid',
                        product_code: transaction_cart[i].product_code,
                        product_type: transaction_cart[i].product_type,
                        product_name: transaction_cart[i].product_name,
                        product_price: transaction_cart[i].product_price,
                        total_qty: transaction_cart[i].total_qty,
                        total_price: transaction_cart[i].total_price,
                        cashier_id: $("#i_cashier").find(":selected").val(),
                        cashier_name: $("#i_cashier").find(":selected").text(),
                        agent_id: $("#i_agent").find(":selected").val(),
                        agent_name: $("#i_agent").find(":selected").text()
                    }
            
                    const R = ajaxPost('/store-data', data)
                    
                }

                let redirect = window.location.origin + "/sales-details?transactionid=" + transaction;
                window.location.href = redirect

            }
            
        });

    }

    async function transactionProduct(data){

        let product = [data]

        const container = document.getElementById('card_transaction');

        product.forEach((result, idx) => {
            // Create card element
            const card = document.createElement('div');
            card.classList = 'card-body';

            // Construct card content
            const content = `
                <div class="col-6">
                    <p>${result.product_name}</p>
                </div>
                <div class="col-3" style="text-align: center;">
                    <p>${result.total_qty}</p>
                </div>
                <div class="col-3" style="text-align: center;">
                    <p>RM ${Intl.NumberFormat('en-US').format(Number(result.product_price) * result.total_qty)}</p>
                </div>
            `;
            container.innerHTML += content;
        }) 
    }

    async function init() {

        topSearch()
        // cardProduct()
        cardProductbySearch('search', '')
        // transactionReport()
    }
    init()
})
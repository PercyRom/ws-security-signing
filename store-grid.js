Ext.define('Aldem.controller.CFacturacion', {
    extend: 'Ext.app.Controller',
    alias: 'controller.cmkfacturacion',

    refs: {
        gpFacturacion: '#GpFacturacion',
        frmFacturacion: '#frmFacturacion',
        lblSumTotalFacturacion: '#lblSumTotal',
        gpConsultasFacturacion: '#GpConsultasFacturacion',
        upload_excel: '#upload_excel',
        txtCliente: '#txtCliente',
        txtProtocol: '#txtProtocol',
        txtLaboratory: '#txtLaboratory',
        txtContents: '#txtContents',
        txtPais: '#txtPais',
        exp_upload_excel: '#exp_upload_excel',
        expGpFacturacion: '#ExpGpFacturacion'
    },

    control: {
        "#add_per_kg": {
            render: 'onAdd_per_kgRender',
            change: 'onAdd_per_kgChange',
            specialkey: 'onAdd_per_kgSpecialkey'
        },
        "#upload_excel": {
            change: 'onUpload_excelChange'
        },
        "#invoice": {
            specialkey: 'onInvoiceSpecialkey'
        },
        "#base_up": {
            specialkey: 'onBase_upSpecialkey'
        },
        "#btnFactRegistrar": {
            click: 'onBtnFactRegistrarClick'
        },
        "#btnFormatoFacturacion": {
            click: 'onBtnFormatoFacturacionClick'
        },
        "#btnVaciarDatos": {
            click: 'onBtnVaciarDatosClick'
        },
        "#GpConsultasFacturacion": {
            rowdblclick: 'onGpConsultasFacturacionRowDblClick'
        },
        "#VGFacturacion": {
            refresh: 'onVGFacturacionRefresh'
        },
        "#exp_upload_excel": {
            change: 'onExp_upload_excelChange'
        },
        "#btnExpVaciarDatos": {
            click: 'onBtnExpVaciarDatosClick'
        },
        "#exp_mawb": {
            specialkey: 'onExp_mawbSpecialkey'
        },
        "#exp_gross": {
            specialkey: 'onExp_grossSpecialkey'
        },
        "#exp_gadd_per_kg": {
            specialkey: 'onExp_gadd_per_kgSpecialkey'
        },
        "#exp_gfin_sem": {
            specialkey: 'onExp_gfin_semSpecialkey'
        },
        "#exp_billing": {
            specialkey: 'onExp_billingSpecialkey'
        }
    },

    onAdd_per_kgRender: function(component, eOpts) {


    },

    onAdd_per_kgChange: function(field, newValue, oldValue, eOpts) {

    },

    onUpload_excelChange: function(filefield, value, eOpts) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(filefield.fileInputEl.dom.files[0]);

        var grid = this.getGpFacturacion();
        var lblTotal = this.getLblSumTotalFacturacion();


        reader.onload = function(e) {

            var data = new Uint8Array(reader.result);
            var wb = XLSX.read(data,{type:'array'});

            var ws = wb.Sheets[wb.SheetNames[0]];

            var json_data = XLSX.utils.sheet_to_json(ws);

            var stMKFacturacion = Ext.getStore('stMKFacturacion');

            for(var key in json_data){

                if(Ext.String.trim(json_data[key].c_remitente).toUpperCase() == 'LIMA'){
                    json_data[key].base_up_to_kg = 22.50;
                    json_data[key].add_per_kg = 22.50;

                }else{
                    json_data[key].base_up_to_kg = 122.50;
                    json_data[key].add_per_kg = 0.00;

                }

                json_data[key].charge = json_data[key].base_up_to_kg + json_data[key].add_per_kg;
                json_data[key].total = json_data[key].base_up_to_kg + json_data[key].add_per_kg;
            }

            stMKFacturacion.getProxy().data = {'data':json_data};
            stMKFacturacion.load();

            lblTotal.setValue(Ext.util.Format.number(grid.getStore().sum('total'), '0,000.00'));


            var i = 0;
            grid.getStore().each(function(record){
                if(Ext.String.trim(record.data.c_remitente).toUpperCase() != 'LIMA'){
                    grid.getView().addRowCls(i, 'background-color-row');
                }
                i++;
            });

        };




    },

    onAdd_per_kgSpecialkey: function(field, e, eOpts) {
        if (e.getKey() == e.ENTER) {


            var grid = this.getGpFacturacion();

            var base_up_kg = grid.selModel.getCurrentPosition().record.data.base_up_to_kg;
            var add_per_kg = grid.selModel.getCurrentPosition().record.data.add_per_kg;

            grid.selModel.getCurrentPosition().record.data.total = (base_up_kg + add_per_kg);
            grid.selModel.getCurrentPosition().record.data.charge = (base_up_kg + add_per_kg);

            this.getLblSumTotalFacturacion().setValue(Ext.util.Format.number(grid.getStore().sum('total'), '0,000.00'));

            grid.getView().refresh();
        }

    },

    onInvoiceSpecialkey: function(field, e, eOpts) {
        if (e.getKey() == e.ENTER) {

            var initNumber = Number(field.value);

            var grid = this.getGpFacturacion();

            grid.getStore().each(function(record,id){
                record.data.invoice = initNumber;
                initNumber = initNumber + 1;
            });

            grid.getView().refresh();
        }
    },

    onBase_upSpecialkey: function(field, e, eOpts) {
        if (e.getKey() == e.ENTER) {

            var grid = this.getGpFacturacion();

            var base_up_kg = grid.selModel.getCurrentPosition().record.data.base_up_to_kg;
            var add_per_kg = grid.selModel.getCurrentPosition().record.data.add_per_kg;

            grid.selModel.getCurrentPosition().record.data.total = (base_up_kg + add_per_kg);
            grid.selModel.getCurrentPosition().record.data.charge = (base_up_kg + add_per_kg);

            this.getLblSumTotalFacturacion().setValue(Ext.util.Format.number(grid.getStore().sum('total'), '0,000.00'));

            grid.getView().refresh();
        }
    },

    onBtnFactRegistrarClick: function(button, e, eOpts) {
        var frmFacturacion = this.getFrmFacturacion();
        var gpFacturacion = this.getGpFacturacion();

        var facturacion = frmFacturacion.getValues();

        var arrDtFacturacion = [];

        var stMKFacturacion = Ext.getStore('stMKFacturacion');

        stMKFacturacion.each(function(record,id){

            arrDtFacturacion.push({
                nro_guia	: 	record.data.guia,
                f_recol		:  	record.data.recol,
                remitente	: 	record.data.remitente,
                c_remitente :   record.data.c_remitente,
                cliente		:	record.data.cnee,
                estado		: 	record.data.estado,
                base_up		: 	record.data.base_up_to_kg,
                add_per		:	record.data.add_per_kg,
                charge		: 	record.data.charge,
                total		: 	record.data.total,
                invoice		: 	record.data.invoice
            });

        });

        facturacion.total = Number.parseFloat(stMKFacturacion.sum('total'));

        facturacion.lsDtfacturacion = arrDtFacturacion;

        frmFacturacion.mask('Procesando');
        gpFacturacion.mask('Procesando');

        var info =  this.info;

        Ext.Ajax.request({
            url: 'http://localhost:8484/Aldem/service/facturacion/registrar',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            params : Ext.JSON.encode(facturacion),
            success: function(response, options, eOpts) {

                info('Información Registrada Correctamente!');

                Ext.getStore('stFacturacion').load();

                frmFacturacion.unmask();
                gpFacturacion.unmask();

            },
            failure: function(response, options, eOpts) {
                console.log(response);
            }
        });
    },

    onBtnFormatoFacturacionClick: function(button, e, eOpts) {

        location.href = "http://localhost:8484/Aldem/resources/formatos/fmt_facturacion_xls.xls";

    },

    onBtnVaciarDatosClick: function(button, e, eOpts) {
        this.getUpload_excel().reset();
        Ext.getStore('stMKFacturacion').loadData([]);
    },

    onGpConsultasFacturacionRowDblClick: function(tableview, record, tr, rowIndex, e, eOpts) {
        var arrData = [];

        var info = this.info;

        this.getTxtCliente().setValue(record.data.cliente);
        this.getTxtContents().setValue(record.data.contents);
        this.getTxtPais().setValue(record.data.pais);
        this.getTxtProtocol().setValue(record.data.protocol);
        this.getTxtLaboratory().setValue(record.data.laboratory);

        this.getLblSumTotalFacturacion().setValue(Ext.util.Format.number(record.data.total, '0,000.00'));

        Ext.Ajax.request({
            url: 'http://localhost:8484/Aldem/service/facturacion/detalle',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params : {
                id: record.data.id_facturacion
            },
            success: function(response, options, eOpts) {

                var json = Ext.JSON.decode(response.responseText);

                var dt = json.data;

                for(var k in dt) {
                    arrData.push({
                        guia			: dt[k].nro_guia,
                        estado			: dt[k].estado,
                        recol			: dt[k].f_recol,
                        cnee			: dt[k].cliente,
                        pais			: dt[k].nro_guia,
                        remitente		: dt[k].remitente,
                        c_remitente		: dt[k].c_remitente,
                        base_up_to_kg	: dt[k].base_up,
                        add_per_kg		: dt[k].add_per,
                        charge			: dt[k].charge,
                        total			: dt[k].total,
                        invoice			: dt[k].invoice
                    });
                }

                var stMKFacturacion = Ext.getStore('stMKFacturacion');

                stMKFacturacion.loadData(arrData);

                info('Detalle de la Factura <b>'+ record.data.invoice +'</b>  Ha sido Cargada!!');

            },
            failure: function(response, options, eOpts) {
                console.log(response);
            }

        });
    },

    onVGFacturacionRefresh: function(dataview, eOpts) {
        this.markRow();
    },

    onExp_upload_excelChange: function(filefield, value, eOpts) {
        Ext.override(Ext.scroll.Scroller, {
            scrollIntoView: function(el, hscroll, animate, highlight) {
                var me = this,
                    position = me.getPosition(),
                    newPosition;
                if (el) {
                    newPosition = me.getScrollIntoViewXY(el, hscroll);
                    if (newPosition.y !== position.y || newPosition.x !== position.x) {
                        if (highlight) {
                            me.on({
                                scrollend: 'doHighlight',
                                scope: me,
                                single: true,
                                args: [
                                    el,
                                    highlight
                                ]
                            });
                        }
                        // Disabled this, but not sure what effect this is going to have.
                        // This prevents the grid from scrolling the cell you are editing to the far right of the screen
                        // me.doScrollTo(newPosition.x, newPosition.y, animate); me.doScrollTo(newPosition.x, newPosition.y, animate);
                    }
                    else if (highlight) {
                        me.doHighlight(el, highlight);
                    }
                }
            }
        });

        var stExpFacturacion = Ext.getStore('stExpFacturacion');

        var countHawb = this.countHawb;

        var reader = new FileReader();
        reader.readAsArrayBuffer(filefield.fileInputEl.dom.files[0]);

        reader.onload = function(e) {



            var data = new Uint8Array(reader.result);
            var wb = XLSX.read(data,{type:'array'});

            var ws = wb.Sheets[wb.SheetNames[0]];

            var json_data = XLSX.utils.sheet_to_json(ws);

            var price_ambiente_LIMA = 7.93;
            var price_ambiente_PROV = 33.32;

            var price_congelado_LIMA = 20.83;
            var price_congelado_PROV = 58.31;

            var price_refrigerado = 0.00;

            for (var index in json_data) {

                json_data[index].hawb = json_data[index].guia;
                delete json_data[index].guia;

                json_data[index].mawb = json_data[index].mguia;
                delete json_data[index].mguia;

                json_data[index].pick_up_date = json_data[index].recol;
                delete json_data[index].recol;

                json_data[index].laboratory = json_data[index].cnee;
                delete json_data[index].cnee;

                json_data[index].airport_code_rem = 'LIM';

                json_data[index].name_remitter = json_data[index].remitente;
                delete json_data[index].remitente;

                json_data[index].city_remitter = json_data[index].c_remitente;
                delete json_data[index].c_remitente;

                json_data[index].state_remitter = json_data[index].city_remitter;

                json_data[index].country_remitter = json_data[index].pais;
                delete json_data[index].pais;

                json_data[index].country_customer = 'EEUU';

                json_data[index].qty_of_volumens = 1;

                json_data[index].gross = 1;

                json_data[index].gbase_up_to_kg = price_ambiente_LIMA;

                json_data[index].gadd_per_kg = 0.00;

                json_data[index].gfin_semana = 0.00;

                var city = Ext.String.trim(json_data[index].city_remitter).toUpperCase();
                var gross = json_data[index].gross;

                if(gross === 1 && city === 'LIMA'){
                    json_data[index].gbase_up_to_kg = (price_ambiente_LIMA);

                }else if(gross === 1 && city !== 'LIMA'){
                    json_data[index].gbase_up_to_kg = (price_ambiente_PROV);
                }

                json_data[index].gcharge = (json_data[index].gbase_up_to_kg + json_data[index].gadd_per_kg + json_data[index].gfin_semana);


                json_data[index].billing = 1;

                json_data[index].type = 'Embalaje Consolidación';

                json_data[index].type_qty = 1;

                json_data[index].type_charge = 0.00;

                json_data[index].freight_mawb = 0.00;

                json_data[index].handling = 0.00;

                json_data[index].gastos_ope = 0.00;

            }

            var uniqueNames = [];

            for(var i = 0; i< json_data.length; i++){
                if(uniqueNames.indexOf(json_data[i].mawb) === -1){
                    uniqueNames.push(json_data[i].mawb);
                }
            }

            var countMawb = [];

            for(var j = 0; j< uniqueNames.length; j++){
                countMawb.push({ mawb : uniqueNames[j] , count_hawbs : countHawb(json_data,uniqueNames[j])});
            }


            console.log(countMawb);


            var freight  = 145.20;
            var handling = 23.98;
            var gastos_ope = 17.60;




            Object.keys(countMawb).forEach(function(item) {

                var mawb = countMawb[item].mawb;
                var count_hawbs = countMawb[item].count_hawbs;

                Object.keys(json_data).forEach(function(item) {

                    if(json_data[item].mawb === mawb){
                        json_data[item].freight_mawb = (freight/count_hawbs);
                        json_data[item].handling = (handling/count_hawbs);
                        json_data[item].gastos_ope = (gastos_ope/count_hawbs);
                    }

                });

            });

            stExpFacturacion.getProxy().data = {'data' : json_data};
            stExpFacturacion.setGroupField('mawb');
            stExpFacturacion.load();


        };






    },

    onBtnExpVaciarDatosClick: function(button, e, eOpts) {
        this.getExp_upload_excel().reset();
        Ext.getStore('stExpFacturacion').loadData([]);
    },

    onExp_mawbSpecialkey: function(field, e, eOpts) {


        if (e.getKey() == e.ENTER) {
            var grid = this.getExpGpFacturacion();

            grid.getStore().each(function(record,id){
                record.data.mawb = field.value;
            });

            grid.getView().refresh();
        }
    },

    onExp_grossSpecialkey: function(field, e, eOpts) {
        if (e.getKey() == e.ENTER) {

            var gross = field.value;

            var price_congelado_LIMA = 20.83;
            var price_congelado_PROV = 58.31;

            var price_ambiente_LIMA = 7.93;
            var price_ambiente_PROV = 33.32;

            var grid = this.getExpGpFacturacion();

            var city = Ext.String.trim(grid.selModel.getCurrentPosition().record.data.city_remitter).toUpperCase();

            if(gross === 1 && city === 'LIMA'){
                grid.selModel.getCurrentPosition().record.data.gbase_up_to_kg = price_ambiente_LIMA;

            }else if(gross === 1 && city !== 'LIMA'){
                grid.selModel.getCurrentPosition().record.data.gbase_up_to_kg = price_ambiente_PROV;

            }else if(gross === 5 && city === 'LIMA'){
                grid.selModel.getCurrentPosition().record.data.gbase_up_to_kg = price_congelado_LIMA;

            }else if(gross === 5 && city !== 'LIMA'){
                grid.selModel.getCurrentPosition().record.data.gbase_up_to_kg = price_congelado_PROV;

            }

            var base_up = grid.selModel.getCurrentPosition().record.data.gbase_up_to_kg;
            var add_per = grid.selModel.getCurrentPosition().record.data.gadd_per_kg;
            var fin_sem = grid.selModel.getCurrentPosition().record.data.gfin_semana;

            grid.selModel.getCurrentPosition().record.data.gcharge = (base_up + add_per + fin_sem);

            var row = grid.selModel.getCurrentPosition().rowIdx;

            record = grid.getStore().getAt(row);
            record.set('gross', field.value);
            record.set('type', Ext.emptyString);
            record.set('type_qty', 0);
            record.set('type_charge', 0);
            record.commit();

            grid.ensureVisible(row,{select:true, highlight:true});

        }
    },

    onExp_gadd_per_kgSpecialkey: function(field, e, eOpts) {
        if (e.getKey() == e.ENTER) {

            var grid = this.getExpGpFacturacion();

            var base_up = grid.selModel.getCurrentPosition().record.data.gbase_up_to_kg;
            var add_per = grid.selModel.getCurrentPosition().record.data.gadd_per_kg;
            var fin_sem = grid.selModel.getCurrentPosition().record.data.gfin_semana;

            grid.selModel.getCurrentPosition().record.data.gcharge = (base_up + add_per + fin_sem);

            grid.getStore().reload();
        }
    },

    onExp_gfin_semSpecialkey: function(field, e, eOpts) {
         if (e.getKey() == e.ENTER) {

             var grid = this.getExpGpFacturacion();

             var base_up = grid.selModel.getCurrentPosition().record.data.gbase_up_to_kg;
             var add_per = grid.selModel.getCurrentPosition().record.data.gadd_per_kg;
             var fin_sem = grid.selModel.getCurrentPosition().record.data.gfin_semana;

             grid.selModel.getCurrentPosition().record.data.gcharge = (base_up + add_per + fin_sem);

             grid.getStore().reload();
         }
    },

    onExp_billingSpecialkey: function(field, e, eOpts) {
        if (e.getKey() == e.ENTER) {

            var billing = field.value;

            var price_congelado_LIMA = 4.24;
            var price_congelado_PROV = 6.67;

            var grid = this.getExpGpFacturacion();

            var city = Ext.String.trim(grid.selModel.getCurrentPosition().record.data.city_remitter).toUpperCase();

            if(billing === 5 && city === 'LIMA'){
                grid.selModel.getCurrentPosition().record.data.bbase_up_to_kg = (price_congelado_LIMA * 5 );
                grid.selModel.getCurrentPosition().record.data.badd_per_kg = 0.00;

            }else if(billing === 1 && city === 'LIMA' ){
                grid.selModel.getCurrentPosition().record.data.bbase_up_to_kg = 0.00;
                grid.selModel.getCurrentPosition().record.data.badd_per_kg = 0.00;

            }else if(billing === 1 && city !== 'LIMA' ){
                grid.selModel.getCurrentPosition().record.data.bbase_up_to_kg = 0.00;
                grid.selModel.getCurrentPosition().record.data.badd_per_kg = 0.00;

            }else if(billing === 12 && city !== 'LIMA' ){
                grid.selModel.getCurrentPosition().record.data.bbase_up_to_kg = (price_congelado_PROV * 5 );
                grid.selModel.getCurrentPosition().record.data.badd_per_kg    = (price_congelado_PROV * 7 );

            }else{
                grid.selModel.getCurrentPosition().record.data.bbase_up_to_kg = 0.00;
                grid.selModel.getCurrentPosition().record.data.badd_per_kg = 0.00;

            }

            var base_up = grid.selModel.getCurrentPosition().record.data.bbase_up_to_kg;
            var add_per = grid.selModel.getCurrentPosition().record.data.badd_per_kg;

            grid.selModel.getCurrentPosition().record.data.bcharge = (base_up + add_per);

            var row = grid.selModel.getCurrentPosition().rowIdx;

            record = grid.getStore().getAt(row);
            record.set('gross', field.value);
            record.commit();

            grid.ensureVisible(row,{select:true, highlight:true});
        }
    },

    info: function(msg) {
        var info = Ext.toast({
            html: msg,
            align: 'tr',
            baseCls : 'x-toast-info',
            hideDuration: 200,
            slideInDuration: 250,
            autoCloseDelay: 5000
        });

        Ext.Function.defer(info.hide, 5000, info);
    },

    markRow: function() {

        var grid = this.getGpFacturacion();
        var i = 0;

        grid.getStore().each(function(record){
            if(Ext.String.trim(record.data.c_remitente).toUpperCase() != 'LIMA'){
                grid.getView().addRowCls(i, 'background-color-row');
            }
            i++;
        });
    },

    countHawb: function(jsonObject, mawb) {
        return jsonObject.filter(function (entry) {return entry.mawb === mawb && entry.gross !== 5 ;}).length;
    }

});

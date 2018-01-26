onUpload_excelChange: function(filefield, value, eOpts) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(filefield.fileInputEl.dom.files[0]);


        reader.onload = function(e) {
            var data = new Uint8Array(reader.result);
            var wb = XLSX.read(data,{type:'array'});


            var FirstSheetNames = wb.SheetNames[0];

            var ws = wb.Sheets[FirstSheetNames];

            var json_data = XLSX.utils.sheet_to_json(ws);

            json_data  = {'data':{json_data}};


            var stMKFacturacion = Ext.getStore('stMKFacturacion');

            stMKFacturacion.loadData(json_data);
            stMKFacturacion.load();


        };


    }

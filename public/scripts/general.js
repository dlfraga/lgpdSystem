$('#fontedodado').selectize({
    valueField: 'nome',
    labelField: 'nome',
    searchField: 'nome',    
    create: function (input, callback) {
        $.ajax({
            url: 'fonteDadosFluxo',
            data: { 'nome': input },
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                return callback(response);
            }
        });
    },
    render: {
        option: function (item, escape) {
            console.log(item);
            return '<div>' + escape(item.nome) + '</div>';
        }
    },
    load: function (query, callback) {
        if (!query.length) return callback();
        $.ajax({
            url: '/fonteDadosFluxo/' + query,
            type: 'GET',
            dataType: 'json',            
            error: function () {
                callback();
            },
            success: function (res) {                
                callback(res);
            }
        });
    }
});
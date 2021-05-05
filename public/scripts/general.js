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
            return '<div class="text">' + escape(item.nome) + '</div>';
        },
        // option_create: function(data, escape){
        //     return '<div class="text"> Adicionar a fonte '+ escape(data.input) + '</div>';
        // },
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
$(document).ready(function () {
    console.log("ready!");

    $("#fontedodado").select2({
        tags: false,
        multiple: false,
        //tokenSeparators: [',', ' '],
        minimumInputLength: 2,
        minimumResultsForSearch: 10,
        ajax: {
            url: '/fonteDadosFluxo',
            dataType: "json",
            type: "GET",
            data: function (params) {

                var queryParameters = {
                    nome: params.term
                }
                return queryParameters;
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            nome: item.tag_value,
                            id: item.tag_id
                        }
                    })
                };
            }
        }
    });
});
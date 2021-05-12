'use strict'
const FonteDadosFluxo = use('App/Models/FonteDadosFluxo.js')


class FontedadosfluxoController {
    //NUNCA esquecer dos {} na entrada do método ou o framework os deixa como json e se perdem os metodos
    async index({ request }) {        
        const requestGet = request.get()
        const requestParams = request.params;


        //caso exista nada na url, retornar todos as fontes
        if (requestParams == null && requestGet.nome == null) {
            return await FonteDadosFluxo.all();
            //caso a url especifique uma id, retornar o record
        } else if (requestParams.id != null) {
            return await FonteDadosFluxo.find(requestParams.id);
            //caso a url tenha um nome
        } else if (requestGet.nome != null) {
            const nomeaProcurar = requestGet.nome;
            return await FonteDadosFluxo.query().where('nome', 'rlike', nomeaProcurar).fetch();
            //default, retorna tudo
        } else {
            return await FonteDadosFluxo.all();
        }
    }

    async store({ request, response }) {
        const fontedadosfluxo = new FonteDadosFluxo();
        fontedadosfluxo.nome = request.input('nome')
        const fonteExists = await FonteDadosFluxo.findBy('nome', fontedadosfluxo.nome);
        if (fonteExists) {
            return response.status(400).send({ message: { error: 'Fonte ja cadastrada' } })
        } else {
            if (await fontedadosfluxo.save()) {
                console.log('fontedados salva com sucesso');
                return FonteDadosFluxo.findBy('nome', fontedadosfluxo.nome);
            }
        }
    }

    async search({ request, response }) {
        console.log(request);
    }

}

module.exports = FontedadosfluxoController

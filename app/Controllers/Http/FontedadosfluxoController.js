'use strict'
const FonteDadosFluxo = use('App/Models/FonteDadosFluxo.js')
const Database = use('Database')

class FontedadosfluxoController {
    async index(request) {
        const requestParams = request.params;
        if (requestParams == null) {
            console.log('all fontes dados 1');
            return await FonteDadosFluxo.all();
        } else if (requestParams.nome != null) {
            const nomeaProcurar = request.params.nome;
            return await FonteDadosFluxo.query().where('nome', 'rlike', nomeaProcurar).fetch();
        } else {
            console.log('all fontes dados 2');
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

'use strict'
const Fluxo = use('App/models/Fluxo')

class FluxoController {
    async index ({request, response}) {
        return await Fluxo.all();
    }
}

module.exports = FluxoController

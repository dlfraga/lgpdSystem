'use strict'

class SolicitacaoController {

    async index({ view }) {                
        return view.render('solicitacoes', {  })
    }

}

module.exports = SolicitacaoController

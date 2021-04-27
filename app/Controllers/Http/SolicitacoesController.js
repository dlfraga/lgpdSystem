'use strict'

class SolicitacaoController {

    async index({ view }) {                
        return view.render('solicitacao', {  })
    }

}

module.exports = SolicitacaoController

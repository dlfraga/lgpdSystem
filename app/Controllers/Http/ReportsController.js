'use strict'
const Fluxo = use('App/Models/Fluxo')
const FonteDadosFluxo = use('App/Models/FonteDadosFluxo')


class ReportController {
    async index({ view }) {
        //const fluxos = await Fluxo.query().with('user').with('fonteDadosFluxo').orderBy('fonteDadosFluxo', 'asc').fetch();
        const fonteDadosFluxos = await FonteDadosFluxo.query().with('fluxos').fetch();    
        return view.render('relatorios', { fonteDadosFluxos: fonteDadosFluxos.toJSON() })
    }
}

module.exports = ReportController

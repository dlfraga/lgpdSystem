'use strict'
const Fluxo = use('App/Models/Fluxo')
const Database = use('Database')

class DashboardController {
    async index({ view }) {
        //conta quantos fluxos existem
        const fluxosCount = await Database.from('fluxos').count();
        const fluxosTotal = fluxosCount[0]['count(*)'];

        //verifica se os campos principais estão como null
        //@if(fluxo.razao == null || fluxo.justificativa == null || fluxo.comoearmazenado == null ||        prazodeeliminacao == null || protecao == null)
        const fluxosComJustificativaCount = await Database.from('fluxos')
            .whereNotNull('justificativa')
            .orWhereNotNull('razao')
            .orWhereNotNull('comoearmazenado')
            .orWhereNotNull('prazodeeliminacao')
            .orWhereNotNull('protecao')
            .count();
        const fluxosConcluidos = fluxosComJustificativaCount[0]['count(*)']

        return view.render('dashboard', { fluxosCount: fluxosTotal, fluxosConcluidos: fluxosConcluidos })
    }
}

module.exports = DashboardController

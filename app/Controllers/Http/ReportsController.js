'use strict'
const Fluxo = use('App/Models/Fluxo')
const FonteDadosFluxo = use('App/Models/FonteDadosFluxo')
const Setor = use('App/Models/Setor')
const User = use('App/Models/User')

class ReportController {
    async index({ view, params, request }) {
        const tipoDeRelatorio = request.input('tipo')

        switch (tipoDeRelatorio) {
            case "fluxosPorFonte":
                //carregamento de NESTED RELATIONS https://legacy.adonisjs.com/docs/4.1/relationships dot notation aplicada na ultima relação
                const fonteDadosFluxos = await FonteDadosFluxo.query().with('fluxos').with('fluxos.setor').fetch();                
                return view.render('report-by-fonte', { fonteDadosFluxos: fonteDadosFluxos.toJSON() })
            case "fluxosPorSetor":
                const setor = await Setor.query.with('fluxos').fetch();
                return view.render('report-by-setor', { setor: setor.toJSON() })
            case "fluxosPorUsuario":

                break;
            case "todosOsFluxos":
                var fluxosComFontes = await FonteDadosFluxo.query().with('fluxos').with('fluxos.setor').with('fluxos.user').fetch();                
                return view.render('report-all-fluxos', { fonteDadosFluxos: fluxosComFontes.toJSON() })                
                break;
            default:
                const fontesTotal = await FonteDadosFluxo.getCount();
                const setoresTotal = await Setor.getCount();
                const usersTotal = await User.getCount();
                const fluxosTotal = await Fluxo.getCount();
                return view.render('relatorios', { fontesTotal: fontesTotal, setoresTotal: setoresTotal, usersTotal: usersTotal, fluxosTotal: fluxosTotal })
                break;
        }

        //const fluxos = await Fluxo.query().with('user').with('fonteDadosFluxo').orderBy('fonteDadosFluxo', 'asc').fetch();

    }
}

module.exports = ReportController

'use strict'

const Fluxo = use('App/Models/Fluxo')
const User = use('App/Models/User')

class FluxoController {
    async index({ view, auth }) {
        const currentUser = await User.find(auth.user.id);               
        const fluxos = await currentUser.fluxos().fetch();
        return view.render('meusFluxos', {fluxos: fluxos.toJSON()})        
    }

    async store({ request, response, session, auth }) {
        const fluxo = new Fluxo();
        fluxo.user_id = auth.user.id;
        console.log(auth.user.id);
        fluxo.nomedoprocesso = request.input('nomedoprocesso');
        fluxo.fontedodado = request.input('fontedodado');
        fluxo.informacoescoletadas = request.input('informacoescoletadas');
        fluxo.razao = request.input('razao');
        fluxo.comoearmazenado = request.input('comoearmazenado');
        fluxo.protecao = request.input('protecao');
        fluxo.seguranca = request.input('seguranca');
        fluxo.prazodeeliminacao = request.input('prazodeeliminacao');
        fluxo.justificativa = request.input('justificativa');
        if (request.input('menoresdeidade') == 'true') {
            fluxo.menoresdeidade = 1;
        } else {
            fluxo.menoresdeidade = 0;
        }

        if (request.input('dadossensiveis') == 'true') {
            fluxo.dadossensiveis = 1;
        } else {
            fluxo.dadossensiveis = 0;
        }

        await fluxo.save()
        session.flash({ error: 'Fluxo salvo com sucesso!' })
        return response.redirect('/meusFluxos')
    }
}

module.exports = FluxoController

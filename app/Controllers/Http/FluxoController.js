'use strict'

const Fluxo = use('App/Models/Fluxo')
const User = use('App/Models/User')
const FonteDadosFluxo = use('App/Models/FonteDadosFluxo.js')

class FluxoController {
    async index({ request, view }) {
        const requestParams = request.params;
        //retorna os fluxos na pagina 1 caso o parametro pagina esteja null. 
        //sao duas rotas diferentes, uma vem por meusFluxos e outra por fluxos
        //a que pode vir com o parametro pag é meus fluxos
        if (requestParams.pag != null) {
            const fluxos = await Fluxo.query().with('user').paginate(requestParams.pag, 12);
            console.log(fluxos.toJSON())
            return view.render('meusfluxos', { fluxos: fluxos.toJSON() })
            //a rota /fluxos pode enviar o parametro fluxo, considerado aqui. retorna um unico fluxo            
        } else if (requestParams.fluxo != null) {
            const fluxoAEditar = request.params.fluxo;
            const fluxoAtual = await Fluxo.find(fluxoAEditar);
            return view.render('editarfluxo', { fluxoaeditar: fluxoAtual.toJSON() })
            //caso padrao, envia pag 1 com 15 valores

        } else {
            const fluxos = await Fluxo.query().with('user').paginate(1, 12);
            return view.render('meusfluxos', { fluxos: fluxos.toJSON() })
        }
    }

    async store({ request, response, session, auth }) {
        const requestParams = request.params;
        if (requestParams.fluxo != null) {
            const fluxo = await await Fluxo.find(request.params.fluxo);
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
            session.flash({ success: 'Fluxo salvo com sucesso!' })
            return response.redirect('/meusFluxos')

        } else {
            console.log('fluxonovo')
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
            session.flash({ success: 'Fluxo salvo com sucesso!' })
            return response.redirect('/meusFluxos')
        }

    }

    async remove({ params, response, session}) {
        if (params.fluxoid != null) {
            const fluxoASerDeletado = await Fluxo.find(params.fluxoid);            
            if (await fluxoASerDeletado.delete()) {
                session.flash({ notification: 'Fluxo eliminado com sucesso!' })                
                return response.redirect('/meusFluxos')
            } else {
                session.flash({ error: 'Falha ao eliminar!' })
                return response.redirect('/meusFluxos')
            }

        }

    }
}



module.exports = FluxoController

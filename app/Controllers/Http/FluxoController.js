'use strict'

const Fluxo = use('App/Models/Fluxo')
const User = use('App/Models/User')
const FonteDadosFluxo = use('App/Models/FonteDadosFluxo.js')
const Setor = use('App/Models/Setor')

class FluxoController {
    async index({ request, view }) {
        const requestParams = request.params;
        //retorna os fluxos na pagina 1 caso o parametro pagina esteja null. 
        //sao duas rotas diferentes, uma vem por meusFluxos e outra por fluxos
        //a que pode vir com o parametro pag é meus fluxos
        if (requestParams.pag != null) {
            const fluxos = await Fluxo.query().with('user').with('fonteDadosFluxo').with('setor').paginate(requestParams.pag, 12);            
            return view.render('meusfluxos', { fluxos: fluxos.toJSON() })
            //a rota /fluxos pode enviar o parametro fluxo, considerado aqui. retorna um unico fluxo            
        } else if (requestParams.fluxo != null) {
            const fluxoAEditar = request.params.fluxo;
            //const fluxoAtual = await Fluxo.query().where('id'  fluxoAEditar).with('user').with('fonteDadosFluxo').with('setor').fetch();
            const fluxoAtual = await Fluxo.find(fluxoAEditar);
            //carregar os relacionamentos junto com o objeto
            await fluxoAtual.loadMany(['user', 'fonteDadosFluxo', 'setor']);
            const fontesDeDados = await FonteDadosFluxo.all();
            const setores = await Setor.all();            
            return view.render('editarfluxo', { fluxoaeditar: fluxoAtual.toJSON(), fontesDeDados: fontesDeDados.toJSON(), setores: setores.toJSON() })
            //caso padrao, envia pag 1 com 15 valores

        } else {            
            const fluxos = await Fluxo.query().with('user').with('fonteDadosFluxo').with('setor').paginate(1, 12);            
            return view.render('meusfluxos', { fluxos: fluxos.toJSON() })
        }
    }

    async new({view}){
        const fontesDeDados = await FonteDadosFluxo.all();
        const setores = await Setor.all();
            return view.render('novofluxo', { fontesDeDados: fontesDeDados.toJSON(), setores: setores.toJSON() })
    }

    async store({ auth, session, request, response, params }) {
        const requestParams = request.params;
        var fluxo = Fluxo;

        if (requestParams.fluxo != null) {
            fluxo = await await Fluxo.find(request.params.fluxo);
            
        } else {
            fluxo = new Fluxo();
            fluxo.user_id = auth.user.id;
        }
        var fontedodado = FonteDadosFluxo;
        try {
            fontedodado = await FonteDadosFluxo.findOrCreate({ nome: request.input('fontedodado') });
        } catch (error) {
            session.flash({ error: 'Erro no salvamento da fonte de dados do fluxo!' })
            return response.redirect('/meusFluxos')            
        }

        var setor = Setor;
        try {
            setor = await Setor.findOrCreate({ nomedosetor: request.input('setor') });            
        } catch (error) {
            session.flash({ error: 'Erro no salvamento do setor!' })
            return response.redirect('/meusFluxos')            
        }
        fluxo.setor_id = setor.id;
        fluxo.fonte_dados_fluxo_id = fontedodado.id;
        fluxo.nomedoprocesso = request.input('nomedoprocesso');
        fluxo.informacoescoletadas = request.input('informacoescoletadas');
        fluxo.razao = request.input('razao');
        fluxo.comoearmazenado = request.input('comoearmazenado');
        fluxo.protecao = request.input('protecao');
        fluxo.seguranca = request.input('seguranca');
        fluxo.prazodeeliminacao = request.input('prazodeeliminacao');
        fluxo.justificativa = request.input('justificativa');
        fluxo.responsavel = request.input('responsavel');
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

        try {
            await fluxo.save()
            session.flash({ notification: 'Fluxo salvo com sucesso!' })
            return response.redirect('/meusFluxos')
        } catch (error) {
            session.flash({ error: 'Erro no salvamento do fluxo!' })            
            return response.redirect('/meusFluxos')
        }




    }

    async remove({ params, response, session }) {
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

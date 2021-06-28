'use strict'

const Fluxo = use('App/Models/Fluxo');
const SpreadSheet = use('SpreadSheet');

class ExcelExportController {

    async download({request, response, params}){
        //recebemos dois itens do browser:
        //via params.format o formato de saída do arquivo
        //via request.get o nome do relatorio
        //ambos precisam ser tratados em momentos separados
        //var formato = request.get('relatorio');
        var relatorio = request.input('relatorio');
        var paramOutputFormat = params.formato;
        
        var outputFormat = '';

        if(paramOutputFormat == 'csv'){
            outputFormat = 'csv';
        } else if (params.formato == 'xlsx'){
            outputFormat = 'xlsx'
        } else {
            session.flash({ error: 'Erro no formato de exportação!' })
            return response.redirect('/Relatorios')            
        }

        switch (relatorio) {
            case 'todos':
                await this.downloadReportTodos(outputFormat, response);
                break;
        
            default:
                session.flash({ error: 'Relatório não encontrado!' })
                return response.redirect('/Relatorios')                            
        }

    }

    async downloadReportTodos(outputFormat, response){
        const spreadsheet = new SpreadSheet(response, outputFormat)
        const fluxos = await Fluxo.query().with('setor').with('user').with('fonteDadosFluxo').fetch();
        const data = [];
        data.push([
            'Nome do processo',
            'Setor',
            'Responsável',
            'Fonte do dado',
            'Informacoes coletadas',
            'Razao',
            'Como é armazenado?',
            'Proteção aplicada',
            'Segurança',
            'Prazo de eliminação',
            'Justificativa',
            'Menores de idade?',
            'Dados sensíveis?'
        ])

        fluxos.toJSON().forEach(fluxo => {
            var menorDeIdade = '';
            var dadosSensiveis = '';

            if (fluxo.menoresdeidade == 0) {
                menorDeIdade = 'NÃO';      
            } else {
                menorDeIdade = 'SIM';
            }

            if (fluxo.dadossensiveis == 0) {
                dadosSensiveis = 'NÃO'                
            } else {
                dadosSensiveis = 'SIM'
            }
            var fluxoInfosAlterada = fluxo.informacoescoletadas
            fluxoInfosAlterada = fluxoInfosAlterada.replace(/(?:\r\n|\r|\n)/g, ' '); 
            data.push([
                fluxo.nomedoprocesso,
                fluxo.setor.nomedosetor,
                fluxo.responsavel,
                fluxo.fonteDadosFluxo.nome,
                fluxoInfosAlterada,
                fluxo.razao,
                fluxo.comoearmazenado,
                fluxo.protecao,
                fluxo.seguranca,
                fluxo.prazodeeliminacao,
                fluxo.justificativa,
                menorDeIdade,
                dadosSensiveis
            ])

        })
        spreadsheet.addSheet('Fluxos', data);
        spreadsheet.download('Fluxos-Exportados')
    }

}



module.exports = ExcelExportController

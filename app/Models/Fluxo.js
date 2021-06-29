'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Fluxo extends Model {
    user() {
        return this.belongsTo('App/Models/User')
    }

    fonteDadosFluxo() {
        return this.belongsTo('App/Models/FonteDadosFluxo')
    }

    setor() {
        return this.belongsTo('App/Models/Setor')
    }
    //altera as datas para o locale br
    static castDates(field, value) {
        if (field == 'created_at') {
            value.locale('br');
            return `${value.format('l')}`
        }
        return super.formatDates(field, value)
    }
    static get computed() {
        return ['infocoletadatruncada']
    }
    //o nome da funcao pode ter a primeira palavra depois do get capitalizada, o restante precisa estar em minusculo
    //a função abaixo retorna um objeto json truncado para o campo 'informacoes coletadas' com outro nome, a fim de ser utilizado na geração dos gráficos
    //adicionalmente ele troca os carriages return (\r\n) por line breaks (<br>) para que os campos remanescentes apareçam no gráfico corretamente
    getInfocoletadatruncada({informacoescoletadas}){
        if(informacoescoletadas == null){
            return;
        }
        var informacaoColetadaModificada = informacoescoletadas.trim();
        if(informacaoColetadaModificada.length > 25){
            var infotruncada = informacaoColetadaModificada.slice(0, 25);
            infotruncada = infotruncada.replace(/(?:\r\n|\r|\n)/g, '<br>');
            infotruncada += "..."
            return infotruncada.replace(/^(.)|\s(.)/g, ($1) => {
                return $1.toUpperCase()
              })            
        } else {
            informacaoColetadaModificada = informacaoColetadaModificada.replace(/(?:\r\n|\r|\n)/g, '<br>');
            return informacaoColetadaModificada.replace(/^(.)|\s(.)/g, ($1) => {
                return $1.toUpperCase()
              })
        }        
    }
}

module.exports = Fluxo

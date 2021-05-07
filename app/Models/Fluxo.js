'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Fluxo extends Model {
    user() {
        return this.belongsTo('App/Models/User')
    }

    fonteDadosFluxo() {
        return this.hasOne('App/Models/FonteDadosFluxo')
    }

    static castDates(field, value) {
        if (field == 'created_at') {
            value.locale('br');
            return `${value.format('l')}`
        }
        return super.formatDates(field, value)
    }
}

module.exports = Fluxo

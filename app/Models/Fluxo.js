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
}

module.exports = Fluxo

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FonteDadosFluxo extends Model {
    fluxos() {
        return this.hasMany('App/Models/Fluxo')
    }
}

module.exports = FonteDadosFluxo

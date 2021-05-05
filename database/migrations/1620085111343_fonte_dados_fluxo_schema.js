'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FonteDadosFluxoSchema extends Schema {
  up () {
    this.create('fonte_dados_fluxos', (table) => {
      table.increments()
      table.string('nome')      
      table.timestamps()
    })
  }

  down () {
    this.drop('fonte_dados_fluxos')
  }
}

module.exports = FonteDadosFluxoSchema

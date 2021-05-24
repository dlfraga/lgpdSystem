'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FluxoSchema extends Schema {
  up () {
    this.table('fluxos', (table) => {
      table.integer('setor_id').unsigned();
    })
  }

  down () {
    this.table('fluxos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = FluxoSchema

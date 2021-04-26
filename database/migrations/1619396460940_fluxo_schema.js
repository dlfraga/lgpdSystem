'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FluxoSchema extends Schema {
  up () {
    this.alter('fluxos', (table) => {      
      table.bool('menoresdeidade').alter();
      table.bool('dadossensiveis').alter();
    })
  }

  down () {
    this.table('fluxos', (table) => {
      
    })
  }
}

module.exports = FluxoSchema

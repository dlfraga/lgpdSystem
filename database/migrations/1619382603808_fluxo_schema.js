'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FluxoSchema extends Schema {
  up () {
    this.create('fluxos', (table) => {
      table.increments()
      table.string('nomedoprocesso', 254)
      table.string('fontedodado', 254)
      table.string('informacoescoletadas')
      table.string('razao')
      table.string('comoearmazenado')
      table.string('protecao')
      table.string('seguranca')
      table.string('prazodeeliminacao')
      table.string('justificativa')
      table.boolean('menoresdeidade')
      table.boolean('dadossensiveis')
      table.timestamps()
    })
  }

  down () {
    this.drop('fluxos')
  }
}

module.exports = FluxoSchema

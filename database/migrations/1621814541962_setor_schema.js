'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SetorSchema extends Schema {
  up () {
    this.create('setors', (table) => {
      table.increments()
      table.string('nomedosetor')
      table.timestamps()
    })
  }

  down () {
    this.drop('setors')
  }
}

module.exports = SetorSchema

'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
   async handle (error, { response, session }) {
    if (error.name === 'InvalidSessionException') {
      session.flash({ error: 'Você não está logado ou sua sessão expirou. Realize login novamente' })
      await session.commit()
      response.redirect('/')
      return
    }

    if (error.name === 'E_ROUTE_NOT_FOUND') {
      session.flash({ error: 'Você não está logado ou sua sessão expirou. Realize login novamente' })
      await session.commit()
      //response.redirect('/')
      return
    }
    return super.handle(...arguments)
  }
  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler

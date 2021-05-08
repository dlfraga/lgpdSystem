'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
/**Renderizacoes */
/**Rota padrao para o index */
Route.on('/').render('index')
/**Rota para a view de esqueci a senha */
Route.on('/esqueciMinhaSenha').render('esqueciminhaSenha').middleware('guest');
Route.on('/createNewAdmin').render('createnewadmin');

/**mix*/
Route.get('/dashboard', 'DashboardController.index').middleware('auth');
Route.get('/logout', 'UserController.logout').middleware('auth');

/**Envios manuais */
Route.post('/login', 'UserController.login').middleware('guest');
Route.post('/store', 'UserController.store').middleware('auth');

/**Paginas de edicao de fluxo - recebem parametro de paginação para o caso 
 * de haverem mais fluxos do que uma pagina pode mostrar */
Route.get('/meusFluxos/:pag?', 'FluxoController.index').middleware('auth');
/**Resources completos=>  */

/** Paginas de edição de fluxo */
Route.on('/novoFluxo').render('novofluxo').middleware('auth');
Route.on('/editarFluxo').render('editarFluxo').middleware('auth');
Route.resource('fluxos/:fluxo?', 'FluxoController').middleware('auth');
/**gerencia usuarios */
Route.resource('usuarios/:id?', 'UserController').middleware('auth');
/**Pagina de administracao */
Route.resource('/administracao', 'UserController').middleware('auth');

/** Solicitacoes */
Route.resource('/solicitacoes', 'SolicitacoesController');
/**Endpoint de API para resolver dinamicamente os nomes de fontes de dados de fluxos */
Route.resource('/fonteDadosFluxo/:nome?', 'FontedadosfluxoController').middleware('auth');
/**Pagina / controller para permitir a alteração de dados pessoais */
Route.get('/meuPerfil', 'UserController.meuPerfil').middleware('auth');







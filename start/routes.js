'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


Route.group(() => {

  Route.post('user/register','UserController.store');
  Route.post('user/login','UserController.login');

  Route.post('user/product','ProductController.store');
  Route.get('user/product/list','ProductController.index')
  Route.put('user/product/update/:id','ProductController.update')
  Route.delete('user/product/delete/:id','ProductController.destroy')
  //kyc el hocico
 
 //f eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTU4NjAzMzU4OH0.bL5dY_tiiw9sVavhXdecndCTrMi8r7Y7vE3nn-Hpjm0
 
}).prefix('api/v1/');

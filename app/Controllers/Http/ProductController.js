'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
const Product=use("App/Models/Product");
const Database = use('Database');
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response,auth}) {
    const user =await auth.getUser(); 
    const product=await Database.table('users')
      .innerJoin('products','users.id','products.user_id')
      .where('users.id',user.id)
      .select('products.product','products.quantity','products.price','products.id')
      return response.json({product})
  }

  /**
   * Render a form to be used for creating a new product.
   * GET products/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response,auth}) {
    const user = await auth.getUser();
    const data=request.all();
    const product=new Product();
    product.product=data.product;
    product.quantity=data.quantity;
    product.price=data.price;
    product.user_id=user.id;
    await product.save();
    return response.json({product});

  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const id=params.id;
    const data=request.all()
    const product= await Product.find(id);
    product.merge({
      product:data.product,
      quantity:data.quantity,
      price:data.price,
    })
    await product.save();
    return response.json({product});
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const id=params.id
    const product= await Product.find(id);
    await product.delete();
    return response.json({product});
  }

}

module.exports = ProductController

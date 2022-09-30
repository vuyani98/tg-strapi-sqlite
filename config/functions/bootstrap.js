

'use strict';

const { createSecureServer } = require('http2');

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = async () => {


  //console.log(cloudinary.config());
  const CSVTOJSON = require('csvtojson');
  const fs = require ('fs');

  //add camera products
  CSVTOJSON().fromFile('./data/Surveillance.csv')
                .then( async (table) => {
                    //let surv = fs.readFileSync('./data/Surveillance.csv', 'utf-8');

                    table.forEach(async(product) => {
                      let name = product['Product Code'];
                      let catArray = [];
                      let cater_string = product['Catergories'];
                      let if_prod = await strapi.query('products');
                      let catergories = cater_string.split(',');
                      //console.log(catergories);

                      //if the product is not empty
                      if (name){
                        console.log(name)
                        let img = name.replace(/ /g,'_');
                        let image = img.replace(/\(|\)/g, '_');
                        let image_url = 'https://res.cloudinary.com/tgsec/image/upload/Surveillance/' + image + '.png'

                        let prod =  await create_product(product, name,image_url, if_prod)
                        .then(product=> {
                          return product})
                        .catch(err => {
                          //console.log(err);
                          return err;
                        });

                        //iterating through catergories, creating them and the products

                        if (prod){
                          for (let i=0; i<catergories.length; i++){

                            //console.log(`${catergories[i]}`)
                            let created_cat = await create_cat(catergories[i])
                            .then(async (cat) => {
                              console.log(` ${cat.name}`);
                              if (cat.name){
                                catArray.push(cat);
                                //console.log(`new cat array : ${catArray}`);
                                //if(i == (catergories.length-1)){
                                  //add_cat(if_prod, prod, catArray);
                                //}
                              }
                              return cat;
                            })
                            .catch(err => {
                              //console.log(err)
                              return err;
                            });

                            if (created_cat){
                              add_cat(if_prod, name, catArray);
                            }

                          }
                        }


                      }

                    })
                })

  //add alarm products
  /*CSVTOJSON().fromFile('./data/alarm.csv')
                .then( async (table) => {

                    table.forEach(async(product) => {
                      let name = product['Product Code'];
                      let catArray = [];
                      let cater_string = product['Catergories'];
                      let if_prod = await strapi.query('products');
                      let catergories = cater_string.split(',');
                      //console.log(catergories);

                      //if the product is not empty
                      if (name){
                        let img = name.replace(/ /g,'_');
                        let image = img.replace(/\(|\)/g, '_');
                        let image_url = 'https://res.cloudinary.com/tgsec/image/upload/Surveillance/' + image + '.png'

                        let prod =  await create_product(product, name,image_url, if_prod)
                        .then(product=> {
                          //console.log(product)
                          return product})
                        .catch(err => {
                          //console.log(err);
                          return err;
                        });

                        //iterating through catergories, creating them and the products

                        if (prod){
                          for (let i=0; i<catergories.length; i++){

                            //console.log(`${catergories[i]}`)
                            let created_cat = await create_cat(catergories[i])
                            .then(async (cat) => {
                              console.log(` ${cat.name}`);
                              if (cat.name){
                                catArray.push(cat);
                                //console.log(`new cat array : ${catArray}`);
                                //if(i == (catergories.length-1)){
                                  //add_cat(if_prod, prod, catArray);
                              }
                              return cat;
                            })
                            .catch(err => {
                              //console.log(err)
                              return err;
                            });

                            if (created_cat){
                              add_cat(if_prod, name, catArray);
                            }

                          }
                        }
                      }
                    })
                })*/

    //add access products
    /*CSVTOJSON().fromFile('./data/access.csv')
                .then( async (table) => {

                    table.forEach(async(product) => {
                      let name = product['Product Code'];
                      let catArray = [];
                      let cater_string = product['Catergories'];
                      let if_prod = await strapi.query('products');
                      let catergories = cater_string.split(',');
                      //console.log(catergories);

                      //if the product is not empty
                      if (name){
                        let img = name.replace(/ /g,'_');
                        let image = img.replace(/\(|\)/g, '_');
                        let image_url = 'https://res.cloudinary.com/tgsec/image/upload/Surveillance/' + image + '.png'

                        let prod =  await create_product(product, name,image_url, if_prod)
                        .then(product=> {
                          //console.log(product)
                          return product})
                        .catch(err => {
                          //console.log(err);
                          return err;
                        });

                        //iterating through catergories, creating them and the products

                        if (prod){
                          for (let i=0; i<catergories.length; i++){

                            //console.log(`${catergories[i]}`)
                            let created_cat = await create_cat(catergories[i])
                            .then(async (cat) => {
                              console.log(` ${cat.name}`);
                              if (cat.name){
                                catArray.push(cat);
                                //console.log(`new cat array : ${catArray}`);
                                //if(i == (catergories.length-1)){
                                  //add_cat(if_prod, prod, catArray);
                              }
                              return cat;
                            })
                            .catch(err => {
                              //console.log(err)
                              return err;
                            });

                            if (created_cat){
                              add_cat(if_prod, name, catArray);
                            }

                          }
                        }
                      }
                    })
                })*/

      //add intercomm products
      /*CSVTOJSON().fromFile('./data/Intercomm.csv')
                .then( async (table) => {

                    table.forEach(async(product) => {
                      let name = product['Product Code'];
                      let catArray = [];
                      let cater_string = product['Catergories'];
                      let if_prod = await strapi.query('products');
                      let catergories = cater_string.split(',');
                      //console.log(catergories);

                      //if the product is not empty
                      if (name){
                        let img = name.replace(/ /g,'_');
                        let image = img.replace(/\(|\)/g, '_');
                        let image_url = 'https://res.cloudinary.com/tgsec/image/upload/Surveillance/' + image + '.png'

                        let prod =  await create_product(product, name,image_url, if_prod)
                        .then(product=> {
                          //console.log(product)
                          return product})
                        .catch(err => {
                          //console.log(err);
                          return err;
                        });

                        //iterating through catergories, creating them and the products

                        if (prod){
                          for (let i=0; i<catergories.length; i++){

                            //console.log(`${catergories[i]}`)
                            let created_cat = await create_cat(catergories[i])
                            .then(async (cat) => {
                              console.log(` ${cat.name}`);
                              if (cat.name){
                                catArray.push(cat);
                                //console.log(`new cat array : ${catArray}`);
                                //if(i == (catergories.length-1)){
                                  //add_cat(if_prod, prod, catArray);
                              }
                              return cat;
                            })
                            .catch(err => {
                              //console.log(err)
                              return err;
                            });

                            if (created_cat){
                              add_cat(if_prod, name, catArray);
                            }

                          }
                        }
                      }
                    })
                })*/

      //add accessories
      /*CSVTOJSON().fromFile('./data/accessories.csv')
                .then( async (table) => {

                    table.forEach(async(product) => {
                      let name = product['Product Code'];
                      let catArray = [];
                      let cater_string = product['Catergories'];
                      let if_prod = await strapi.query('products');
                      let catergories = cater_string.split(',');
                      //console.log(catergories);

                      //if the product is not empty
                      if (name){
                        let img = name.replace(/ /g,'_');
                        let image = img.replace(/\(|\)/g, '_');
                        let image_url = 'https://res.cloudinary.com/tgsec/image/upload/Surveillance/' + image + '.png'

                        let prod =  await create_product(product, name,image_url, if_prod)
                        .then(product=> {
                          //console.log(product)
                          return product})
                        .catch(err => {
                          //console.log(err);
                          return err;
                        });

                        //iterating through catergories, creating them and the products

                        if (prod){
                          for (let i=0; i<catergories.length; i++){

                            //console.log(`${catergories[i]}`)
                            let created_cat = await create_cat(catergories[i])
                            .then(async (cat) => {
                              console.log(` ${cat.name}`);
                              if (cat.name){
                                catArray.push(cat);
                                //console.log(`new cat array : ${catArray}`);
                                //if(i == (catergories.length-1)){
                                  //add_cat(if_prod, prod, catArray);
                              }
                              return cat;
                            })
                            .catch(err => {
                              //console.log(err)
                              return err;
                            });

                            if (created_cat){
                              add_cat(if_prod, name, catArray);
                            }

                          }
                        }
                      }
                    })
                })*/
}

async function create_product(product, name, image_url, if_prod) {

  //console.log('step 5: product');

  let prod = null;
  let product_exists = false;

  return await if_prod.find()
  .then( async(result) => {
    for (let i=0; i<result.length; i++){
      if(name == result[i].product_code){
        product_exists = true;
        console.log(`product ${name} exists`);
        return result[i];
      }
    }

    if(!product_exists){
      //console.log('product does not exist')
      if (product['Product Code']){
        prod = await strapi.services.products.create({
              supplier_code : product['Supplier Code'] || 'TG',
              product_code : name,
              description : product.Description,
              retail_price: product['Retail Price'],
              trade_price: product['Trade Price'],
              image_url: image_url
        });

        return prod;
      }
    }
  })
  .catch(err => {
    //console.log(err);
    return err;
  });

}


async function create_cat(catergory){

  let is_present = false;
  return await strapi.query('catergory').find()
  .then( async (result) => {

    for (let j=0; j<result.length; j++){
      if (catergory == result[j].name){
        is_present = true;
        //console.log(`step 4 : Cat ${result[j]}:exists `);
        return result[j];
      }
    }

    if (!is_present){
      //console.log(`is catergory present: ${is_present}`);
      let new_cat = await strapi.query('catergory').create({ name : `${catergory}`});
      //console.log(`new_cat: ${new_cat}`);
      return new_cat;
    }
  })
  .catch((err) => {
    //console.log(err);
    return err;
  });

}


async function add_cat(if_prod, prod, catergories){

  //console.log(`Sadd cart called for ${prod}`)
  await if_prod.update({product_code : prod}, {catergories: catergories})
  .then(res => {
    console.log(`creation response: ${res.catergories}`);
    return res;
  })
  .catch(err => {
    //console.log(err)
    return err;
  });

}

var express = require('express');
  var router = express.Router();

  var connection = require('../config/database');

  // Get All Data
  router.get('/', (req, res) => {
    var getData = 'SELECT * FROM db_prpas ORDER BY id desc';

    connection.query(getData, function(err, rows) {
      if (err) {
        req.flash('Error', err);
        res.render('', {
          username: req.session.username,
          role: req.session.role,
          data: ''
        })
      } else {
        res.render('prpas', {
          username: req.session.username,
          role: req.session.role,
          data: rows
        });
      }
    });
  });

  // Get Food Data
  router.get('/nama_makanan', (req, res) => {
    var getDataFood = 'SELECT * FROM db_prpas WHERE jenis_barang = "Foods"';

    connection.query(getDataFood, function(err, rows) {
      if (err) {
        req.flash('Error', err);
        res.render('', {
          username: req.session.username,
          role: req.session.role,
          data: ''
        })
      } else {
        res.render('prpas', {
          username: req.session.username,
          role: req.session.role,
          data: rows
        })
      }
    })
  })

  // Get Drink Data
  router.get('/nama_minuman', (req, res) => {
    var getDataDrink = 'SELECT * FROM db_prpas WHERE jenis_barang = "Drinks"';

    connection.query(getDataDrink, function(err, rows) {
      if (err) {
        req.flash('Error', err);
        res.render('', {
          username: req.session.username,
          role: req.session.role,
          data: '' 
        })
      } else {
        res.render('rbmarket', {
          username: req.session.username,
          role: req.session.role,
          data: rows
        })
      }
    });
  });

  // Logout
  router.get("/logout", (req, res) =>{
    req.session.destroy();
    res.redirect("/");
  });

  // Create Data
  router.get('/addMenu', (req, res) => {
    res.render('create', { messages: {} });
  });

  router.post('/addMenu', (req, res) => {
    const { product_name, price_product, image_product, product_types } = req.body;

    // Insert data into the database
    connection.query(
        'INSERT INTO produk (product_name, price_product, image_product, product_types) VALUES (?, ?, ?, ?)',
        [product_name, price_product, image_product, product_types],
        (err, results) => {
            if (err) {
                console.error('Error inserting data:', err);
                res.render('error', { message: 'Failed to add menu item.' });
            } else {
                res.redirect('/');
            }
        }
    );
  });

  module.exports = router;

const express = require('express');
const pool = require('../database');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h3>* Bienvenido al Api Vacantes*<h3>');
});



router.post('/nueva-vacante', async (req, res) => {

  const newUser = {
    'empresaVacante': req.body.empresa,
    'nombreVacante' : req.body.vacante,
    'descripcionVacante' : req.body.descripcion,
    'cantidadVacante' : req.body.vacantes,
    'estadoVacante' : req.body.estado
  }

  await pool.query('INSERT INTO vacante SET ?', [newUser], (err, result) => {

    if(err){
      console.log('Error', err.message);
    }else if(result){
      // console.log(result);
      res.status(200).json({message: 'save'});
    }

  });
  
});

router.get('/vacantes', async (req, res) => {
  await pool.query('SELECT * FROM vacante', (err, result) => {
    if(err){
      console.log('Error', err.message);
    }else if(result){
      console.log(result);
      res.status(200).json({vacantes: result});
    }
  });
});

router.get('/vacante/:id', async (req, res) => {

  const idVacante = req.params.id;
  await pool.query('SELECT * FROM vacante WHERE idVacante = ?',idVacante, (err, result) => {
    if(err){
      console.log('Error', err.message);
    }else if(result){
      console.log(result);
      res.status(200).json({vacantes: result});
    }
  });
});

router.get('/vacante/:id', async (req, res) => {

  const empresa = req.params.id;
  console.log(empresa);
  await pool.query('SELECT * FROM vacante WHERE empresaVacante LIKE ?',`%${empresa}%`, (err, result) => {
    if(err){
      console.log('Error', err.message);
    }else if(result){
      console.log(result);
      res.status(200).json({vacantes: result});
    }
  });
});

router.delete('/vacante-eliminar/:id', async (req, res) => {

  const idVacante = req.params.id;
  console.log(idVacante);
  await pool.query('DELETE FROM vacante WHERE idVacante = ?',idVacante, (err, result) => {
    if(err){
      console.log('Error', err.message);
    }else if(result){
      console.log(result);
      res.status(200).json({vacantes: result});                                                                                                                                                                                                                                        
    }
  });
  res.status(200).json({vacantes: 'result'}); 
});

router.post('/vacante/:id', async (req, res) => {

  const idVacante = req.params.id;

  const updateUser = {
    'empresaVacante': req.body.empresa,
    'nombreVacante' : req.body.vacante,
    'descripcionVacante' : req.body.descripcion,
    'cantidadVacante' : req.body.vacantes,
    'estadoVacante' : req.body.estado
  }

  await pool.query('UPDATE empresaVacante, nombreVacante, descripcionVacante, cantidadVacante, estadoVacante FROM vacante WHERE idVacante = SET ?', [updateUser], (err, result) => {

    if(err){
      console.log('Error', err.message);
    }else if(result){
      // console.log(result);
      res.status(200).json({message: 'save'});
    }

  });
  
});
module.exports = router;

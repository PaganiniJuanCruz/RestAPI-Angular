import { addToCart, getCart, removeFromCart, clearCart } from "./controllers/cart.controller.js";
import { getTest } from "./controllers/test.controller.js"
import { validateCredentials } from "./controllers/login.controller.js";    
import express from "express";
import { SECRET_KEY } from "./config/config.js";
import jwt from 'jsonwebtoken';

export const routes = (app) => {
    app.route('/api/test')
        .get(getTest);

    app.route("/api/cart/clear")
        .get(clearCart);

    app.route('/api/cart')
        .get(checkToken, getCart)
        .post(checkToken, addToCart)
        .delete(checkToken, removeFromCart); 
    
    app.route('/api/login')
        .post(validateCredentials);    
    }       

const checkToken = express.Router();
checkToken.use((req, res, next) => {

    let token = req.headers['authorization'];
    
    //lo corto para que me devuelva el token entero
    token = token.replace('Bearer ', '')

    if(token){
        jwt.verify(token, SECRET_KEY, (err, decoded)=> {
            if(err){
                return res.json({
                    status: 'NOT OK',
                    message: 'TOKEN INVALIDO'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            status: "NOT OK",
            message: 'TOKEN NO PROVISTO'
        });
    }
});
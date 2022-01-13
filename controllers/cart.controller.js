let cartContent = [];

export const getCart = (req, res) => {
    res.send(cartContent);
}

export const addToCart = (req, res) => {
    const itemToAdd = req.body;

    if(cartContent.findIndex(movie => movie.id === itemToAdd.id) < 0){
        cartContent.push(itemToAdd);
        res.send({
            status: 'OK',
            cartContent
        });
    }else{
        res.send({
            status: 'NOT OK',
            cartContent
        })
    }
}

export const removeFromCart = (req, res) => {
    const id = Number(req.query.id);
    const indexToRemove = cartContent.findIndex(movie => movie.id === id);

    if(indexToRemove >= 0){
        cartContent.splice(indexToRemove, 1);
        res.send({
            status: 'OK',
            cartContent
        })
    }else{
        res.send({
            status: 'NOT OK',
            cartContent
        })
    }
}

export const clearCart=(req,res)=>{
    let carrito = cartContent;
    carrito=[];
    res.send(carrito);
  }
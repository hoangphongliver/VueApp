export function formatMoney(value) {
    let val = (value / 1).toFixed(0).replace('.', ',')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export function addToCart(cartList, book , dispatch, saveCartListToStore , saveCartListToStorage) {
    book.quantity = 1;
    let isExisted = false;
    cartList.forEach((bookCart) => {
        if (bookCart.id === book.id) {
            isExisted = true
        }
    })
    if (!isExisted) {
        cartList.push({
            ...book
        });
        dispatch
    } else {
        cartList.forEach((bookCart) => {
            if (bookCart.id === book.id) {
                bookCart.quantity++;
            }
        });
        dispatch
    }
    saveCartListToStore
    saveCartListToStorage
}
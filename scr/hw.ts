import { v4 as uuidv4 } from 'uuid';

type Item = {
    id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
};
type User = {
    id: string;
    name: string;
    age: number;
    cart: Item[];
};

function createUser(name: string, age: number): User {
    return { id: uuidv4(), name, age, cart: [] };
}

function createItem(name: string, price: number, description: string, quantity: number = 1): Item {
    return { id: uuidv4(), name, price, description, quantity };
}

function addToCart(item: Item, user: User): void {
    let existingItem;

    for (const cartItem of user.cart) {
        if (cartItem.id === item.id) {
            existingItem = cartItem;
            break;
        }
    }

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
    user.cart.push({ ...item, quantity: 1 });
    }
}

function removeFromCart(item: Item, user: User): void {
    const updatedCart = [];

    for (const cartItem of user.cart) {
        if (cartItem.id !== item.id) {
            updatedCart.push(cartItem);
        }
    }

    user.cart = updatedCart;
}

function removeQuantityFromCart(item: Item, user: User, quantity: number): void {
    let index = -1;

    for (const [currentIndex, cartItem] of user.cart.entries()) {
        if (cartItem.id === item.id) {
            index = currentIndex;
        break;
        }
    }

    if (index !== -1) {
        user.cart[index].quantity -= quantity;

    if (user.cart[index].quantity <= 0) {
        user.cart.splice(index, 1);
    }
}
}

function cartTotal(user: User): number {
    let total = 0;

for (const item of user.cart) {
    const { price, quantity } = item;
    total += price * quantity;
}

return total;
}

function printCart(user: User): void {
    console.log('Cart contents:');
    user.cart.forEach((item) => {
    console.log(`${item.name} (Quantity: ${item.quantity}) - $${item.price * item.quantity}`);
});
    console.log('Cart Total:', cartTotal(user));
}


// Driver Code
const user = createUser('Sarah Stanton', 25);

const itemA = createItem('Item A', 1, 'Description A');
const itemB = createItem('Item B', 2, 'Description B');
const itemC = createItem('Item C', 3, 'Description C');

addToCart(itemA, user);

console.log('After adding Item A to the cart:');
printCart(user); //$1


addToCart(itemB, user);
addToCart(itemB, user);
addToCart(itemB, user);

console.log('After adding 3 Item B to the cart:');
printCart(user); // Item B (Quantity: 3) - $6 total:$7

addToCart(itemC, user);
addToCart(itemC, user);
addToCart(itemC, user);

console.log('After adding 3 Item C to the cart:');
printCart(user); //Item C (Quantity: 3) - $9 total:$16


removeFromCart(itemB, user);

console.log('After removing all instances of Item B from the cart:');
printCart(user); //Cart Total: 10

removeQuantityFromCart(itemC, user, 2);

console.log('After removing 2 instances of Item C from the cart:');
printCart(user); //Cart Total: 4

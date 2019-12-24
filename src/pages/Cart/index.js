import React from 'react';

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { connect } from 'react-redux';

import { Container, ProductTable, Total } from './styles';
import { useDispatch } from 'react-redux';
import { formatPrice } from '../../util/format';

function Cart({ cart, total }) {
  const dispatch = useDispatch();

  function handleDeleteProduct(product) {
    dispatch({ type: 'REMOVE_FROM_CART', id: product.id });
  }
  function handleDecrementProduct(product) {
    dispatch({
      type: 'UPDATE_AMOUNT',
      id: product.id,
      amount: product.amount - 1,
    });
  }
  function handleIncrementProduct(product) {
    dispatch({
      type: 'UPDATE_AMOUNT',
      id: product.id,
      amount: product.amount + 1,
    });
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th></th>
            <th>Produto</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    onClick={() => handleDecrementProduct(product)}
                  >
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readonly value={product.amount} />
                  <button
                    type="button"
                    onClick={() => handleIncrementProduct(product)}
                  >
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleDeleteProduct(product)}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.amount * product.price),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

export default connect(mapStateToProps)(Cart);

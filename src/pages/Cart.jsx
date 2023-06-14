import React from "react";
import { Link } from "react-router-dom";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet title="Carro de compras">
      <CommonSection title="CARRO DE COMPRAS" />

      <Container className="mt-5 mb-5">
        <Row>
          <Col lg="9">
            {cartItems.length === 0 ? (
              <h2 className="fs-4 text-center mb-5 mt-5">
                No hay productos en el carrito
              </h2>
            ) : (
              <table className="table bordered">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((item, index) => (
                    <Tr item={item} key={index} />
                  ))}
                </tbody>
              </table>
            )}
          </Col>

          <Col lg="3">
            <div>
              <h6 className="d-flex align-items-center justify-content-between">
                Subtotal
                <span className="fs-4 fw-bold">${totalAmount}</span>
              </h6>
            </div>
            <p className="fs-6 mt-2">
              Impuestos y Envío seran calculados mas adelante.
            </p>
            <div>
              <button className="buy__button w-100">
                <Link to="/shop">Seguir comprando</Link>
              </button>
              <button className="buy__button w-100 mt-3">
                <Link to="/checkout">Finalizar compra</Link>
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProduct = (product) => {
    dispatch(cartActions.deleteItem(item.id));
  };

  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={deleteProduct}
          class="ri-delete-bin-line"
        ></motion.i>
      </td>
    </tr>
  );
};

export default Cart;

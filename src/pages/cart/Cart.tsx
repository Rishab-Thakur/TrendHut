import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  IconButton,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../../redux/CartSlice";
import Header from "../../components/header/Header";
import { RootState } from "../../redux/Store";
import { CartItem } from "../../interface/CartItem";
import "./Cart.css";

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOrder = () => {
    setOpen(true);
  };

  return (
    <>
      <Header />
      <Container className="cart-container">
        <Typography className="cart-title">Your Cart</Typography>
        {cart.length === 0 ? (
          <Typography className="cart-empty">Your cart is empty.</Typography>
        ) : (
          cart.map((item: CartItem) => (
            <Paper key={item.id} className="cart-item">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <img src={item.image} alt={item.title} className="cart-img" />
                <Typography className="cart-item-title">
                  {item.title}
                </Typography>
                <Typography className="cart-item-price">
                  ${item.price}
                </Typography>
                <Stack direction="row" className="cart-quantity">
                  <Button
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="quantity-btn"
                  >
                    -
                  </Button>
                  <Typography className="quantity-value">{item.qty}</Typography>
                  <Button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="quantity-btn"
                  >
                    +
                  </Button>
                </Stack>
                <IconButton
                  color="error"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="remove-btn"
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Paper>
          ))
        )}
        {cart.length > 0 && (
          <Button
            className="order-button"
            variant="contained"
            sx={{
              backgroundColor: "#004d40",
              color: "#ffffff",
              fontWeight: "bold",
              padding: "12px 24px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#ff9800",
              },
            }}
            onClick={handleOrder}
          >
            Order Now
          </Button>
        )}

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Order placed successfully! 🎉</DialogTitle>
          <DialogActions>
            <Button
              onClick={() => {
                dispatch(clearCart());
                setOpen(false);
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Cart;

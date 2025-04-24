import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import { addToCart, removeFromCart } from "../../redux/CartSlice";
import { fetchProducts } from "../../redux/ProductSlice";
import { Product } from "../../interface/Product";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "../../components/header/Header";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.product
  );
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const isInCart = (id: number) => cart.some((item) => item.id === id);

  const handleCartToggle = (product: Product) => {
    isInCart(product.id)
      ? dispatch(removeFromCart(product.id))
      : dispatch(addToCart(product));
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={10}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box textAlign="center" mt={10}>
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </Box>
        ) : (
          <div className="product-list">
            {items.map((product) => {
              const inCart = isInCart(product.id);
              return (
                <div key={product.id} className="product-wrapper">
                  <Card className="product-card">
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.title}
                      className="product-image"
                    />
                    <CardContent className="product-content">
                      <Typography
                        variant="h6"
                        gutterBottom
                        noWrap
                        className="product-title"
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        gutterBottom
                        className="product-price"
                      >
                        ${product.price}
                      </Typography>
                      <Button
                        fullWidth
                        variant={inCart ? "outlined" : "contained"}
                        color={inCart ? "error" : "primary"}
                        onClick={() => handleCartToggle(product)}
                        sx={{
                          borderRadius: "8px",
                          padding: "10px 16px",
                          textTransform: "none",
                          fontWeight: "bold",
                          backgroundColor: inCart ? "#ff9800" : "#004d40",
                          "&:hover": {
                            backgroundColor: inCart ? "#ff6f00" : "#004d40",
                          },
                        }}
                      >
                        {inCart ? "Remove from Cart" : "Add to Cart"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
};

export default Home;

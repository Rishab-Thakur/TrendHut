import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/Store";
import { logout } from "../../redux/AuthSlice";
import "./Header.css";

const Header: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
      <Toolbar className="header-toolbar">
        <Typography
          variant="h5"
          className="header-logo"
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer", userSelect: "none" }}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigate("/");
            }
          }}
          aria-label="Go to homepage"
        >
          🛒 TrendHut
        </Typography>

        <div className="header-actions">
          <IconButton
            aria-label={`Shopping cart with ${cartItems.length} items`}
            onClick={() => navigate("/cart")}
            size="large"
            color="inherit"
          >
            <Badge
              badgeContent={cartItems.length}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#ff9800",
                  color: "#1a1a1a",
                  fontWeight: "bold",
                },
              }}
            >
              <ShoppingCartIcon className="cart-icon" />
            </Badge>
          </IconButton>

          <Button
            className="logout-btn"
            onClick={handleLogout}
            color="inherit"
            variant="outlined"
            sx={{
              ml: 2,
              borderColor: "#ff9800",
              color: "#ff9800",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#ff9800",
                color: "#1a1a1a",
                borderColor: "#ff9800",
              },
            }}
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

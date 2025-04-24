import React, { useState, useEffect, FormEvent } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/AuthThunk";
import type { RootState, AppDispatch } from "../../redux/Store";
import "./Login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ userName: username, password }));
  };

  return (
    <Container maxWidth="xs" className="login-container">
      <Paper elevation={6} className="login-paper" style={{ padding: 24 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login to TrendHut
        </Typography>

        {error && (
          <Alert severity="error" style={{ marginBottom: 16 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            variant="outlined"
            autoComplete="username"
            disabled={loading}
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            autoComplete="current-password"
            disabled={loading}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            style={{
              marginTop: 16,
              backgroundColor: "#004d40",
              fontWeight: "bold",
              padding: 10,
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#ff9800")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#004d40")
            }
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;

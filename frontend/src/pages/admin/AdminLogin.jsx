import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { adminLoginApi } from '../../api/adminApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectedAdmin, setAdmin } from '../../features/admin/adminSlice';

const AdminLogin = () => {
    const admin = useSelector(selectedAdmin)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async() => {

    if (!email || !password || captcha !== '1234') {
      setError(true);
      return;
    }
    setError(false);
    try{
        const data = await adminLoginApi({email,password})
        console.log("bernn",data)
        if(data.response){
            const { status } = data.response;
            if(status === 400 || status === 500){
                toast.error(data.response.data.message);
            }
        }else{
    
            toast.success(data.data?.message);
            navigate("/admin_dashboard")
            dispatch(setAdmin(data.data?.user))
        }
    }catch(err){
        toast.error(err)
    }
  };

  useEffect(()=>{
    if(admin){
        navigate("/admin_dashboard")
    }
  },[])

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={8} md={4}>
        <Paper elevation={6} style={{ padding: '2rem' }}>
          <Typography variant="h4" gutterBottom align="center">
            Admin Login
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error && !email}
              helperText={error && !email ? 'Email is required' : ''}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error && !password}
              helperText={error && !password ? 'Password is required' : ''}
            />

            {/* Security Image */}
            <Box display="flex" alignItems="center" marginY={2}>
              <img src="https://via.placeholder.com/100x50.png?text=1234" alt="captcha" />
              <TextField
                label="Enter Captcha"
                variant="outlined"
                margin="normal"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                error={error && captcha !== '1234'}
                helperText={error && captcha !== '1234' ? 'Captcha is incorrect' : ''}
                style={{ marginLeft: '1rem' }}
              />
            </Box>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdminLogin;

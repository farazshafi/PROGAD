import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { onCreateCategory } from '../../api/categoryApi';
import {toast} from "react-toastify"


const AddCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublished, setIsPublished] = useState(true); // New state for publish/unpublish

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCategory = {
      name,
      description,
      isPublished,
    };
    try {
      await onCreateCategory(newCategory);
      setName('');
      setDescription('');
      setIsPublished(true); 
      toast.success("Category created successfully")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ backgroundColor: '#2c2c3a', padding: 3, borderRadius: '8px' }}>
        <Typography variant="h5" color="white" align="center" gutterBottom>
          Create New Category
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              fullWidth
              required
              sx={{
                input: { color: 'white' },
                label: { color: 'white' },
                backgroundColor: '#3c3c4d',
                borderRadius: 1,
              }}
              InputLabelProps={{ style: { color: 'grey' } }}
            />

            <TextField
              label="Category Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              required
              sx={{
                input: { color: 'white' },
                label: { color: 'white' },
                backgroundColor: '#3c3c4d',
                borderRadius: 1,
              }}
              InputLabelProps={{ style: { color: 'grey' } }}
            />

            {/* Publish/Unpublish Switch */}
            <FormControlLabel
              control={
                <Switch
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  sx={{ color: 'black'}}
                />
              }
              label={
                <Typography style={{ color: 'white' }}>
                  {isPublished ? 'Publish' : 'Unpublish'}
                </Typography>
              }
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: 'black',
                '&:hover': { backgroundColor: '#ffff',color:"black" },
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              Create Category
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddCategory;

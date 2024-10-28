import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import IconButton from '@mui/material/IconButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useAuth } from '../context/AuthContext';
import { useProject } from '../context/ProjectContext';

const UploadDialog = () => {
  const { addProject } = useProject();
  
  const [formData, setFormData] = useState<any>({
    title: '',
    description: '',
    clientLink: '',
    status: 'visible',
    image: null,
    imagePreview: null
  });
  const [open, setOpen] = useState(false);
  
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev:any) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev:any) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const data = new FormData();
    data.append('image', formData.image);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('clientLink', formData.clientLink);
    data.append('status', formData.status);
    addProject(data)

    // try {
    //   const response = await fetch('http://localhost:3001/projects', {
    //     method: 'POST',
    //     body: data,
    //   });
    //   const result = await response.json();
    //   console.log('Success:', result);
    //   // Close dialog or show success message
      setOpen(false);
      setFormData({
        title: '',
        description: '',
        clientLink: '',
        status: 'visible',
        image: null,
        imagePreview: null
      })
    // } catch (error) {
    //   console.error('Error:', error);
    //   // Handle error
    // }
  };

  return (
    <>
      <Button
        sx={{boxShadow:8}}
        variant="contained"
        color="primary"
        startIcon={<UploadFileIcon />}
        onClick={() => setOpen(true)}
      >
        Add new project
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the details of the new project.</DialogContentText>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleInputChange}
              required
              margin="dense"
              variant="outlined"
            />

            <TextareaAutosize
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter project description"
              minRows={4}
              required
              style={{
                width: '100%',
                marginTop: 16,
                padding: 8,
                borderColor: '#c4c4c4',
                borderRadius: 4,
                borderWidth: 1,
                borderStyle: 'solid',
              }}
            />

            <TextField
              fullWidth
              id="clientLink"
              name="clientLink"
              label="Client Link"
              type="url"
              value={formData.clientLink}
              onChange={handleInputChange}
              placeholder="https://example.com"
              required
              margin="dense"
              variant="outlined"
            />

            <TextField
              fullWidth
              id="status"
              name="status"
              label="Status"
              select
              value={formData.status}
              onChange={handleInputChange}
              margin="dense"
              variant="outlined"
            >
              <MenuItem value="visible">Visible</MenuItem>
              <MenuItem value="hidden">Hidden</MenuItem>
            </TextField>

            <Button
              variant="contained"
              component="label"
              color="secondary"
              startIcon={<UploadFileIcon />}
              fullWidth
              style={{ marginTop: 16 }}
            >
              Upload Image
              <input
                id="image"
                name="image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                hidden
                required
              />
            </Button>

            {formData.imagePreview && (
              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    height: 100,
                    objectFit: 'contain',
                    borderRadius: 4,
                  }}
                />
              </div>
            )}
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" type="submit">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadDialog;

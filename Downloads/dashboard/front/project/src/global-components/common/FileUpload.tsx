'use client';

import { useState, useRef, forwardRef } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Paper,
} from '@mui/material';
import { 
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface FileUploadProps {
  label: string;
  accept: string;
  maxSize: number;
  error?: string;
  value: File | null;
  onChange: (file: File | null) => void;
  icon: React.ReactNode;
  currentImage?: string;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(({
  label,
  accept,
  maxSize,
  error,
  value,
  onChange,
  icon,
  currentImage,
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > maxSize) {
        // Handle file size error
        return;
      }
      onChange(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        '&:hover': {
          borderColor: 'primary.main',
        },
      }}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {value || preview ? (
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          {preview ? (
            <Box
              component="img"
              src={preview}
              alt="Preview"
              sx={{
                width: '100%',
                height: 140,
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: 140,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'action.hover',
                borderRadius: 1,
              }}
            >
              {icon}
            </Box>
          )}
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'background.paper',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <UploadIcon color="action" sx={{ fontSize: 40 }} />
          <Typography variant="subtitle2">{label}</Typography>
          <Typography variant="caption" color="text.secondary">
            Click to upload (max {Math.round(maxSize / 1024 / 1024)}MB)
          </Typography>
        </Box>
      )}

      {error && (
        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Paper>
  );
});

FileUpload.displayName = 'FileUpload';
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Grid,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Paper,
  IconButton,
  FormControlLabel,
  Switch,
  Autocomplete,
  Tooltip,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import { sizeChartSchema, type SizeChart } from '@/lib/validations/sizeChart';

interface SizeChartFormProps {
  onSubmit: (data: SizeChart) => void;
  onCancel: () => void;
  initialData?: SizeChart | null;
  isSubmitting: boolean;
}

const MAX_COLUMNS = 10;
const MAX_ROWS = 20;

export function SizeChartForm({ onSubmit, onCancel, initialData, isSubmitting }: SizeChartFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SizeChart>({
    resolver: zodResolver(sizeChartSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      categories: [],
      columns: ['Size'],
      rows: [{ cells: [{ value: '' }] }],
      isActive: true,
    },
  });

  const { fields: rowFields, append: appendRow, remove: removeRow } = useFieldArray({
    control,
    name: "rows",
  });

  const columns = watch('columns');

  const handleAddColumn = () => {
    if (columns.length >= MAX_COLUMNS) {
      return;
    }
    setValue('columns', [...columns, `Column ${columns.length + 1}`]);
    rowFields.forEach((_, rowIndex) => {
      const currentCells = watch(`rows.${rowIndex}.cells`) || [];
      setValue(`rows.${rowIndex}.cells`, [...currentCells, { value: '' }]);
    });
  };

  const handleRemoveColumn = (columnIndex: number) => {
    if (columns.length <= 1) return;
    setValue('columns', columns.filter((_, index) => index !== columnIndex));
    rowFields.forEach((_, rowIndex) => {
      const currentCells = watch(`rows.${rowIndex}.cells`) || [];
      setValue(
        `rows.${rowIndex}.cells`,
        currentCells.filter((_, index) => index !== columnIndex)
      );
    });
  };

  const handleAddRow = () => {
    if (rowFields.length >= MAX_ROWS) {
      return;
    }
    appendRow({
      cells: columns.map(() => ({ value: '' })),
    });
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const rows = csv.split('\n').map(row => 
          row.split(',').map(cell => cell.trim())
        );

        // Update columns
        setValue('columns', rows[0]);

        // Update rows
        const newRows = rows.slice(1).map(row => ({
          cells: row.map(value => ({ value }))
        }));
        setValue('rows', newRows);
      } catch (error) {
        console.error('Error parsing CSV:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Size Chart' : 'Create New Size Chart'}
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" id="size-chart-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                {...register('title')}
                label="Size Chart Title"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
                placeholder="e.g., Men's T-Shirt Size Guide"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('description')}
                label="Description"
                fullWidth
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
                placeholder="Provide a detailed description of this size chart..."
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={[
                  "Men's Clothing",
                  "Women's Clothing",
                  "Kids' Clothing",
                  "Shoes",
                  "Accessories",
                ]}
                value={watch('categories')}
                onChange={(_, newValue) => setValue('categories', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Categories"
                    error={!!errors.categories}
                    helperText={errors.categories?.message || 'Select categories where this size chart will be used'}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  ))
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
                <Button
                  variant="outlined"
                  onClick={handleAddColumn}
                  startIcon={<AddIcon />}
                  disabled={columns.length >= MAX_COLUMNS}
                >
                  Add Column
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleAddRow}
                  startIcon={<AddIcon />}
                  disabled={rowFields.length >= MAX_ROWS}
                >
                  Add Row
                </Button>
                <Box sx={{ flex: 1 }} />
                <Tooltip title="Import from CSV">
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadIcon />}
                  >
                    Import CSV
                    <input
                      type="file"
                      hidden
                      accept=".csv"
                      onChange={handleImportCSV}
                    />
                  </Button>
                </Tooltip>
              </Box>

              {(columns.length >= MAX_COLUMNS || rowFields.length >= MAX_ROWS) && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  {columns.length >= MAX_COLUMNS && `Maximum ${MAX_COLUMNS} columns reached. `}
                  {rowFields.length >= MAX_ROWS && `Maximum ${MAX_ROWS} rows reached.`}
                </Alert>
              )}

              <Paper variant="outlined" sx={{ p: 2 }}>
                <TableContainer sx={{ maxHeight: 400 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        {columns.map((_, colIndex) => (
                          <TableCell key={colIndex}>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                              <TextField
                                {...register(`columns.${colIndex}`)}
                                size="small"
                                fullWidth
                                placeholder={`Column ${colIndex + 1}`}
                                InputProps={{
                                  endAdornment: columns.length > 1 && (
                                    <IconButton
                                      size="small"
                                      onClick={() => handleRemoveColumn(colIndex)}
                                      sx={{ ml: 1 }}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  ),
                                }}
                              />
                            </Box>
                          </TableCell>
                        ))}
                        <TableCell padding="checkbox" />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowFields.map((row, rowIndex) => (
                        <TableRow key={row.id}>
                          {columns.map((_, colIndex) => (
                            <TableCell key={colIndex}>
                              <TextField
                                {...register(`rows.${rowIndex}.cells.${colIndex}.value`)}
                                size="small"
                                fullWidth
                                placeholder="Enter value"
                              />
                            </TableCell>
                          ))}
                          <TableCell padding="checkbox">
                            <IconButton
                              onClick={() => removeRow(rowIndex)}
                              disabled={rowFields.length <= 1}
                              color="error"
                              size="small"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Switch
                      {...register('isActive')}
                      defaultChecked
                    />
                  }
                  label="Size Chart is active"
                />
                <Tooltip title="When active, this size chart will be displayed on product pages">
                  <HelpIcon color="action" fontSize="small" />
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="size-chart-form"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Create Size Chart'}
        </Button>
      </DialogActions>
    </>
  );
}
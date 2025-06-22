'use client';

import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Chip,
  Card,
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import type { QAForm } from '@/types/qa';
import { qaCategories } from '@/lib/validations/qa';

interface FAQListProps {
  faqs: QAForm[];
  onEdit: (faq: QAForm) => void;
  onDelete: (faqId: string) => void;
}

const getCategoryLabel = (value: string) => {
  return qaCategories.find(cat => cat.value === value)?.label || value;
};

export function FAQList({ faqs = [], onEdit, onDelete }: FAQListProps) {
  if (!faqs || faqs.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">
          No FAQs available. Click the "Add Q&A Section" button to create one.
        </Typography>
      </Box>
    );
  }

  const groupedFAQs = faqs.reduce((acc, faq) => {
    if (!acc[faq.title]) {
      acc[faq.title] = faq;
    }
    return acc;
  }, {} as Record<string, QAForm>);

  return (
    <Box>
      {Object.values(groupedFAQs).map((faq) => (
        <Card key={faq.id} variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {faq.title}
              </Typography>
              <Box>
                <IconButton
                  size="small"
                  onClick={() => onEdit(faq)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onDelete(String(faq.id))}
                  color="error"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {faq.items?.map((item, index) => (
              <Accordion key={index} variant="outlined" sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Typography variant="subtitle1">
                      {item.question}
                    </Typography>
                    <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                      <Chip
                        label={getCategoryLabel(item.category)}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={item.isPublished ? 'Published' : 'Draft'}
                        color={item.isPublished ? 'success' : 'default'}
                        size="small"
                      />
                      {item.isHighlighted && (
                        <Chip
                          label="Highlighted"
                          color="primary"
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}

            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <Chip
                label={`${faq.items?.length || 0} Questions`}
                size="small"
                variant="outlined"
              />
              <Chip
                label={`Last Updated: ${new Date(faq.lastUpdated || faq.dateCreated!).toLocaleDateString()}`}
                size="small"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
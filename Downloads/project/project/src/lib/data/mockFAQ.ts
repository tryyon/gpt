import { QAForm } from '../validations/qa';

export const mockQA: QAForm[] = [
  {
    id: 1,
    title: 'General Questions',
    items: [
      {
        id: 1,
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For specific regions, we also support local payment methods and digital wallets.',
        category: 'payment',
        isPublished: true,
        isHighlighted: true,
        displayOrder: 1,
      },
      {
        id: 2,
        question: 'How can I track my order?',
        answer: 'You can track your order by logging into your account and visiting the "Orders" section. There you\'ll find real-time tracking information and delivery updates for all your orders.',
        category: 'orders',
        isPublished: true,
        isHighlighted: false,
        displayOrder: 2,
      },
      {
        id: 3,
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Some restrictions apply to certain categories. Please check our Returns page for detailed information.',
        category: 'returns',
        isPublished: true,
        isHighlighted: true,
        displayOrder: 3,
      }
    ],
    dateCreated: new Date('2024-03-15'),
    lastUpdated: new Date('2024-03-15'),
  },
  {
    id: 2,
    title: 'Shipping Information',
    items: [
      {
        id: 4,
        question: 'How long does shipping take?',
        answer: 'Standard shipping typically takes 3-5 business days within the continental US. Express shipping options (1-2 business days) are available at checkout. International shipping times vary by location.',
        category: 'shipping',
        isPublished: true,
        isHighlighted: false,
        displayOrder: 1,
      },
      {
        id: 5,
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can see exact shipping costs by entering your address at checkout.',
        category: 'shipping',
        isPublished: true,
        isHighlighted: false,
        displayOrder: 2,
      },
      {
        id: 6,
        question: 'How much does shipping cost?',
        answer: 'Shipping costs are calculated based on your location, the size and weight of your order, and your chosen shipping method. We offer free standard shipping on orders over $50 within the US.',
        category: 'shipping',
        isPublished: true,
        isHighlighted: true,
        displayOrder: 3,
      }
    ],
    dateCreated: new Date('2024-03-15'),
    lastUpdated: new Date('2024-03-15'),
  },
  {
    id: 3,
    title: 'Product Information',
    items: [
      {
        id: 7,
        question: 'How can I find my size?',
        answer: 'Each product page includes a detailed size guide. You can find measurements and fitting recommendations to help you choose the right size. If you\'re still unsure, our customer service team is happy to help.',
        category: 'product',
        isPublished: true,
        isHighlighted: false,
        displayOrder: 1,
      },
      {
        id: 8,
        question: 'Are your products authentic?',
        answer: 'Yes, we guarantee that all products sold on our platform are 100% authentic. We work directly with brands and authorized distributors to ensure product authenticity.',
        category: 'product',
        isPublished: true,
        isHighlighted: true,
        displayOrder: 2,
      },
      {
        id: 9,
        question: 'Do you offer warranty on products?',
        answer: 'Warranty coverage varies by product and manufacturer. Specific warranty information can be found on each product\'s detail page. Most electronics come with a standard 1-year manufacturer warranty.',
        category: 'warranty',
        isPublished: true,
        isHighlighted: false,
        displayOrder: 3,
      }
    ],
    dateCreated: new Date('2024-03-15'),
    lastUpdated: new Date('2024-03-15'),
  }
];
export function exportToCsv<T extends Record<string, any>>(
  data: T[],
  filename: string,
  headers: { [K in keyof Partial<T>]: string },
  transformers: { [K in keyof Partial<T>]?: (value: T[K]) => string } = {}
) {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Data must be a non-empty array');
  }

  try {
    // Convert headers to CSV row
    const headerRow = Object.values(headers).join(',');

    // Convert data to CSV rows with error handling for each field
    const rows = data.map((item, index) => {
      return Object.keys(headers)
        .map(key => {
          try {
            const value = item[key];
            // Use transformer if provided, otherwise convert value to string
            const transformer = transformers[key];
            const processedValue = transformer ? transformer(value) : value;
            
            // Handle special characters and commas
            const stringValue = processedValue === null || processedValue === undefined 
              ? '' 
              : String(processedValue);
            
            // Escape quotes and wrap in quotes if contains comma or newline
            if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
              return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
          } catch (error) {
            console.error(`Error processing field ${key} in row ${index}:`, error);
            return '';
          }
        })
        .join(',');
    });

    // Combine header and data rows
    const csvContent = [headerRow, ...rows].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);

  } catch (error) {
    console.error('Error generating CSV:', error);
    throw error;
  }
}
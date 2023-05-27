export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }

  return date.toLocaleDateString('en-US', options);
}
export function formatNumber(num, dec){
    return new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: dec ?? 2 }).format(num ?? 0);
  }
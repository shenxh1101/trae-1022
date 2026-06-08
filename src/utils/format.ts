export const formatPrice = (price: number): string => {
  return `¥${price.toFixed(0)}`;
};

export const formatDistance = (distance: number): string => {
  if (distance < 1000) {
    return `${distance}m`;
  }
  return `${(distance / 1000).toFixed(1)}km`;
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatWaitTime = (minutes: number): string => {
  if (minutes === 0) return '无需等待';
  if (minutes < 60) return `约${minutes}分钟`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `约${hours}小时${mins}分钟` : `约${hours}小时`;
};

export const getBusinessStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    open: '营业中',
    busy: '繁忙',
    closed: '已打烊'
  };
  return statusMap[status] || status;
};

export const getBusinessStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    open: 'bg-green-500',
    busy: 'bg-orange-500',
    closed: 'bg-gray-400'
  };
  return colorMap[status] || 'bg-gray-400';
};

export const getSpicinessText = (level: number): string => {
  const texts = ['不辣', '微辣', '中辣', '特辣'];
  return texts[level] || '不辣';
};

export const getSpicinessIcons = (level: number): string => {
  return '🌶️'.repeat(level);
};

export const generatePlanId = (): string => {
  return `plan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const formatDateTime = (dateTime: string): string => {
  if (!dateTime) return '';
  const date = new Date(dateTime);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${month}月${day}日 ${hours}:${minutes}`;
};

export const calculateServiceFee = (total: number): number => {
  return Math.round(total * 0.1);
};

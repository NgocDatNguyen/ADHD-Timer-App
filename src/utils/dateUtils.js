// Date utility functions

export const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };
  
  export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  
  export const formatTime = (date) => {
    return new Date(date).toLocaleTimeString();
  };
  
  export const formatDateTime = (date) => {
    return new Date(date).toLocaleString();
  };
  
  export const isToday = (date) => {
    const today = new Date().toDateString();
    return new Date(date).toDateString() === today;
  };
  
  export const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return new Date(date).toDateString() === yesterday.toDateString();
  };
  
  export const daysAgo = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - new Date(date));
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };
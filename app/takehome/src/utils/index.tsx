export const formatCompletedDate = (timestamp: number) => {
  return (
    new Date(timestamp).toLocaleDateString('pt-BR') +
    ' ' +
    new Date(timestamp).toLocaleTimeString('pt-BR').substring(0, 5)
  );
};

export const itsToday = (timestamp: number) => {
  const yesterday = new Date().getTime() - 1 * 24 * 60 * 60 * 1000;

  return timestamp > yesterday;
};

export const formatDateMinified = (timestamp: number) => {
  if (itsToday(timestamp)) {
    return new Date(timestamp).toLocaleTimeString('pt-BR').substring(0, 5);
  }

  return new Date(timestamp).toLocaleDateString('pt-BR');
};

const getFormatedDate = () => {
  const date = new Date()
    .toLocaleDateString('pl-PL', { year: 'numeric', month: 'numeric', day: '2-digit' })
    .replaceAll('.', '-');

  return date;
};

export default getFormatedDate;

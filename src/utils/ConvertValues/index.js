export const useConvertValues = () => {
  const convertValues = (value) => {
    if (!value || isNaN(value)) {
      return 'R$ 0,00';
    }

    const convert = Number(value).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
    return convert;
  };

  return {
    convertValues,
  };
};

export const useFormatNumber = () => {
  const formatNumber = (value, decimals = 0) => {
    if (isNaN(value)) return value;

    const number = parseFloat(value);
    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return { formatNumber };
};

export default function currencyFormatter(value) {
    if (!Number(value)) return "";
  
    const amount = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value / 100);
  
    return `${amount}`;
  }
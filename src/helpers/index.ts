export function formatCurrency(amount: number) {
   return new Intl.NumberFormat('es-US', {style: 'currency', currency: 'USD'}).format(amount)
}
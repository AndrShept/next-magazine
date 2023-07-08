export const formatPrice = (price:number) => {
    return (price/37).toLocaleString('en-US',{
        style: 'currency',
        currency: 'USD'
    })
} 
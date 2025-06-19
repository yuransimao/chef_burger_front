export function FormatCurrency (value:number) {
        return new Intl.NumberFormat("pt-AO",{
                style: 'currency',
                currency:'AOA'
        }).format(value)
                    
     }
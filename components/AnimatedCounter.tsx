'use client';

import CountUp from "react-countup";
import { formatAmount } from '@/lib/utils'

const AnimatedCounter = ({amount}: {amount: number}) => {

  return (
    <div className="w-full">
        <CountUp 
        duration={2}
        decimals={2}
        decimal=","
        prefix="R$"
        end={amount}
        formattingFn={(value) => 
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(value)
          } />
    </div>
  )
}

export default AnimatedCounter
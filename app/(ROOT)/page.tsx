import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {

    const loggedIn = { firstName: 'Vitor', lastName: 'Roverso', email: 'vitorroverso@hotmail.com'}




  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox 
                type="greeting"
                title="Bem-vindo"
                user={loggedIn.firstName || 'Guest'}
                subtext="Acesse e gerencie sua conta e transações de forma eficiente" />

                <TotalBalanceBox 
                    accounts={[]}
                    totalBanks={1}
                    totalCurrentBalance={1250.35}
                />
            </header>

            RECENT TRANSATIONS
        </div>

        <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123.50 }, { currentBalance: 500 }]}
        />
    </section>
  )
}

export default Home
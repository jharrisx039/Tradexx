import React from 'react';
import { CreditCard, Wallet, PiggyBank } from 'lucide-react';
import { Account } from '../../../store/finance';
import { ProgressBar } from '../../ProgressBar';

interface AccountBalancesProps {
  accounts: Account[];
}

export const AccountBalances = ({ accounts }: AccountBalancesProps) => {
  const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);

  const getAccountIcon = (type: Account['type']) => {
    switch (type) {
      case 'checking':
        return CreditCard;
      case 'savings':
        return PiggyBank;
      default:
        return Wallet;
    }
  };

  return (
    <>
      {accounts.map(account => {
        const Icon = getAccountIcon(account.type);
        const percentage = (account.balance / totalBalance) * 100;

        return (
          <div key={account.id} className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{account.name}</p>
                <p className="mt-1 text-2xl font-semibold">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: account.currency,
                  }).format(account.balance)}
                </p>
              </div>
              <div className="p-3 bg-[#E8EDFF] rounded-full">
                <Icon className="w-6 h-6 text-[#2D3FE7]" />
              </div>
            </div>
            <div className="mt-4">
              <ProgressBar 
                progress={percentage} 
                className="h-2 bg-gray-100"
                barClassName="bg-[#2D3FE7]"
              />
              <p className="mt-2 text-sm text-gray-500">
                {percentage.toFixed(1)}% of total balance
              </p>
            </div>
            {account.lastSync && (
              <p className="mt-2 text-xs text-gray-400">
                Last synced: {new Date(account.lastSync).toLocaleString()}
              </p>
            )}
          </div>
        );
      })}
    </>
  );
};
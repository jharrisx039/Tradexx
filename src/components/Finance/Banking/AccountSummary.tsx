import React from 'react';
import { CreditCard, Wallet, PiggyBank } from 'lucide-react';
import { Account } from '../../../store/finance';
import { ProgressBar } from '../../ProgressBar';

interface AccountSummaryProps {
  accounts: Account[];
}

export const AccountSummary: React.FC<AccountSummaryProps> = ({ accounts }) => {
  const metrics = React.useMemo(() => {
    const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);
    const checkingBalance = accounts
      .filter(a => a.type === 'checking')
      .reduce((acc, a) => acc + a.balance, 0);
    const savingsBalance = accounts
      .filter(a => a.type === 'savings')
      .reduce((acc, a) => acc + a.balance, 0);

    return {
      totalBalance,
      checkingBalance,
      savingsBalance,
      checkingPercentage: (checkingBalance / totalBalance) * 100,
      savingsPercentage: (savingsBalance / totalBalance) * 100,
    };
  }, [accounts]);

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Balance</p>
            <p className="mt-1 text-2xl font-semibold">
              ${metrics.totalBalance.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-[#E8EDFF] rounded-full">
            <Wallet className="w-6 h-6 text-[#2D3FE7]" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={100} 
            className="h-2 bg-gray-100"
            barClassName="bg-[#2D3FE7]"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Checking Accounts</p>
            <p className="mt-1 text-2xl font-semibold">
              ${metrics.checkingBalance.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={metrics.checkingPercentage} 
            className="h-2 bg-gray-100"
            barClassName="bg-blue-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            {metrics.checkingPercentage.toFixed(1)}% of total balance
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Savings Accounts</p>
            <p className="mt-1 text-2xl font-semibold">
              ${metrics.savingsBalance.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <PiggyBank className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={metrics.savingsPercentage} 
            className="h-2 bg-gray-100"
            barClassName="bg-green-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            {metrics.savingsPercentage.toFixed(1)}% of total balance
          </p>
        </div>
      </div>
    </>
  );
};
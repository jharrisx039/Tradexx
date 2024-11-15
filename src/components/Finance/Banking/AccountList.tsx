import React from 'react';
import { CreditCard, Wallet, PiggyBank } from 'lucide-react';
import { Account } from '../../../store/finance';
import clsx from 'clsx';

interface AccountListProps {
  accounts: Account[];
  selectedAccount: string | null;
  onSelectAccount: (accountId: string | null) => void;
}

export const AccountList: React.FC<AccountListProps> = ({
  accounts,
  selectedAccount,
  onSelectAccount,
}) => {
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Accounts</h3>
      
      <div className="space-y-2">
        <button
          onClick={() => onSelectAccount(null)}
          className={clsx(
            'w-full flex items-center gap-3 p-3 rounded-lg text-left',
            !selectedAccount ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
          )}
        >
          <Wallet className="h-5 w-5" />
          <div>
            <p className="text-sm font-medium">All Accounts</p>
          </div>
        </button>

        {accounts.map(account => {
          const Icon = getAccountIcon(account.type);
          
          return (
            <button
              key={account.id}
              onClick={() => onSelectAccount(account.id)}
              className={clsx(
                'w-full flex items-center gap-3 p-3 rounded-lg text-left',
                selectedAccount === account.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
              )}
            >
              <Icon className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">{account.name}</p>
                <p className="text-sm text-gray-500">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: account.currency,
                  }).format(account.balance)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
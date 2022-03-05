import { IWithdrawalMoneyItemProps } from './withdrawal-money-item';

import { 
    IWithdrawalMoneyItemStyleOptions, 
    WithdrawalStatusText,
    WithdrawalStatusIcon, 
    WithdrawalStatusColor,
    WithdrawalStatus

} from './withdrawal-money-item.types';

const WITHDRAWAL_MONEY_ITEMS: IWithdrawalMoneyItemProps[] = [
    {
        id: 1828403053903,
        status: WithdrawalStatus.Completed,
        paymentSystem: 'payment',
        sum: 45,
        date: '30.10.2021',
        time: '--:--'
    },
    {
        id: 1091203053903,
        status: WithdrawalStatus.Error,
        paymentSystem: 'payment',
        sum: 235,
        date: '30.10.2021',
        time: '12:44'
    },
    {
        id: 2300403053903,
        status: WithdrawalStatus.Waiting,
        paymentSystem: 'payment',
        sum: 0,
        date: '30.10.2021',
        time: '12:44'
    },
    {
        id: 1828403053903,
        status: WithdrawalStatus.Completed,
        paymentSystem: 'payment',
        sum: 45,
        date: '30.10.2021',
        time: '--:--'
    },
    {
        id: 18284030539031,
        status: WithdrawalStatus.Completed,
        paymentSystem: 'payment',
        sum: 144,
        date: '30.10.2021',
        time: '12:44'
    },
    {
        id: 1091203053903,
        status: WithdrawalStatus.Completed,
        paymentSystem: 'payment',
        sum: 45,
        date: '30.10.2021',
        time: '--:--'
    },
    {
        id: 2300403053903,
        status: WithdrawalStatus.Completed,
        paymentSystem: 'payment',
        sum: 45,
        date: '30.10.2021',
        time: '12:44'
    },
    {
        id: 1828403053903,
        status: WithdrawalStatus.Completed,
        paymentSystem: 'payment',
        sum: 45,
        date: '30.10.2021',
        time: 'time1'
    },
    {
        id: 1828403053903,
        status: WithdrawalStatus.Completed,
        paymentSystem: 'payment',
        sum: 45,
        date: '30.10.2021',
        time: '--:--'
    },
    {
        id: 1091203053903,
        status: WithdrawalStatus.Completed,
        paymentSystem: 'payment',
        sum: 45,
        date: '30.10.2021',
        time: '12:44'
    },
    {
        id: 2300403053903,
        status: WithdrawalStatus.Completed,
        paymentSystem: 'payment',
        sum: 45,
        date: '30.10.2021',
        time: '12:44'
    },
    {
        id: 1828403053903,
        status: WithdrawalStatus.Completed,
        paymentSystem: 'payment',
        sum: 45,
        date: '30.10.2021',
        time: '--:--'
    },
    {
        id: 1828403053903,
        status: WithdrawalStatus.Completed,
        paymentSystem: 'payment',
        sum: 45,
        date: '30.10.2021',
        time: '12:44'
    },
    {
        id: 1091203053903,
        status: WithdrawalStatus.Completed,
        paymentSystem: 'payment',
        sum: 45,
        date: '30.10.2021',
        time: '--:--'
    },
];


const WITHDRAWAL_MONEY_ITEMS_STYLE_OPTION: IWithdrawalMoneyItemStyleOptions = {
    Completed: { 
        color: WithdrawalStatusColor.Completed, 
        text: WithdrawalStatusText.Completed, 
        icon: WithdrawalStatusIcon.Completed, 
    },

    Error: { 
        color: WithdrawalStatusColor.Error, 
        text: WithdrawalStatusText.Error, 
        icon: WithdrawalStatusIcon.Error, 
    },

    Waiting: { 
        color: WithdrawalStatusColor.Waiting, 
        text: WithdrawalStatusText.Waiting, 
        icon: WithdrawalStatusIcon.Waiting, 
    },
} 


export { WITHDRAWAL_MONEY_ITEMS, WITHDRAWAL_MONEY_ITEMS_STYLE_OPTION }
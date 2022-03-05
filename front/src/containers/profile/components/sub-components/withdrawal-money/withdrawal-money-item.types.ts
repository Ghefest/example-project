export enum WithdrawalStatusText {
    Completed = 'Выполнено',
    Error = 'Ошибка',
    Waiting = 'В обработке',
}

export enum WithdrawalStatusIcon {
    Completed = './images/profile/icons/completed.png',
    Error = './images/profile/icons/error.png',
    Waiting = './images/profile/icons/warning.png',
}

export enum WithdrawalStatusColor {
    Completed = '#00DD66',
    Error = '#FF001F',
    Waiting = '#FAAD14',
}

export enum  WithdrawalStatus {
    Completed = "Completed",
    Error = "Error",
    Waiting = "Waiting",
}


export interface IWithdrawalMoneyItem {
	id: number;
	status: WithdrawalStatus;
	paymentSystem: string;
	sum: number;
	date: string;
	time: string;
}

export interface IWithdrawalMoneyItemStyleOption {
    color: WithdrawalStatusColor;
    text: WithdrawalStatusText;
    icon: WithdrawalStatusIcon;
}


export type IWithdrawalMoneyItemStyleOptions = {
    [key in WithdrawalStatus]: IWithdrawalMoneyItemStyleOption;
}

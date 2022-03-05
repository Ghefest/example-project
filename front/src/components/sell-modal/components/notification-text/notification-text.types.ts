export enum TypeColor {
    Warning = "#F5DD0A",
    Danger = "#F40000",
}

export enum TypeIcon {
    Warning = "./images/sell/icons/warning.png",
    Danger = "./images/sell/icons/danger.png",
}

export enum Type {
    Warning = "Warning",
    Danger = "Danger",
}

export interface INotificationText {
    text: string;
    messageType: Type;
}

export type INotificationTextStyleOptions = {
    [key in Type]: INotificationTextStyleOption;
}

export interface INotificationTextStyleOption {
    color: TypeColor;
    icon: TypeIcon;
}


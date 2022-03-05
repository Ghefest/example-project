import { INotificationTextStyleOptions, TypeColor, TypeIcon } from './notification-text.types'

const NOTIFICATION_TEXT_STYLE_OPTION: INotificationTextStyleOptions = {
    Warning: { color: TypeColor.Warning, icon: TypeIcon.Warning },
    Danger: { color: TypeColor.Danger, icon: TypeIcon.Danger },
} 

export { NOTIFICATION_TEXT_STYLE_OPTION }
import { StaticImageData } from 'next/image'

import iconPin from './pin.png'
import iconSpeech from './speech.png'
import iconData from './data.png'
import iconBomb from './bomb.png'
import iconComputer from './computer.png'
import iconBluesky from './bluesky.png'
import iconGitHub from './github.png'
import iconWarning from './warning.png'
import iconCalendar from './calendar.png'
import iconFolder from './folder.png'
import iconBook from './book.png'
import iconImage from './image.png'
import iconPage from './page.png'

const ICONS: Record<string, StaticImageData> = {
    pin: iconPin,
    speech: iconSpeech,
    data: iconData,
    bomb: iconBomb,
    computer: iconComputer,
    bluesky: iconBluesky,
    github: iconGitHub,
    warning: iconWarning,
    calendar: iconCalendar,
    folder: iconFolder,
    book: iconBook,
    image: iconImage,
    page: iconPage,
}

export default ICONS

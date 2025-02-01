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
import iconScissors from './scissors.png'
import iconHeart from './heart.png'
import iconCopyright from './copyright.png'
import iconLicense from './license.png'
import iconCheck from './check.png'
import iconVideo from './video.png'

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
    scissors: iconScissors,
    heart: iconHeart,
    copyright: iconCopyright,
    license: iconLicense,
    check: iconCheck,
    video: iconVideo,
}

export default ICONS

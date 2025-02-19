# Virbix

### Преамбула

Мой аудио плеер не идеален и мне ещё долго предстоит его улучшать. </br>
На данный момент, его невозможно стилизовать без костылей, но в будущий версиях я это исправлю и добавлю встроенные темы. </br>
Под темати я подразумеваю дизайн плеера, например, тема Spotify будет менять дизайн плеера приближённый под дизайн Spotify плеера. </br>
Конечно, готовые темы могут не всем понадобится, так что попробую также реализовать и создание кастомной темы, но это уже потом. </br>

---

### Как использовать

1. Установка: yarn add virbix / npm install virbix
2. Импортируйте из virbix MusicProvider и добавьте его в главный Layout или в какой-либо ещё Layout;
3. Импортируйте хук useMusic из virbix;
4. Деструктуризирейте хук useMusic, достав из него player и playback;
5. в playback.handleTogglePlay необходимо передать url (источник) аудиофайла и при желании можно добавить ещё доп информацию о аудиофайле.
6. player.source нужен будет для отслеживания конкретного трека, чтобы динамически менять иконки воспроизведения и паузы компоненту (если вы конечно их добавите и захотите менять)


---

### Особенность

| Название                              | Virbix           |
|---------------------------------------|------------------|
| **SSR**                               | -                |
| **Эффекты**                           | -                |
| **Поддержка мобильных устройств**     | -                |
| **Отказ от TailwindCSS**              | -                |
| **Кастомизация UI**                   | -                |
| **Кастомизация горячих клавиш**       | -                |
| **Смена UI тем**                      | -                |
| **Подзагрузка новых треков**          | -                |
| **Автоматическое добавление трека**   | 1.1.0            |
| **Перемешка треков**                  | 1.1.0            |
| **Очередь треков**                    | 1.1.0            |
| **Горячие клавиши (Windows / Mac)**   | 1.1.0            |
| **Поддержка ПК**                      | 1.0.0            |
| **Многоразовое зацикливание**         | 1.0.0            |
| **Готовый UI**                        | 1.0.0            |

---

### Управление клавишами
| Действие                            | Windows           | macOS            |
|-------------------------------------|-------------------|------------------|
| **Воспроизвести/пауза**             | `Space`           | `Space`          |
| **Следующий трек**                  | `Ctrl + →`        | `Command + →`    |
| **Предыдущий трек**                 | `Ctrl + ←`        | `Command + ←`    |
| **Промотка вперёд (Seek +15s)**     | `Alt + →`         | `Option + →`     |
| **Промотка назад (Seek -15s)**      | `Alt + ←`         | `Option + ←`     |
| **Повтор трека/альбома**            | `Ctrl + R`        | `Command + R`    |
| **Перемешивание (Shuffle)**         | `Ctrl + S`        | `Command + S`    |
| **Увеличить громкость**             | `Ctrl + ↑`        | `Command + ↑`    |
| **Уменьшить громкость**             | `Ctrl + ↓`        | `Command + ↓`    |
| **Уменьшить/увеличение громкость**  | `Mouse Wheel`     | `Mouse Wheel`    |
| **Сокрытие/появление плеера**       | `Ctrl + H`        | `Command + H`    |
| **Вкл/выкл эффекты**                | `Ctrl + E`        | `Command + E`    |
| **Закрытие плеера**                 | `Ctrl + C`        | `Command + C`    |

---

### Свойства `useMusic`

#### 1. `audioRef`
Ссылка на HTML-элемент `<audio>`.

---

#### 2. `track`
Объект с информацией о текущем треке (берётся из player):
- **`source`** – источник аудио.
- **`info`** – дополнительная информация о треке.

---

#### 3. `info`
Объект с дополнительной информацией о текущем треке (берётся из переменной track в player):
- **`name`** – название трека.
- **`description`** – описание.
- **`image`** – изображение обложки.
- **`author`** – информация об авторе (id, name, url).

---

#### 3. `player`
Состояние и управление плеером:
- **`isPlaying`** – флаг, указывающий, воспроизводится ли аудио.
- **`track`** – содержит информацию о треке.
- **`trackList`** – очередь треков.
- **`error`** – содержит ошибку (вроде как, забыл проверить).
- **`isLoading`** – загрузился ли трек.
- **`isLooped`** – включен ли режим зацикленного воспроизведения.
- **`isEnded`** – закончился ли трек.
- **`isError`** – есть ли ошибка при загрузке/воспроизведении аудио.
- **`isMuted`** – выключен ли звук.
- **`volume`** – текущий уровень громкости.
- **`progress`** – прогресс воспроизведения музыки.
- **`currentTime`** – текущая длина воспроизводимой музыки.
- **`totalTime`** – общая длина музыки.
- **`setPlayerState()`** – общая функция для обновления состояний (не всех).
- **`updateTrackInfo()`** – обновление информации о треке.
- **`handleError()`** – перехват ошибок.
- **`setTrackList(newTrack: TrackProps)`** – добавление нового трека/треков в очередь.

---

#### 4. `playback`
Функции управления воспроизведением:
- **`handleTogglePlay(url: string, trackInfo: TrackInfoProps)`** – переключает воспроизведение и обновляет данные о треке, если воспроизводится новый трек.
- **`handleLoadedMetadata()`** – вызывается при загрузке метаданных трека.
- **`handleTimeUpdate()`** – вызывается при обновлении текущего времени.
- **`handleEnded()`** – вызывается при завершении трека.
- **`handleRepeat()`** – воспроизводит аудио с начала.
- **`handleForwardSkip()`** – перемотка трека на 15 сек вперёд.
- **`handleBackwardSkip()`** – перемотка трека на 15 сек назад.
- **`handleNextTrack()`** – следующий трек.
- **`handlePrevTrack()`** – предыдущий трек.
- **`toggleMute()`** – включает/выключает звук.
- **`toggleLoop()`** – включает/выключает зацикливание.
- **`handleVolumeChange()`** – обновление громкости трека.
- **`handleToggleClose()`** – закрытие плеера.
- **`onSeek(time: number)`** – перематывает трек на указанное время.

---

#### 5. `shortcuts`
Управление горячими клавишами:
- **`volumeControlRef`** – ссылка на HTML-элемент.
- **`handleTimeSkip()`** – управляет перемоткой трека.
- **`handleTrackSkip()`** – управляет промоткой следующего и предыдущего трека.
- **`handleVolume()`** – управляет увеличение/уменьшение звука (only keyboards).
- **`handleScrollVolume()`** – управляет увеличение/уменьшение звука (only mouse).
- **`handlePlaybackControls()`** – управляет второстипенными функциями управления (пауза, сокрытие плеера, вкл/выкл эффекты и т.п).

PS. из shortcuts можно достать только volumeControlRef (нужен для работы handleScrollVolume), остальное вам не нужно трогать.

---

#### 6. `vfx`
Управление визуальными эффектами:
- **`ambientMode`** – режим визуальных эффектов.
- **`toggleAmbientMode()`** – переключает `ambientMode`.

---

#### 7. `ui`
Управление отображением плеера:
- **`isCollapse`** – скрыт ли плеер.
- **`isClose`** – закрыт ли плеер.
- **`toggleCollapse()`** – Переключает скрытие/отображение плеера.
- **`toggleClose()`** – закрывает плеер (не используйте напрямую! он нужен для handleToggleClose в playback).

---

#### 8. `timeline`
Управление дорожкой:
- **`progress`** – показывает прогресс проигрываемого трека.
- **`skipTime(direction: "forward" | "backward")`** – проматывает трек на n секунд (Не используйте напрямую! Он нужен в handleForwardSkip и handleBackwardSkip в playback).
- **`startAnimation()`** – запускает анимацию движения полосы трека.
- **`stopAnimation()`** – останавливает анимацию движения полосы трека.

---

### Пример использования

1. Layout / Providers

```ts
"use client";
import { ReactNode } from "react";
import { TanStackProvider, MobxProvider, ToastProvider, ContextMenuProvider } from "./";
import { MusicProvider } from "virbix";

export const Providers = ({children}:{children:ReactNode}) => {
    return(
        <TanStackProvider>
            <MobxProvider>
                <ToastProvider>
                    <ContextMenuProvider>
                        <MusicProvider>
                            {children}
                        </MusicProvider>
                    </ContextMenuProvider>
                </ToastProvider>
            </MobxProvider>
        </TanStackProvider>
    )
}
```

2. Некий компонент аудио
```ts
import { useMusic } from "virbix";

const CardStorageWrapper: FC<CardStorageWrapperProps> = ({...props}) => {
    const { id, name, url, extension, type, size, created_at, children } = props;
    const description = `${extension} | ${formatFileSize(size, "MB")} | ${timestampFormat(created_at, "Year.Month.Day", false)}`;
    const { player, playback } = useMusic();
    const image = "https://clck.ru/3GTNmC";

    const trackInfo = {name, description, image}

    return(
        <div className="card-storage-wrapper">
            {type === "image"
                ? <Image ...>
                : <Button ...>{icons[type]}</Button>
            }
            <div className="flex flex-col gap-1">
                <h2 className="text-sm font-semibold">{formatMessage(name,18)}</h2>
                <p className="text-xs uppercase font-semibold text-neutral-400">{description}</p>
            </div>
            <div className="flex items-center gap-1 ml-auto">
                {children}
                {(type === "audio") && (
                    <Button className="size-8 flex flex-center p-1.5" onClick={() => playback.handleTogglePlay(url, trackInfo)}>
                        {player.track ? (player.track.source == url && player.isPlaying ? icons["stop"] : icons["play"]) : icons["play"]}
                    </Button>
                )}
                <Button className="size-8 flex flex-center p-1.5">
                    {icons["cross"]}
                </Button>
            </div>
        </div>
    )
}

export default CardStorageWrapper;
```

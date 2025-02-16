# Virbix

### Как использовать

1. Установка: yarn add virbix / npm install virbix
2. Импортируйте из virbix MusicProvider и добавьте его в главный Layout или в какой-либо ещё Layout;
3. Импортируйте хук useMusic из virbix;
4. Деструктуризирейте хук useMusic, достав из него player и playback;
5. в playback.handleTogglePlay необходимо передать url (источник) аудиофайла и при желании можно добавить ещё доп информацию о аудиофайле.
6. player.source нужен будет для отслеживания конкретного трека, чтобы динамически менять иконки воспроизведения и паузы компоненту (если вы конечно их добавите и захотите менять)

---

### Свойства `useMusic`

#### 1. `audioRef`
Ссылка на HTML-элемент `<audio>`.

---

#### 2. `trackInfo`
Объект с информацией о текущем треке (берётся из player):
- **`name`** – название трека.
- **`description`** – описание.
- **`image`** – изображение обложки.
- **`author`** – информация об авторе (id, name, url).

---

#### 3. `player`

Состояние и управление плеером:
- **`isPlaying`** – флаг, указывающий, воспроизводится ли аудио.
- **`source`** – источник аудио.
- **`error`** – содержит ошибку (вроде как, забыл проверить).
- **`trackInfo`** – содержит информацию о треке.
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

---

#### 4. `playback`
Функции управления воспроизведением:
- **`handleTogglePlay(url: string, trackInfo: TrackInfoProps)`** – переключает воспроизведение и обновляет данные о треке, если воспроизводится новый трек.
- **`handleLoadedMetadata()`** – вызывается при загрузке метаданных трека.
- **`handleTimeUpdate()`** – вызывается при обновлении текущего времени.
- **`handleEnded()`** – вызывается при завершении трека.
- **`handleRepeat()`** – воспроизводит аудио с начала.
- **`handleForwardSkip()`** – пропуск аудио вперёд.
- **`handleBackwardSkip()`** – пропуск аудио назад.
- **`toggleMute()`** – включает/выключает звук.
- **`toggleLoop()`** – включает/выключает зацикливание.
- **`handleVolumeChange()`** – обновление громкости трека.
- **`handleToggleClose()`** – закрытие плеера.
- **`onSeek(time: number)`** – перематывает трек на указанное время.

---

#### 5. `vfx`
Управление визуальными эффектами:
- **`ambientMode`** – режим визуальных эффектов.
- **`toggleAmbientMode()`** – переключает `ambientMode`.

---

#### 6. `ui`
Управление отображением плеера:
- **`isCollapse`** – скрыт ли плеер.
- **`isClose`** – закрыт ли плеер.
- **`toggleCollapse()`** – Переключает скрытие/отображение плеера.
- **`toggleClose()`** – закрывает плеер (не используйте напрямую! он нужен для handleToggleClose в playback).

---

#### 7. `timeline`
Управление дорожкой:
- **`progress`** – показывает прогресс проигрывания трека.
- **`skipTime(direction: "forward" | "backward")`** – проматывает трек на n секунд (Не используйте напрямую! Он нужен в handleForwardSkip и handleBackwardSkip в playback).
- **`startAnimation()`** – запускает анимацию движения полосы трека.
- **`stopAnimation()`** – останавливает анимацию движения полосы трека.

---

### Комментарий

Мой аудио плеер не идеален и мне ещё долго предстоит его улучшать. </br>
На данный момент, его невозможно стилизовать без костылей, но в будущий версиях я это исправлю и добавлю встроенные темы. </br>
Под темати я подразумеваю дизайн плеера, например, тема Spotify будет менять дизайн плеера приближённый под дизайн Spotify плеера. </br>
Конечно, готовые темы могут не всем понадобится, так что попробую также реализовать и создание кастомной темы, но это уже потом.

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
    const image = "https://sun9-5.userapi.com/impg/pRuxzMAOSYWakx1zTgVTxNXlyCY3DESC4C8DiA/nKZGT1tLSk4.jpg?size=811x811&quality=95&sign=1192e6e644a427cde6c8e89c55d29169&type=album";

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
                        {player.source ? (player.source == url && player.isPlaying ? icons["stop"] : icons["play"]) : icons["play"]}
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
import { createContext, useContext, RefObject } from 'react';

interface PodcastContextType {
  playPodcast: () => void;
  audioRef: RefObject<HTMLAudioElement> | null;
}

export const PodcastContext = createContext<PodcastContextType>({
  playPodcast: () => {},
  audioRef: null
});

export const usePodcast = () => useContext(PodcastContext);

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FESTIVAL_SONGS, Song } from "@/config/audio-configs";

/**
 * Custom hook to manage audio playback for the Festival Section.
 */
export function useFestivalPlayer() {
    const [currentSongIndex, setCurrentSongIndex] = useState(5); // Default to Afrika
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentSong: Song = FESTIVAL_SONGS[currentSongIndex];

    const handleNext = useCallback(() => {
        setCurrentSongIndex((prev) => (prev + 1) % FESTIVAL_SONGS.length);
        setIsPlaying(true);
    }, []);

    const handleBack = useCallback(() => {
        setCurrentSongIndex((prev) => (prev - 1 + FESTIVAL_SONGS.length) % FESTIVAL_SONGS.length);
        setIsPlaying(true);
    }, []);

    useEffect(() => {
        // Always have an audio instance
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }
        const audio = audioRef.current;

        const handleSongEnd = () => {
            handleNext();
        };

        audio.addEventListener("ended", handleSongEnd);

        // Sync src
        const absoluteSrc = currentSong.src.startsWith('http') ? currentSong.src : `${window.location.origin}${currentSong.src}`;
        if (audio.src !== absoluteSrc) {
            audio.src = currentSong.src;
            audio.load(); // Ensure new source is loaded
        }

        // Sync play/pause state
        if (isPlaying) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.error("Playback failed:", err);
                    setIsPlaying(false);
                });
            }
        } else {
            audio.pause();
        }

        return () => {
            audio.removeEventListener("ended", handleSongEnd);
        };
    }, [currentSong.src, isPlaying, handleNext]);

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = () => setIsPlaying(!isPlaying);

    return {
        currentSong,
        isPlaying,
        togglePlay,
        handleNext,
        handleBack,
        currentSongIndex
    };
}

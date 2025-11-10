"use client";

import { vanillaTrpcClient } from "@/lib/trpc/vanillaClient";
import { useUserStore } from "@/store/useUserStore";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export const RewardedAdButton = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { setCoins } = useUserStore();

  const { data: session } = useSession();
  const handleWatchAd = () => {
    setIsPlay(true);
    setTimeLeft(30);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.volume = 1;
        videoRef.current.play();
      }
    }, 100);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  const handleFinished = async () => {
    setIsPlay(false);
    setTimeLeft(30);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    try {
      const res = await vanillaTrpcClient.user.rewardAddWatched.mutate({
        rewardType: "watchAd",
      });

      setCoins(res.coins);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isPlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isPlay]);

  if (!session) return null;

  return (
    <article className="font-pixels grid">
      {!isPlay ? (
        <button
          onClick={handleWatchAd}
          className="bg-amber-500 p-3 duration-300 hover:bg-amber-600 active:bg-amber-700"
        >
          Получить 5 монет
        </button>
      ) : (
        <div className="fixed top-0 left-0 z-1000 grid h-full w-full items-center justify-center bg-black/70 text-xs sm:grid-cols-[minmax(auto,350px)] sm:p-3 sm:text-sm">
          <div className="grid h-full overflow-y-auto bg-gray-400 pt-3 sm:border-2">
            <h2 className="px-3 pb-3 text-center">
              Посмотрите рекламу и получите 5 монет
            </h2>
            <div className="relative">
              <video src="/ads.mp4" autoPlay muted={false} playsInline></video>
              <span className="pointer-events-none absolute top-0 right-0 bg-black/60 px-2 py-1 text-[0.6rem]">
                Осталось: {timeLeft}сек
              </span>
            </div>
            {timeLeft > 0 ? (
              <button disabled className="btn-ads opacity-50">
                Ждите {timeLeft}сек
              </button>
            ) : (
              <button onClick={handleFinished} className="btn-ads">
                Получить
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

'use client'
// import { Controls, Player } from "@lottiefiles/react-lottie-player";

import { Controls, Player } from "@lottiefiles/react-lottie-player";

export default function Loading() {
  
  // You can add any UI inside Loading, including a Skeleton.
  return <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
  <Player
    autoplay
    loop
    src="https://lottie.host/5d0408a9-1b50-4113-adf4-0d090e818d48/0Qmtrynuc8.json"
    style={{ height: "200px", width: "200px" }}
  >
    <Controls buttons={["play", "repeat"]} />
  </Player>
</div>
}


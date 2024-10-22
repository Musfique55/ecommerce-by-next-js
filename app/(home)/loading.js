'use client'
// import { Controls, Player } from "@lottiefiles/react-lottie-player";

import { Controls, Player } from "@lottiefiles/react-lottie-player";

export default function Loading() {
  
  // You can add any UI inside Loading, including a Skeleton.
  return <div className="w-full h-full absolute transform z-[9999] -translate-x-1/2 -translate-y-1/2">
    {<Player
    autoplay
    loop
    src="https://lottie.host/5d0408a9-1b50-4113-adf4-0d090e818d48/0Qmtrynuc8.json"
    style={{ height: "300px", width: "300px" }}
  >
    <Controls visible={true} buttons={["play", "repeat", "frame", "debug"]} />
  </Player>}
  </div>
  
}


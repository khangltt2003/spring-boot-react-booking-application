import { Button, Carousel, IconButton } from "@material-tailwind/react";

export const Home = () => {
  return (
    <div className="h-full relative ">
      <Carousel
        className="absolute"
        autoplay={true}
        autoplayDelay={5000}
        loop={true}
        transition={{
          type: "fade",
          duration: 0.5,
        }}
        prevArrow={({ handlePrev }: { handlePrev: () => void }) => (
          <IconButton variant="text" color="white" size="lg" onClick={handlePrev} className="!absolute top-2/4 left-4 -translate-y-2/4 z-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </IconButton>
        )}
        nextArrow={({ handleNext }: { handleNext: () => void }) => (
          <IconButton variant="text" color="white" size="lg" onClick={handleNext} className="!absolute top-2/4 !right-4 -translate-y-2/4 z-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </IconButton>
        )}
        navigation={({
          setActiveIndex,
          activeIndex,
          length,
        }: {
          setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
          activeIndex: number;
          length: number;
        }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
      <div className="absolute inset-0 h-full bg-black/40 text-white flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Roomzy</h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">Experience comfort and luxury at its finest.</p>

          <div className="flex gap-4 justify-center mb-12">
            <a href="/room">
              <Button variant="gradient" color="black">
                <span className="text-base">Find a Room</span>
              </Button>
            </a>
            <a href="/booking">
              <Button variant="gradient" color="white">
                <span className="text-base">Check Booking</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

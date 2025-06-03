import { ImageGallery } from "./ImageGallery";

export const SliderTest = () => {
  // Sample images for testing
  const testImages = [
    "test1.jpg",
    "test2.jpg",
    "test3.jpg",
    "test4.jpg"
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Slider Test Component
        </h1>

        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8">
          <h2 className="text-xl text-white mb-4">Auto-playing Image Gallery</h2>
          <p className="text-gray-300 mb-6">
            This slider should automatically change images every 4 seconds.
            You can also use navigation arrows, dots, or thumbnails to control it manually.
          </p>

          <div className="h-[600px]">
            <ImageGallery
              images={testImages}
              isVisible={true}
              delay={0}
            />
          </div>

          <div className="mt-6 text-sm text-gray-400">
            <h3 className="font-semibold mb-2">Features to test:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Auto-play (changes every 4 seconds)</li>
              <li>Navigation arrows (left/right)</li>
              <li>Dot indicators</li>
              <li>Thumbnail navigation</li>
              <li>Play/pause button</li>
              <li>Progress bar animation</li>
              <li>Image counter</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

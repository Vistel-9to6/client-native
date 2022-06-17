import * as VideoThumbnails from "expo-video-thumbnails";

const generateThumbnail = async (videoUrl) => {
  const { uri } = await VideoThumbnails.getThumbnailAsync(videoUrl, {
    time: 500,
  });

  return uri;
};

export { generateThumbnail };

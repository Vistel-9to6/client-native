import * as VideoThumbnails from "expo-video-thumbnails";

const generateThumbnail = async (videoUrl) => {
  try {
    const { uri } = await VideoThumbnails.getThumbnailAsync(videoUrl, {
      time: 500,
    });

    return uri;
  } catch (error) {
    console.warn(error);
  }
};

export { generateThumbnail };

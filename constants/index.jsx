exports.cameraStatus = {
  RECORDING_QUALITY: "480p",
  RECORDING_DURATION: 10,
  CAMERA_RATIO: "16:9",
};

exports.creatorsOptions = 5;

exports.galleryStatus = {
  QUALITY: 1,
  MAX_DURATION: 3000,
  ASPECT: [16, 9],
};

exports.fetchResult = {
  SUCCESS: "ok",
  FAILURE: "ng",
};

exports.errorMessage = {
  ERROR: "Error",
  ERROR_LOGIN_FAILURE: "로그인 실패! 다시 시도해 주세요.",
  ERROR_VIDEOLIST: "동영상 목록을 가져오는 데 실패했습니다.",
  ERROR_RECORD_VIDEO: "동영상 촬영 실패! 다시 시도해주세요.",
  ERROR_DOWNLOAD_FAILURE: "GIF 다운로드 실패! 다시 시도해주세요.",
  ERROR_CREATE_GIF_FAILURE: "GIF 만들기 실패! 다시 시도해 주세요.",
  ERROR_CONCAT_FAILURE: "동영상 합치기 실패! 다시 시도해 주세요.",
  ERROR_POST_FAILURE: "동영상 생성 실패! 다시 시도해 주세요.",
};

exports.defalutGifFilterValue = {
  color: "ORIGINAL",
  grid: "1x1",
  fps: 15,
};

exports.filterOptions = [
  {
    id: 0,
    filter: "color",
    options: [
      { id: 0, type: "SEPIA" },
      { id: 1, type: "GRAYSCALE" },
      { id: 2, type: "REVERSAL" },
    ],
  },
  {
    id: 1,
    filter: "grid",
    options: [
      { id: 0, type: "2x2" },
      { id: 1, type: "3x3" },
      { id: 2, type: "4x4" },
    ],
  },
  {
    id: 2,
    filter: "fps",
    options: [
      { id: 0, type: 1 },
      { id: 1, type: "15" },
    ],
  },
];

exports.defaultExample = `${process.env.AWS_BUCKET_URL}/assets/1x1_original_15.gif`;

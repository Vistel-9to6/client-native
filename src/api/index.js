const getVideoList = async () => {
  const response = await fetch(`${process.env.API_SERVER_URL}/api/videos`);

  return await response.json();
};

const convertGif = async (idToken, uri, filter) => {
  const response = await fetch(`${process.env.API_SERVER_URL}/api/videos/gif`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      videoUrl: uri,
      filter,
    }),
  });

  return await response.json();
};

const postVideo = async (formData, idToken) => {
  const response = await fetch(`${process.env.API_SERVER_URL}/api/videos`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${idToken}`,
    },
    body: formData,
  });

  return await response.json();
};

const concatVideos = async (formData, idToken) => {
  const response = await fetch(`${process.env.API_SERVER_URL}/api/videos`, {
    method: "PATCH",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${idToken}`,
    },
    body: formData,
  });

  return await response.json();
};

const loginGoogle = async (id) => {
  const response = await fetch(
    `${process.env.API_SERVER_URL}/api/auth/google`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: id,
      }),
    },
  );

  return await response.json();
};

const getUserInfo = async (userId, idToken) => {
  const response = await fetch(
    `${process.env.API_SERVER_URL}/api/videos/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    },
  );

  return await response.json();
};

export {
  getVideoList,
  convertGif,
  loginGoogle,
  getUserInfo,
  concatVideos,
  postVideo,
};

# 📹 **VISTEL**

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c135a99f-37f2-4f69-ba73-74f650aa4259/Screen_Recording_20220622-201309_Expo_Go.mp4_000000.000.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220626%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220626T093737Z&X-Amz-Expires=86400&X-Amz-Signature=6028cb76348b3fadae47dbab17039d5300e320a7d0387d7cc7e57f2e35cdc051&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Screen_Recording_20220622-201309_Expo%2520Go.mp4_000000.000.jpg%22&x-id=GetObject" width="300">

<br />

VISTEL은 자신의 스토리를 이어가고 싶은 누군가가 영상으로 찍어 올리면, 앱의 회원 모두 자유롭게 스토리를 영상으로 이어갈 수 있는 Social Network Service 어플리케이션입니다.

본인이 스토리를 생성하거나 다른 사람의 스토리에 참여하여 다양한 영상을 만들고, gif 형식으로 스토리를 다운받아 웹, sns 등 다양한 곳으로 공유할 수 있습니다.

<br />
<br />

## 👥 팀원

![all300](https://user-images.githubusercontent.com/89576038/175809952-9579a6e8-efaf-40ce-92b6-bc8058dc7453.gif)

<br />
<p>▪ 차한솔: 앞(frontend) 뒤(backend)를 넘나드는 올라운더</p>
<p>▪ 김종민: React native도 무섭지 않은 진정한 native</p>
<p>▪ 이선경: 아마존(AWS)의 여왕</p>

<br />
<br />

## 🎯 개발 동기

일반적인 sns은 텍스트 혹은 이야기로 본인의 이야기를 작성하고 피드백을 전달합니다. 만약, 텍스트, 이미지가 아닌 비디오로 나만의 이야기를 전달하면 어떨까요? 또한, 한 명이 시작한 이야기에 여러 사람이 본인의 이야기를 더하여 하나의 이야기를 만들면 어떨까요?

짧지만 명확한 이미지와 오디오를 제공하는 비디오는 사용자의 눈과 귀를 사로잡고, 이야기를 다채롭게 구성할 수 있어 비디오를 활용한 스토리텔링을 제공하는 어플리케이션을 만들고자 하였습니다. 

<br />
<br />

## 📋개발 단계

### 프로젝트 기간

- Week 1 (2022.05.30 ~ 2022.06.05)
    - 아이디어 수집 및 기획
    - 기술 스택 검증 및 정리
    - 디자인 Mockup 작업
    - Agile(애자일) Scrum 프레임 워크 적용
    
- Week 2 (2022.06.06 ~ 2022.06.18)
    - 계획에 따른 개발 진행
    - 마무리 (버그 수정, 테스트 코드 작성 등)

<br />
<br />

## 🖥️ 어플리케이션 구성

**[메인 화면](https://youtube.com/shorts/Nc7QwJS2hWI?feature=share)**

https://user-images.githubusercontent.com/89576038/175809865-bc9500db-5773-4bb0-8206-b8c658ff333d.mp4

- 피드 탭: 메인 피드에서 업로드된 전체 이야기 확인 (최신순)
- 슬라이드 탭: 상하 슬라이드 형식의 피드 리스트
- 카메라 탭 : 실시간 비디오 촬영 및 갤러리에서 비디오 선택 (최대 3초 제한)
- 프로필 탭: 사용자 정보 및 사용자가 생성 및 참여한 리스트 확인

<br />

**[동영상 생성](https://youtube.com/shorts/yC-y_5zW_ms?feature=share)**

https://user-images.githubusercontent.com/89576038/175810306-7810c49d-0367-4734-a879-a099ed57dc65.mp4

- 네비게이션 탭에서 + 아이콘을 누르면 카메라 켜짐
- 촬영 버튼을 꾹 누르면 동영상 촬영 시작, 손을 떼면 촬영 종료
- 업로드하기 전에 촬영한 동영상을 미리 확인 가능
- 다음 버튼을 눌러 동영상 상세 내역 입력 페이지로 이동
- 동영상 제목과 최대 인원 수 입력 후 오른쪽 위 체크 버튼 눌러 동영상 업로드 완료

<br />

**[동영상 병합](https://youtube.com/shorts/m7oiP6L2U2k?feature=share)**

https://user-images.githubusercontent.com/89576038/175810221-bcecedbd-73df-4158-b967-7323c1e987ca.mp4

- 생성된 스토리에서 스토리 참여하기를 눌러 동영상 촬영
- 스토리 참여 시 동영상 병합 및 새로운 동영상 게시
- 스토리 별 gif 변환 및 저장
- gif 옵션 선택

<br />

**[동영상을 GIF 움짤로 변환](https://youtube.com/shorts/hqUM2gMgAxk?feature=share)**

https://user-images.githubusercontent.com/89576038/175810383-6d54296e-b9fc-40df-85b6-6bdcf7c24cbf.mp4

- 동영상 상세 페이지에서 GIF 아이콘을 눌러 옵션 선택 페이지로 이동
- 옵션 선택 페이지에서 미리보기용 움짤에 사용자가 선택한 옵션 조합이 적용된 모습 확인 가능
- 변환하기 버튼을 눌러 GIF 움짤로 변환
- 최종 결과물 확인 후 저장 가능

<br />

**[슬라이드](https://youtu.be/9qeJpJZeTq8)**

https://user-images.githubusercontent.com/89576038/175810103-4be6415a-c1b4-4af5-9361-7c53fa7332e6.mp4

- 네비게이션 탭에서 슬라이드 버튼 누르면 업로드된 동영상들을 슬라이드로 확인 가능
- 슬라이드 시 일정 구간을 넘기지 못하면 기존 동영상으로 돌아옴
- 동영상 재생 중 터치 시 동영상 재생 중지, 떼면 동영상 재생

<br />

**[동영상 검색](https://youtube.com/shorts/vZwHGU3BH6o?feature=share)**

https://user-images.githubusercontent.com/89576038/175810131-84fc2eeb-afb4-4241-87f2-f6711fa4752a.mp4

- 네비게이션 탭에서 돋보기 아이콘을 눌러 동영상 검색 페이지로 이동
- 검색 바에 동영상 제목을 검색하면 검색어와 일치하는 동영상이 피드에 뜸
- 검색 결과에서 동영상을 클릭하면 동영상 상세 페이지 확인 가능

<br />
<br />

## 🛹 세팅 방법

- Expo go 어플리케이션을 사용하여 로컬에서 실행해야 합니다.
- 안드로이드 디바이스에 최적화되어 있습니다.
- 프로젝트 디렉토리 최상단에 .env 파일을 생성해 주세요
    - FrontEnd
        
        ```jsx
        EXPO_CLIENT_ID= <expo client ID>
        ANDROID_CLIENT_ID= <Android client ID>
        API_SERVER_URL= <......>
        AWS_BUCKET_URL=https://vistel-videos.s3.ap-northeast-2.amazonaws.com
        ```
        
    - BackEnd
        
        ```jsx
        AWS_ACCESS_ID= <aws access ID>
        AWS_SECRET_ACCESS_KEY= <aws secret access ID>
        AWS_BUCKET_NAME= <aws bucket name>
        EXPO_CLIENT_ID= <expo client ID>
        JWT_SECRET= <jwt secret key>
        MONGO_URI= <mongoDB URI>
        ```
        
<br />
<br />

## 🔨 기술 스택

- FrontEnd
    - React
    - React Native (Expo)
    - Styled-Component
    - context API

- BackEnd
    - Node.js
    - Express
    - MongoDB
    - AWS S3
    - Fluent-ffmpeg
    
- ThirdParty
    - AWS Elastic Beanstalk
    - PropTypes
    - Jest
    - React Native Testing Library
    - EsLint
    - Prettier
    - Git

<br />
<br />

## 📌 기술 선정 이유

**React native & Expo**

React를 학습하고 사용한 경험을 기반으로 다른 앱 프레임워크 대비 러닝 커브와 진입 장벽이 낮아 짧은 시간 안에 앱을 구축하기에 용이하였습니다. 

Expo는 네이티브 모듈을 사용할 수 없고 앱의 번들 용량이 다소 크지만,  앱 초보자의 입장에서  초기 구축을 쉽고 빠르게 진행할 수 있어 선택하였습니다.

**Context API**

프로젝트 기준으로 전역적으로 관리해야 하는 데이터 양이 많지 않아 redux 등의 상태 관리 툴이 아닌 React에서 기본으로 제공하는 Context API를 이용하여 관리하였습니다.

**MongoDB & Mongoose**

프로젝트에서 관리하는 데이터 collection 간의 관계가 크게 엮어있지 않은 설계로,  SQL 보다 noSQL인 MongoDB가 더욱 적합할 것이라고 생각했습니다. 

또한, 추후  앱이 확장되고 사용자가 많아지더라도 유연하게 스키마를 관리하고 동일한 CRUD 등의 쿼리를 처리하는데 있어 속도 및 리소스 면에 있어 장점을 가질 수 있습니다. 

**FFmpeg**

FFMPEG은 멀티미디어 파일(동영상, 음악 )등의 인코딩, 디코딩, 트랜스코딩 등을 조작할 수 있는 대부분의 기능을 제공하는 오픈소스 프로젝트입니다.  간단한 명령어를 통하여 사용할 수 있지만 nodejs에서 사용할 수 있는 “flent-ffmpeg” 라이브러리를 추가로 사용하여 동영상 병합 및 gif 변환 등의 편집을 진행하였습니다. 

**AWS S3**

추후 앱의 사용자가 늘어나 사용자 트래픽이 증가하더라도 저장할 수 있는 파일 수의 제한이 없어 스토리지에 대한 추가 증설 작업이 필요하지 않습니다. 또한, 사용한 스토리지 만큼 요금이 적용되며 보안 관련하여 버킷마다 인증 시스템을 설정하고 권한을 제어할 수 있어 현 프로젝트에서 비디오 및 gif 등의 데이터를 관리하는 데 있어 확장성, 안정성, 신뢰성 및 효율성을 모두 가질 수 있었습니다.

<br />
<br />

<html>
<body>
<!--StartFragment--><h2>💡 기술 관련 고민</h2>

<ul>
<li>
<p><strong>동영상 관련 라이브러리 사용 위치 (프론트/백)</strong></p>
<ul>
<li>
<p>동영상 업로드</p>
<p>처음에는 카메라를 통해 촬영한 동영상을 저장하기 위해 aws-amplify를 이용해 프론트엔드에서 바로 AWS S3로 업로드하는 방법을 선택했습니다. aws-amplify는 AWS 리소스들을 가용하여 손쉽게 프론트엔드와 백엔드, 호스팅, 배포까지 풀스택으로 애플리케이션을 개발하도록 돕는 서비스로서, 프론트엔드에서 서버를 거치지 않고 곧바로 AWS S3에 업로드가 가능하다는 점에서 선택한 방법이었습니다. 그러나, 상대적으로 무거울 수 있는 동영상을 처리하는 작업이 클라이언트 단에서 이루어짐에 따라 사용자 로딩 시간이 늘어나는 문제가 있어 사용자 경험을 증진시키기 위해 다른 방법을 고민했습니다.</p>
<p>다음으로 생각한 방법은 multer 라는 파일 업로드 라이브러리를 이용하여 촬영한 동영상의 uri를 받아 nodeJS 서버에서 AWS S3로 동영상을 업로드하는 방법이었습니다. AWS S3와 multer-s3를 이용하여 미들웨어를 추가한 후 프론트엔드에서 첨부파일이 아닌 촬영한 동영상의 uri를 formData 형식으로 보냄으로써 서버에서 동영상 파일의 정보를 받을 수 있었습니다. 이 방법을 사용하면 프론트엔드에서 동영상 변환 작업을 기다릴 필요가 없어 앞서 고민한 문제를 해결할 수 있기에 해당 방법을 선택하여 적용하였습니다.</p>
</li>
<li>
<p>동영상 병합 및 GIF 움짤 만들기</p>
<p>한편, 동영상을 병합하고 변환하는 ffmpeg를 프론트엔드와 백엔드 중 어디에서 다룰지에 대해서도 고민하는 과정을 거쳤습니다. 동영상 병합 및 GIF 움짤 만들기와 관련해서는 동영상 업로드와 마찬가지로 무거운 동영상을 프론트엔드에서 작업하는 것이 사용자 경험에 좋지 않다고 생각하여 fluent-ffmpeg를 이용하기로 결정했습니다.</p>
</li>
<li>
<p>사용자가 옵션 선택 시 GIF 움짤 미리보기</p>
<p>다만, 동영상을 GIF 움짤로 만들기 전에 옵션을 선택하는 과정에서는 사용자가 옵션 버튼을 클릭하는 매 순간마다 백엔드로 요청을 보내 변환된 데이터를 받아오는 것이 비효율적이라는 생각이 들었습니다. 그래서 expo-file-system과 ffmpeg-kit-react-native를 이용하여 프론트엔드에서 변환 작업을 거치는 방법을 조사해보았습니다. expo-file-system을 이용하면 로컬로 저장된 파일 시스템에 접근하여 생성/수정/삭제를 할 수 있으므로 캐시 폴더에 동영상을 저장하고자 했습니다. 사용자가 옵션 버튼을 누르면 캐시 폴더에서 받아온 동영상에 사용자가 선택한 옵션을 적용한 결과물을 보여주는 방법으로 미리보기를 보여줄 수 있을 것이라 생각했습니다. 그러나 이 방법 역시 프론트엔드에 과한 부담이 될 것이라 생각하여 다른 방법을 찾았습니다.</p>
<p>결국 최종적으로는 미리보기용 GIF 움짤을 임의로 하나 만들고 이를 기반으로 사용자가 선택할 수 있는 옵션 조합이 적용된 움짤들을 미리 AWS S3에 저장해놓은 후 이를 불러와 보여주는 방법을 선택했습니다. 사용자에 의한 동영상 변환이 잦은 경우에도 매번 백엔드로 요청을 보내지 않도록 하여 효율성을 높였고, 프론트엔드에서 무거운 동영상 처리를 하지 않음으로써 사용자 경험을 고려하고자 노력했습니다. 다만, 미리보기 화면에서 사용자가 직접 선택한 움짤을  보여주지 못한 점이 아쉬움으로 남습니다. 저희가 고민했던 방법들 외에 프론트엔드 및 백엔드 성능을 모두 만족시키고 사용자 경험을 최대화 할 수 있는 방법을 계속해서 고민 중에 있습니다.</p>
</li>
</ul>
</li>
<li>
<p><strong>비디오 최적화</strong></p>
<p>처음 프로젝트를 설계했을 때 사용자의 참여에 따라 동영상의 길이가 늘어나게 되고 그만큼 용량이 늘어날 수 밖에 없어 비디오 최적화가 가장 중요한 키라고 생각했습니다. 또한, 클라이언트 입장에서도 사용자에게 가능한 빨리 비디오를 렌더링하여 보여줘야 하고, 서버 입장에서도 관리해야 하는 데이터의 양이 많아지기에 속도면이나 비용적인 면에서도 반드시 고려해야 하는 부분이었습니다.</p>
<p>이를 위해 서버 단에서 ffmpeg 라이브러리를 사용 시 아래를 기준으로 동영상 최적화를 진행하고자 하였습니다.</p>
<ul>
<li>mp4 파일 형식: 가장 일반적인 파일 유형으로 MPEG-4 코덱을 사용하여 압축률이 높으며 웹 동영상 게시에 적합하다고 판단했습니다.</li>
<li>해상도 (480p):  프로젝트 성격 상 초고화질의 비디오를 서비스하는 것보다 는 적당한  비디오 퀄리티를 유지하며  빠른 속도로 제공할 수 있는 최저의 해상도를 선택하는 것이 중요하다고 판단했습니다. 틱톡, 유튜브 등의 서비스가 제공하는 가장 기본 화질이기도 합니다 .</li>
</ul>
<p>위를 기준으로 동영상을 병합할 경우 아래와 같이 최대 2MB의 용량을 유지할 수 있었습니다.</p>

동영상 수 | 동영상 길이 | 용량
-- | -- | --
1 | 3s | 1.4MB
2 | 6s | 1MB
3 | 9s | 1.3MB
4 | 12s | 1.8MB
5 | 15s | 2.2MB

</li>
<li>
<p><strong>React-native life cycle</strong></p>
<p>React에는 화면 전환을 하기 위해 route를 사용합니다. 컴포넌트에 path 속성을 이용하여 원하는 url을 지정하고, 그 url에 접속하면 해당 컴포넌트만 렌더링이 됩니다.</p>
<p>React Native에는 route와 비슷한 기능의 react-navigation 라이브러리가 있습니다. 하지만 컴포넌트들을 tab navigation으로 ux를 구축하고 사용해보면 불편한 점이 생깁니다. <strong>문제점1) 바로 해당 컴포넌트(탭)로 돌아갔을 경우 렌더링이 되지 않는 점</strong>인데요. 예를 들면 새로운 포스트를 만들고 navigation의  <code>goBack()</code> , <code>popToTop()</code> 메소드로 해당 컴포넌트(탭)로 돌아갔을 때 렌더링 및 API 요청이 되지 않아 방금 만든 포스트가 리스트에 추가되어있지 않는 경우입니다. 이런 점이 React의 life cycle과 크게 다른 부분이였습니다. 이런 navigation 문제를 해결하기 위한 방법으로 3가지가 존재합니다.</p>
</li>
</ul>
<ol>
<li>Listening to the 'focus' event with an event listener.</li>
<li>Using the useFocusEffect hook provided by react-navigation.</li>
<li>Using the useIsFocused hook provided by react-navigation.</li>
</ol>
<p>이 중 저희는 3번 방법으로 <code>useIsFoused()</code>라이브러리를 사용하여 해당 컴포넌트에서 원하는 API 요청 및 렌더링을 할 수 있었습니다.</p>
<pre><code class="language-jsx">const isFocused = useIsFocused();
</code></pre>
<p>위의 경우는 렌더링이 되지 않는 문제였다면, <strong>문제점2) 또 다른 문제점은 반대로 컴포넌트가 unmount되지 않는 문제</strong>가 있었습니다. vistel 앱에서는 비디오가 재생되는 컴포넌트가 다소 존재합니다. VideoDetail, Slide, VideoResult 등의 컴포넌트들인데요, 이 컴포넌트들에서 unmount 문제가 생깁니다. 비디오가 재생 중이던 컴포넌트에서 다른 탭으로 이동했을 때, 이전 컴포넌트에서 <code>useRef()</code> 로 참조되고 있던 비디오가 종료되지 않고 계속 재생되는 문제입니다. 이를 해결하기 위해서 다른 컴포넌트로 이동하는 함수 안에 <code>videoRef.current.pauseAsync();</code> 함수를 실행시켜주었습니다. 직접 참조되고 있는 video를 중지시키는 방법입니다.</p>
<p>위의 두 사례를 통해 웹과 앱의 차이에 대해서 다시 생각해 보는 계기가 되었습니다.</p>
<!--EndFragment-->
</body>
</html>

<br />
<br />

## 💊 아쉬웠던 부분

현 시대에서 동영상이라는 키워드를 기준으로 스트리밍(streaming) 개념을 빼놓고 말하기 어렵습니다. 

하지만, 처음 프로젝트를 진행하면서 이 부분을 고려하지 못하고 설계를 진행하게 되어 현 프로젝트에서는 동영상을 로컬 디렉토리에서 병합하고 저장한 파일을 aws 버킷에 저장하여 서비스하고 있습니다.

만약, 스트리밍을 적용하였다면  기존 프로세스에서 아래와 같은 부분을 개선할 수 있을 것입니다.

1. 로컬 디렉토리에 파일을 저장하는 행위 없이 비디오 스트리밍 가능
2. AWS Lambda, MediaConvert, CouldFront 등 다양한 AWS 미디어 서비스를 사용하여 다양한 화질 등의 컨텐츠 퀄리티, 속도 및 안정성 증가

 프로젝트가 종료되었지만 아쉬운 마음에 스트리밍을 적용한 POC을 진행해 보았습니다. 이와 관련하여 정리한 노션 문서를 첨부합니다.

<a href="https://garrulous-snowshoe-49c.notion.site/POC-7c93625559d14432acd2d4acec356348">Stream POC</a>

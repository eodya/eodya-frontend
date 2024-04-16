<p align="center">
    <img src="https://github.com/eodya/eodya-frontend/assets/62260343/0f2c20ac-fd64-46d0-9c23-13359cf975ef">
</p>

> **개발기간** 2024.03 ~ 2024.04 (진행 중)

<br />

## 프로젝트 소개

내가 방문한 동네의 숨은 꽃구경 스팟을 공유하고, 개화 현황을 실시간으로 확인할 수 있는 플랫폼입니다. 유저들은 자발적으로 참여하여 꽃 구경 명소를 공유하고, 실제로 그곳을 방문하여 개화 현황을 업데이트할 수 있어요. 소셜 콘텐츠와 연계하여 공유할 수 있고 이를 통해 마이크로 꽃놀이 트렌드를 만들어갑니다. 비슷한 관심을 가진 유저들이 추천한 놀거리와 관련된 정보도 함께 제공되어 주변의 다양한 경험을 즐길 수 있어요. 함께 만들어가는 공간 경험 큐레이션 플랫폼으로, 지역의 아름다운 스팟들을 공유하는 즐거움을 함께 누릴 수 있습니다.

<br />

## 시작 가이드

### 요구사항

- Node.js 20.11.1^
- Npm 10.5.0^

### Installation

```
$ git clone https://github.com/eodya/eodya-frontend.git
$ cd eodya-frontend
```

### Frontend

```
$ npm install
$ npm start
```

<br />

## 기술 스택

### Environment

<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white">

### Config

<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">

### Development

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

### Communication

<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/Google%20Meet-00897B?style=for-the-badge&logo=google-meet&logoColor=white"> <img src="https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white"> <img src="https://img.shields.io/badge/kakaotalk-ffcd00.svg?style=for-the-badge&logo=kakaotalk&logoColor=000000"> <img src="https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white">

### Design

<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

<br />

## 주요 기능

### ⭐ 등록 되어있는 여러 스팟을 한눈에 확인

- 사용자가 등록한 스팟을 카카오맵 마커를 통해 확인이 가능합니다.
- 주변에 등록된 스팟을 리스트로 확인이 가능합니다.

### ⭐ 스팟 등록, 후기 작성

- 등록된 스팟의 ID값으로 후기를 작성할 수 있습니다.

### ⭐ 카카오 간편 로그인

- 카카오 API을 통한 간편 로그인이 가능 합니다.

### ⭐ 여러 플랫폼으로 공유하기

- 페이스북, 카카오, 밴드, 트위터 등 여러 플랫폼으로 해당 스팟 주소를 공유할수 있습니다.

<br />

## 화면 구성

|                                               메인 페이지                                                |                                               근처의 명소                                                |                                                마커 정보                                                 |
| :------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/eodya/eodya-frontend/assets/96280450/c652de3c-ab34-4689-b2ff-295391bd938f"> | <img src="https://github.com/eodya/eodya-frontend/assets/96280450/0b6cdd71-3c1a-4ce5-8eee-d6ae3df683df"> | <img src="https://github.com/eodya/eodya-frontend/assets/96280450/e103d3f9-22e9-4962-9a36-3a1b7bd9eb69"> |
|                                                상세 정보                                                 |                                            상세 정보 공유하기                                            |                                                스팟 등록                                                 |
| <img src="https://github.com/eodya/eodya-frontend/assets/96280450/ad3816e2-27ee-4ffe-8608-868d50880c10"> | <img src="https://github.com/eodya/eodya-frontend/assets/96280450/06ff00bf-0f1f-4d76-a4dd-e373358e6a06"> | <img src="https://github.com/eodya/eodya-frontend/assets/96280450/83b6c71d-4761-41fb-8945-9fc7ff155c73"> |
|                                                스팟 검색                                                 |                                              스팟 상태 입력                                              |                                           스팟 후기 내용 입력                                            |
| <img src="https://github.com/eodya/eodya-frontend/assets/96280450/5c51f05d-0571-4ea4-8d60-ac3e557ec6f7"> | <img src="https://github.com/eodya/eodya-frontend/assets/96280450/bd5949aa-ca69-4108-8a7b-8e6ec70e09ce"> | <img src="https://github.com/eodya/eodya-frontend/assets/96280450/0c9df42b-a521-40dc-b1bc-04903699b1b6"> |
|                                            마이페이지 북마크                                             |                                             마이페이지 리뷰                                              |
| <img src="https://github.com/eodya/eodya-frontend/assets/96280450/841e647e-4117-41c9-b79a-225451e02f0d"> | <img src="https://github.com/eodya/eodya-frontend/assets/96280450/d1b5264d-88db-4232-ac91-9b5b145c4e69"> |

<br />

## 아키텍쳐

```
eodya-frontend
├─ .gitignore
├─ .prettierrc.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt
├─ README.md
├─ src
│  ├─ App.test.tsx
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ fonts
│  │  │  └─ PretendardVariable.woff2
│  │  └─ image
│  │     ├─ 404.svg
│  │     ├─ bg.svg
│  │     ├─ icon
│  │     │  ├─ arrow_drop_down.svg
│  │     │  ├─ bookmark.svg
│  │     │  ├─ bookmark_outline.svg
│  │     │  ├─ check.svg
│  │     │  ├─ close.svg
│  │     │  ├─ edit.svg
│  │     │  ├─ error.svg
│  │     │  ├─ home.svg
│  │     │  ├─ horiz.svg
│  │     │  ├─ icon_close.svg
│  │     │  ├─ location.svg
│  │     │  ├─ logout.svg
│  │     │  ├─ more.svg
│  │     │  ├─ person.svg
│  │     │  ├─ photo.svg
│  │     │  ├─ prev.svg
│  │     │  ├─ search.svg
│  │     │  ├─ setting.svg
│  │     │  ├─ share.svg
│  │     │  ├─ state_blooming.svg
│  │     │  ├─ state_full_bloom.svg
│  │     │  ├─ state_next_year.svg
│  │     │  ├─ state_not_selected.svg
│  │     │  ├─ state_not_selected_full.svg
│  │     │  └─ vintage.svg
│  │     ├─ logo.svg
│  │     ├─ marker
│  │     │  ├─ basic.png
│  │     │  ├─ blossom.png
│  │     │  ├─ blossom_click.png
│  │     │  ├─ bookmark.png
│  │     │  └─ user.png
│  │     └─ social
│  │        ├─ Band.png
│  │        ├─ Facebook.png
│  │        ├─ Instagram.png
│  │        ├─ Kakao.png
│  │        └─ Twitter.png
│  ├─ components
│  │  ├─ common
│  │  │  ├─ btn
│  │  │  │  ├─ BookMarkBtn.tsx
│  │  │  │  ├─ Btn.tsx
│  │  │  │  └─ Share
│  │  │  │     ├─ Modal
│  │  │  │     │  ├─ ErrorModal.tsx
│  │  │  │     │  └─ ShareModal.tsx
│  │  │  │     ├─ ShareBtn.tsx
│  │  │  │     ├─ SnsBox.tsx
│  │  │  │     └─ Social
│  │  │  │        ├─ BandShare.tsx
│  │  │  │        └─ KakakoShare.tsx
│  │  │  ├─ input
│  │  │  │  └─ Input.tsx
│  │  │  ├─ marker
│  │  │  │  ├─ BasicMarker.tsx
│  │  │  │  ├─ BlossomMarker.tsx
│  │  │  │  ├─ BookMarker.tsx
│  │  │  │  └─ UserMarker.tsx
│  │  │  ├─ menu
│  │  │  │  ├─ Navigation.tsx
│  │  │  │  └─ TopBar.tsx
│  │  │  ├─ spinner
│  │  │  │  └─ Spinner.tsx
│  │  │  └─ tag
│  │  │     └─ FlowerTag.tsx
│  │  ├─ layout
│  │  │  ├─ Layout.tsx
│  │  │  └─ SplashScreen.tsx
│  │  ├─ login
│  │  │  ├─ KakaoCallback.tsx
│  │  │  ├─ PrivateRoute.tsx
│  │  │  └─ PublicRoute.tsx
│  │  ├─ main
│  │  │  ├─ Btn
│  │  │  │  ├─ LocationBtn.tsx
│  │  │  │  └─ MainBookMarkBtn.tsx
│  │  │  ├─ Info
│  │  │  │  └─ Info.tsx
│  │  │  ├─ Modal
│  │  │  │  └─ RankModal.tsx
│  │  │  ├─ Search
│  │  │  │  └─ Search.tsx
│  │  │  └─ Tour
│  │  │     ├─ List.tsx
│  │  │     └─ Tour.tsx
│  │  ├─ mypage
│  │  │  ├─ BookPage.tsx
│  │  │  ├─ GridLayout.tsx
│  │  │  ├─ Image.tsx
│  │  │  ├─ Information
│  │  │  │  ├─ FormNickname.tsx
│  │  │  │  └─ Information.tsx
│  │  │  ├─ Modal
│  │  │  │  └─ LogoutModal.tsx
│  │  │  ├─ ReportPage.tsx
│  │  │  ├─ ReviewPage.tsx
│  │  │  └─ TabMenu.tsx
│  │  ├─ new
│  │  │  ├─ review
│  │  │  │  └─ SpotMore.tsx
│  │  │  ├─ SearchItem.tsx
│  │  │  ├─ spot
│  │  │  │  ├─ SpotMap.tsx
│  │  │  │  └─ SpotSearch.tsx
│  │  │  ├─ SpotDone.tsx
│  │  │  ├─ SpotInfo
│  │  │  ├─ SpotInfo.tsx
│  │  │  └─ SpotStatus.tsx
│  │  └─ review
│  │     └─ List.tsx
│  ├─ hook
│  │  ├─ mapLocation
│  │  │  ├─ useGetPostion.ts
│  │  │  └─ useWatchLocation.ts
│  │  ├─ useGetCity.ts
│  │  └─ useMypageTotal.ts
│  ├─ index.css
│  ├─ index.tsx
│  ├─ logo.svg
│  ├─ page
│  │  ├─ 404
│  │  │  └─ NotFound.tsx
│  │  ├─ detail
│  │  │  └─ Detail.tsx
│  │  ├─ login
│  │  │  └─ Login.tsx
│  │  ├─ main
│  │  │  └─ Main.tsx
│  │  ├─ mypage
│  │  │  ├─ BookMark.tsx
│  │  │  └─ Review.tsx
│  │  ├─ new
│  │  │  ├─ Review.tsx
│  │  │  └─ Spot.tsx
│  │  ├─ review
│  │  │  └─ List.tsx
│  │  └─ tour
│  │     └─ List.tsx
│  ├─ react-app-env.d.ts
│  ├─ reportWebVitals.ts
│  ├─ service-worker.ts
│  ├─ serviceWorkerRegistration.ts
│  ├─ setupProxy.js
│  ├─ setupTests.ts
│  ├─ store
│  │  ├─ @types
│  │  │  └─ main
│  │  │     ├─ marker
│  │  │     │  └─ MarkerType.ts
│  │  │     ├─ search
│  │  │     │  └─ SearchType.ts
│  │  │     ├─ spotInfo
│  │  │     │  └─ InfoPlaceType.ts
│  │  │     └─ tourList
│  │  │        └─ TourPlaceType.ts
│  │  ├─ features
│  │  │  ├─ auth
│  │  │  │  └─ authSlice.ts
│  │  │  ├─ errorModal
│  │  │  │  └─ modalSlice.ts
│  │  │  ├─ main
│  │  │  │  ├─ location
│  │  │  │  │  └─ locationSlice.ts
│  │  │  │  ├─ marker
│  │  │  │  │  └─ markerSlice.ts
│  │  │  │  ├─ search
│  │  │  │  │  └─ searchSlice.ts
│  │  │  │  └─ spotInfo
│  │  │  │     ├─ InfoPlace.ts
│  │  │  │     └─ InfoSlice.ts
│  │  │  └─ mypage
│  │  │     └─ infoSlice.ts
│  │  ├─ hooks.ts
│  │  └─ store.ts
│  ├─ types
│  │  ├─ ButtonProps.ts
│  │  ├─ InfoPlaceType.ts
│  │  ├─ LocationProps.ts
│  │  ├─ mypage
│  │  │  ├─ BookmarkType.ts
│  │  │  └─ ReviewType.ts
│  │  ├─ review
│  │  │  └─ ReviewType.ts
│  │  └─ SpotFormValuesType.ts
│  └─ utils
│     └─ mapLocation
│        ├─ fetchAddressAndName.ts
│        └─ getCurrentLocation.ts
├─ tailwind.config.js
└─ tsconfig.json

```


<br />

## 웹개발팀

|                                                          김지유                                                          |                                   김가희                                   |                                   소재훈                                   |
| :----------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
| <img width=100 src="https://github.com/solo-service/mvz-frontend/assets/96280450/2f15aa41-a15c-4694-9c72-1e578973902b"/> | <img width=100 src="https://avatars.githubusercontent.com/u/62260343?v=4"> | <img width=100 src="https://avatars.githubusercontent.com/u/52352476?v=4"> |
|                                               https://github.com/Banal972                                                |                         https://github.com/soprue                          |                         https://github.com/jay-so                          |
